import * as angular from 'angular';
import * as $ from 'jquery';

export class OverlayPanelController implements angular.IController {
  static $inject = ['$timeout'];

  public ctrl: any = this;
  private $timeout: any;

  constructor ($timeout: any) {
    this.$timeout = $timeout;
    this.ctrl.showOverlayPanel = false;
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

    this.$timeout(() => {
      this.ctrl.showOverlayPanel = true;
      $('body').addClass('overlay-open');
    }, 500);
  };

  private hideDialog = () => {
    this.ctrl.shown = false;

    this.$timeout(() => {
      this.ctrl.showOverlayPanel = false;
      $('body').removeClass('overlay-open');
    }, 500);
  }
}
