import * as angular from 'angular';
import * as _ from 'lodash';

export class SaasListController implements angular.IController {
  public ctrl: any = this;

  public hasSaasOfferings (): boolean {
    return !_.isEmpty(this.ctrl.saasOfferings);
  }

  public handleClick(item: any, e: any) {
    window.open(item.url, '_blank');
  };

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if ((onChangesObj.saasOfferings && !onChangesObj.saasOfferings.isFirstChange()) ) {
      this.ctrl.saasOfferings = onChangesObj.saasOfferings.currentValue;
    }
  }
}
