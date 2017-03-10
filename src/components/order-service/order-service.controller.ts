import * as angular from 'angular';

export class OrderServiceController implements angular.IController {

  static $inject = ['$scope'];

  public ctrl: any = this;
  public $scope: any;

  constructor($scope: any) {
    this.$scope = $scope;
  }

  public $onInit() {
    this.ctrl.serviceIcon = this.ctrl.service.imageURL ? this.ctrl.service.imageURL : 'pf pficon-service';
    this.ctrl.serviceName = this.ctrl.service.displayName ? this.ctrl.service.displayName : this.ctrl.service.metadata.name;
    this.ctrl.versions = this.ctrl.service.versions;
    this.ctrl.selectedVersion = this.ctrl.service.versions[0];
    this.ctrl.description = this.ctrl.service.description;
    this.ctrl.longDescription = this.ctrl.service.longDescription;

    this.ctrl.steps = [ {id: 1, selected: true},
                        {id: 2},
                        {id: 3}
                      ];
    this.ctrl.currentStep = this.ctrl.steps[0];

    this.ctrl.wizardReady = true;
  }

  public getSteps() {
    return this.ctrl.steps;
  }

  public stepClick(step: any) {
    if (step.visited) {
      this.gotoStep(step);
    }
  }

  public gotoStep(step: any) {
    this.ctrl.steps.forEach((step) => step.selected = false);
    this.ctrl.currentStep.visited = true;
    this.ctrl.currentStep = step;
    this.ctrl.currentStep.selected = true;
  }

  public configureService (plan: any) {
    // this.ctrl.selectedPlan = plan;
    this.ctrl.serviceLongDescription = plan;
    this.gotoStep(this.ctrl.steps[1]);
  }

  public orderService() {
    this.gotoStep(this.ctrl.steps[2]);
  }

  public toggleAdvOps() {
    let advHref = document.querySelector('#adv-ops-href');
    let advOps = document.querySelector('#adv-ops');
    angular.element( advHref ).toggleClass('collapsed');
    angular.element( advOps ).toggleClass('collapse');
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    // console.log('$onChanges' + JSON.stringify(onChangesObj));
  }

  public $doCheck() {
    // console.log('$doCheck');
  }

  public cancelOrder() {
    this.$scope.$emit('cancelOrder');
  }
}
