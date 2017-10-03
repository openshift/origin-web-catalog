import * as angular from 'angular';
import * as _ from 'lodash';

export class SelectPlanController implements angular.IController {

  public ctrl: any = this;

  public $onInit() {
    this.updatePlans();
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.availablePlans && !onChangesObj.availablePlans.isFirstChange()) {
      this.updatePlans();
    }
  }

  private updatePlans() {
    this.ctrl.plansAvailable = _.size(this.ctrl.availablePlans) > 0;
    if (this.ctrl.plansAvailable) {
      if (!this.ctrl.selectedPlan) {
        this.ctrl.selectedPlan = this.ctrl.availablePlans[0];
      }
      this.ctrl.planIndex = this.ctrl.availablePlans.indexOf(this.ctrl.selectedPlan);
    }
  }
}
