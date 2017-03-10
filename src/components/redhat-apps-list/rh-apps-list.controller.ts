import * as angular from 'angular';
import * as _ from 'lodash';

export class RHListController implements angular.IController {
  public ctrl: any = this;
  public cardViewConfig: any;

  constructor() {
    this.cardViewConfig = {
      selectItems: false,
      showSelectBox: false,
      onClick: this.handleClick
    };
    this.ctrl.loading = true;
  }

  public $onInit() {
    this.ctrl.loading = _.isEmpty(this.ctrl.applications);
  }

  public handleClick(item: any, e: any) {
    window.open(item.url, '_blank');
  };

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if ((onChangesObj.applications && !onChangesObj.applications.isFirstChange()) ) {
      this.ctrl.applications = onChangesObj.applications.currentValue;
      this.ctrl.loading = false;
    }
  }
}
