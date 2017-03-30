import * as angular from 'angular';
import * as _ from 'lodash';

require("./order-service-details.html");
require("./order-service-plans.html");
require("./order-service-configure.html");
require("./order-service-review.html");

export class OrderServiceController implements angular.IController {

  static $inject = ['$scope', '$filter', 'DataService', 'Logger'];

  public ctrl: any = this;
  public $scope: any;

  private $filter: any;
  private DataService: any;
  private Logger: any;
  private currentStepIndex: number;

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

    // Preselect the first plan. If there's only one plan, skip the wizard step.
    this.ctrl.selectedPlan = _.first(this.ctrl.plans);
    this.ctrl.planIndex = 0;
    this.ctrl.steps = [{
      id: 'plans',
      label: 'Plans',
      view: 'components/order-service/order-service-plans.html'
    }, {
      label: 'Configuration',
      id: 'configure',
      view: 'components/order-service/order-service-configure.html'
    }, {
      label: 'Results',
      id: 'results',
      view: 'components/order-service/order-service-review.html'
    }];
    if (this.ctrl.plans.length < 2) {
      // Remove the plans step if there's only one plan.
      this.ctrl.steps.shift();
    }
    this.gotoStep(this.ctrl.steps[0]);
    this.listProjects();
    this.ctrl.wizardReady = true;
  }

  public getSteps() {
    return this.ctrl.steps;
  }

  public stepClick(step: any) {
    // Prevent returning to previous steps if the order is complete.
    if (this.ctrl.orderComplete) {
      return;
    }

    if (!step.visited) {
      return;
    }

    this.gotoStep(step);
  }

  public gotoStep(step: any) {
    this.ctrl.steps.forEach((step) => step.selected = false);
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

  public provisionService() {
    let serviceInstance = this.makeServiceInstance();
    this.DataService.create({
      group: 'servicecatalog.k8s.io',
      resource: 'instances'
    }, null, serviceInstance, {
      namespace: this.ctrl.selectedProject.metadata.name
    }).then(() => {
      // TODO: Handle async responses
      this.ctrl.orderComplete = true;
      this.ctrl.error = null;
      this.gotoStepID('results');
    }, (e: any) => {
      this.ctrl.error = e;
    });
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    return;
  }

  public $doCheck() {
    return;
  }

  public closePanel() {
    if (angular.isFunction(this.ctrl.handleClose)) {
      this.ctrl.handleClose();
    }
  }

  private listProjects() {
    this.DataService.list('projects', this.$scope).then((response: any) => {
      this.ctrl.projects = _.sortBy(response.by('metadata.name'), this.$filter('displayName'));
      this.ctrl.selectedProject = _.first(this.ctrl.projects);
    });
  }

  private makeServiceInstance() {
    let serviceClassName = _.get(this, 'ctrl.serviceClass.resource.metadata.name');
    let serviceInstance = {
      kind: 'Instance',
      apiVersion: 'servicecatalog.k8s.io/v1alpha1',
      metadata: {
        namespace: this.ctrl.selectedProject.metadata.name,
        generateName: serviceClassName + '-'
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
}
