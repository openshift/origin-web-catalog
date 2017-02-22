import * as angular from 'angular';

export class OrderServiceController implements angular.IController {

  static $inject = ['MockDataService', '$scope'];

  public ctrl: any = this;
  public mockService: any;
  public $scope: any;

  constructor(mockDataService: any, $scope: any) {
    this.mockService = mockDataService;
    this.$scope = $scope;
  }

  public $onInit() {
    this.ctrl.serviceIcon = this.ctrl.service.icon;
    this.ctrl.serviceName = this.ctrl.service.name;

    let details = this.mockService.getServiceDetails(this.ctrl.service.id);
    this.ctrl.versions = details.versions;
    this.ctrl.selectedVersion = details.versions[0];
    this.ctrl.descTitle = details.descTitle;
    this.ctrl.description = details.description;

    // let prices = this.mockService.getServicePrices(this.ctrl.service.id);

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

  public configureService (serviceLongDescription: string) {
    this.ctrl.serviceLongDescription = serviceLongDescription;
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
