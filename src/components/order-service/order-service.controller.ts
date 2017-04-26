import * as angular from 'angular';
import * as _ from 'lodash';

export class OrderServiceController implements angular.IController {

  static $inject = ['$scope', '$filter', 'DataService', 'Logger'];

  public ctrl: any = this;
  public $scope: any;

  private $filter: any;
  private DataService: any;
  private Logger: any;
  private currentStepIndex: number;
  private watches: any[] = [];

  constructor($scope: any, $filter: any, DataService: any, Logger: any) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.DataService = DataService;
    this.Logger = Logger;
  }

  public $onInit() {
    this.ctrl.iconClass = this.ctrl.serviceClass.iconClass || 'fa fa-cubes';
    this.ctrl.imageUrl = this.ctrl.serviceClass.imageUrl;
    this.ctrl.serviceName = this.ctrl.serviceClass.name;
    this.ctrl.description = this.ctrl.serviceClass.description;
    this.ctrl.longDescription = this.ctrl.serviceClass.longDescription;
    this.ctrl.plans = _.get(this, 'ctrl.serviceClass.resource.plans', []);
    this.ctrl.forms = {};

    // Preselect the first plan. If there's only one plan, skip the wizard step.
    this.ctrl.selectedPlan = _.first(this.ctrl.plans);
    this.ctrl.selectedProject = {};
    this.ctrl.serviceInstanceName = "my-" + this.ctrl.serviceClass.resource.metadata.name;
    this.ctrl.planIndex = 0;
    this.ctrl.steps = [{
      id: 'plans',
      label: 'Plans',
      view: 'order-service/order-service-plans.html'
    }, {
      label: 'Configuration',
      id: 'configure',
      view: 'order-service/order-service-configure.html'
    }, {
      label: 'Results',
      id: 'results',
      view: 'order-service/order-service-review.html'
    }];
    if (this.ctrl.plans.length < 2) {
      // Remove the plans step if there's only one plan.
      this.ctrl.steps.shift();
    }
    this.gotoStep(this.ctrl.steps[0]);
    this.ctrl.nameTaken = false;
    this.ctrl.serviceInstanceNameTaken = false;
    this.ctrl.wizardReady = true;
  }

  public onServiceInstanceNameChange() {
    this.ctrl.serviceInstanceNameTaken = false;
    this.ctrl.forms.orderConfigureForm.serviceInstanceName.$setValidity('nameTaken', !this.ctrl.serviceInstanceNameTaken);
  }

  public getSteps() {
    return this.ctrl.steps;
  }

  public stepClick(step: any) {
    // Prevent returning to previous steps if the order is complete.
    if (this.ctrl.currentStep.id === 'results') {
      return;
    }

    if (!step.visited) {
      return;
    }

    this.gotoStep(step);
  }

  public gotoStep(step: any) {
    this.ctrl.steps.forEach((step: any) => step.selected = false);
    if (this.ctrl.currentStep) {
      this.ctrl.currentStep.visited = true;
    }
    this.ctrl.currentStep = step;
    this.ctrl.currentStep.selected = true;
    this.currentStepIndex = _.findIndex(this.ctrl.steps, 'selected');
  }

  public previousStep() {
    let step = this.ctrl.steps[this.currentStepIndex - 1];
    this.gotoStep(step);
  }

  public nextStep() {
    let step = this.ctrl.steps[this.currentStepIndex + 1];
    this.gotoStep(step);
  }

  public selectPlan(plan: any) {
    this.ctrl.selectedPlan = plan;
  }

  public invalidNewProject() {
    // test whether selectedProject is actually a newProject obj. and if passed name validation
    return this.isNewProject() && !this.ctrl.selectedProject.validName;
  }

  public provisionService() {
    if (this.isNewProject()) {
      // the selectedProject is actually a newProject object
      let newProjName = this.ctrl.selectedProject.metadata.name;
      let newProjDisplayName = this.ctrl.selectedProject.metadata.annotations['new-display-name'];
      let newProjDesc = this.$filter('description')(this.ctrl.selectedProject);
      let projReqObj: any = {
        apiVersion: "v1",
        kind: "ProjectRequest",
        metadata: {
          name: newProjName
        },
        displayName: newProjDisplayName,
        description: newProjDesc
      };
      this.DataService
        .create('projectrequests', null, projReqObj, this.$scope)
        .then( (data: any) => {
          this.ctrl.projectDisplayName = newProjDisplayName || newProjName;
          this.createService();
        }, (result: any) => {
          var data = result.data || {};
          if (data.reason === 'AlreadyExists') {
            this.ctrl.nameTaken = true;
          } else {
            this.ctrl.error = data.message || 'An error occurred creating the project.';
          }
        });
    } else {
      this.ctrl.projectDisplayName = this.$filter('displayName')(this.ctrl.selectedProject);
      this.createService();
    }
  }

  public createService() {
    let serviceInstance = this.makeServiceInstance();
    let resource = {
      group: 'servicecatalog.k8s.io',
      resource: 'instances'
    };
    let context = {
      namespace: this.ctrl.selectedProject.metadata.name
    };

    this.DataService.create(resource, null, serviceInstance, context).then((data: any) => {
      this.ctrl.orderInProgress = true;
      this.watchResults(resource, data, context);
      this.gotoStepID('results');
    }, (result: any) => {
      var data = result.data || {};
      if (data.reason === 'AlreadyExists') {
        this.ctrl.serviceInstanceNameTaken = true;
      } else {
        this.ctrl.error = data.message || 'An error occurred creating the instance.';
      }
    });
  }

  public $onDestroy() {
    this.DataService.unwatchAll(this.watches);
  }

  public closePanel() {
    if (angular.isFunction(this.ctrl.handleClose)) {
      this.ctrl.handleClose();
    }
  }

  private makeServiceInstance() {
    let serviceClassName = _.get(this, 'ctrl.serviceClass.resource.metadata.name');

    let serviceInstance = {
      kind: 'Instance',
      apiVersion: 'servicecatalog.k8s.io/v1alpha1',
      metadata: {
        namespace: this.ctrl.selectedProject.metadata.name,
        name: this.ctrl.serviceInstanceName !== "" ? this.ctrl.serviceInstanceName : null,
        generateName: this.ctrl.serviceInstanceName !== "" ? null : (serviceClassName + '-')
       },
       spec: {
         serviceClassName: serviceClassName,
         planName: this.ctrl.selectedPlan.name
       }
    };

    return serviceInstance;
  }

  private gotoStepID(id: string) {
    let step = _.find(this.ctrl.steps, { id: id });
    this.gotoStep(step);
  }

  private isNewProject(): boolean {
    return this.ctrl.selectedProject && !_.has(this.ctrl.selectedProject, 'metadata.uid');
  }

  private watchResults = (resource: any, data: any, context: any) => {
    this.watches.push(this.DataService.watchObject(resource, data.metadata.name, context, (instanceData: any, action: any) => {
      var conditions: any = _.get(instanceData, 'status.conditions');
      var readyCondition: any = _.find(conditions, {type: "Ready"});

      this.ctrl.orderComplete = readyCondition && readyCondition.status === 'True';
      this.ctrl.error = _.find(conditions, {type: "ProvisionFailed"});
    }));
  }
}
