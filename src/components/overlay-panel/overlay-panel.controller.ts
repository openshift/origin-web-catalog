import * as angular from 'angular';

export class OverlayPanelController implements angular.IController {
  static $inject = ['$element', '$timeout'];

  public ctrl: any = this;
  private $element: any;
  private $timeout: any;

  constructor ($element: any, $timeout: any) {
    this.$element = $element;
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

  public closePanel = () => {
    if (angular.isFunction(this.ctrl.handleClose)) {
      this.ctrl.handleClose();
    }
  };

  private showDialog = () => {
    this.ctrl.shown = true;

    this.$timeout(() => {
      this.ctrl.showOverlayPanel = true;
    }, 500);
  };

  private hideDialog = () => {
    this.ctrl.shown = false;

    this.$timeout(() => {
      this.ctrl.showOverlayPanel = false;
    }, 500);
  }
}
