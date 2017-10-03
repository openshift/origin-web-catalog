import * as angular from 'angular';
import * as $ from 'jquery';

export class OverlayPanelController implements angular.IController {
  static $inject = ['$document', '$scope'];

  public ctrl: any = this;
  private $document: any;
  private $scope: any;

  constructor ($document: any, $scope: any) {
    this.$document = $document;
    this.$scope = $scope;
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
    this.$document.bind('keydown keypress', this.closeOnEsc);
  };

  private hideDialog = () => {
    this.ctrl.shown = false;
    $('body').removeClass('overlay-open');
    this.$document.unbind('keydown keypress', this.closeOnEsc);
  };

  private closeOnEsc = (event: any) => {
    if (event.which === 27) {
      event.preventDefault();
      this.$scope.$evalAsync(() => {
        this.closePanel();
      });
    }
  };
}
