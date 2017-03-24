import * as angular from 'angular';


export class LandingPageController implements angular.IController {

  public ctrl: any = this;

  public $onInit() {
    this.ctrl.searchText = '';
  }
}
