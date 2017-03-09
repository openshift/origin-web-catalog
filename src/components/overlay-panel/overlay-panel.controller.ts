import * as angular from 'angular';

export class OverlayPanelController implements angular.IController {
  static $inject = ['$element', '$scope', '$document', '$timeout'];

  public ctrl: any = this;
  private $element: any;
  private $document: any;
  private $scope: any;
  private $timeout: any;
  private bodyElement: any;

  constructor ($element: any, $scope: any, $document: any, $timeout: any) {
    this.$element = $element;
    this.$scope = $scope;
    this.$document = $document;
    this.$timeout = $timeout;
    this.ctrl.shown = false;
  }

  public $onInit () {
    if (angular.isDefined(this.ctrl.closeOnEmit)) {
      this.$scope.$on(this.ctrl.closeOnEmit, () => {
        this.closePanel();
      });
    }
  }

  public $postLink() {
    var ctrl = this.ctrl;

    this.bodyElement = angular.element(this.$document).find('body');
    this.bodyElement.addClass('modal-open');

    this.$timeout(function() {
      ctrl.shown = true;
    }, 100);
  }

  public $onDestroy () {
    this.bodyElement.removeClass('modal-open');

  }

  public closePanel = () => {
    if (angular.isFunction(this.ctrl.handleClose)) {
      this.ctrl.handleClose();
    }
  };
}

