import * as angular from 'angular';
import * as _ from 'lodash';

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

    let plans = this.ctrl.serviceClass.resource.plans;
    if (plans.length === 1) {
      this.ctrl.selectedPlan = plans[0];
      this.ctrl.steps = [{
        id: 'configure',
        selected: true
      }, {
        id: 'review-order'
      }];
    } else {
      this.ctrl.steps = [{
        id: 'select-plan',
        selected: true
      }, {
        id: 'configure'
      }, {
        id: 'review-order'
      }];
    }
    this.ctrl.currentStep = this.ctrl.steps[0];
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
    this.ctrl.currentStep.visited = true;
    this.ctrl.currentStep = step;
    this.ctrl.currentStep.selected = true;
  }

  public configureService (plan: any) {
    this.ctrl.selectedPlan = plan;
    this.gotoStep(this.ctrl.steps[1]);
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
      this.gotoStepID('review-order');
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
