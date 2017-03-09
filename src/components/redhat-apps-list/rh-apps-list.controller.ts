import * as angular from 'angular';

export class RHListController implements angular.IController {
  public ctrl: any = this;
  public cardViewConfig: any;

  constructor() {
    this.cardViewConfig = {
      selectItems: false,
      showSelectBox: false,
      onClick: this.handleClick
    };
  }

  public $onInit() {
      // $onInit
  }

  public handleClick(item: any, e: any) {
    window.open(item.url, '_blank');
  };

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    // console.log('$onChanges' + JSON.stringify(onChangesObj));
  }

  public $doCheck() {
    // console.log('$doCheck');
  }
}
