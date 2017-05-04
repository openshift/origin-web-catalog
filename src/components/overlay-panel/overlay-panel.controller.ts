import * as angular from 'angular';
import * as $ from 'jquery';

export class OverlayPanelController implements angular.IController {
  public ctrl: any = this;

  constructor () {
    this.ctrl.shown = false;
  }

  public $postLink() {
    if (this.ctrl.showPanel) {
      this.showDialog();
    }
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.showPanel) {
      if (this.ctrl.showPanel) {
        this.showDialog();
      } else {
        this.hideDialog();
      }
    }
  }

  public $onDestroy() {
    $('body').removeClass('overlay-open');
  }

  public closePanel = () => {
    if (angular.isFunction(this.ctrl.handleClose)) {
      this.ctrl.handleClose();
    }
  };

  private showDialog = () => {
    this.ctrl.shown = true;
    $('body').addClass('overlay-open');
  };

  private hideDialog = () => {
    this.ctrl.shown = false;
    $('body').removeClass('overlay-open');
  }
}
