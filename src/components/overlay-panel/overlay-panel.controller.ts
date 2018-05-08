import * as angular from 'angular';
import * as $ from 'jquery';
import * as _ from 'lodash';

export class OverlayPanelController implements angular.IController {
  static $inject = ['$document', '$scope', '$element'];

  public ctrl: any = this;
  private $document: any;
  private $scope: any;
  private $element: any;
  private focusableElementList: any;
  private tababbleSelector: String = 'a[href], area[href], input:not([disabled]), ' +
    'button:not([disabled]),select:not([disabled]), textarea:not([disabled]), ' +
    'iframe, object, embed, *[tabindex], *[contenteditable=true]';


  constructor ($document: any, $scope: any, $element: any) {
    this.$document = $document;
    this.$scope = $scope;
    this.$element = $element;
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
    this.$document.on('keydown', this.keydownHandler);
  };

  private hideDialog = () => {
    this.ctrl.shown = false;
    $('body').removeClass('overlay-open');
    this.$document.off('keydown', this.keydownHandler);
  };

  private keydownHandler = (event: any) => {
    if (event.which === 27) {
      // Only close this overlay if another handler has not called 
      // preventDefault() on this event. This means only one overlay/modal will
      // be closed per escape keydown event.
      if (!event.isDefaultPrevented()) {
        event.preventDefault();
        this.$scope.$evalAsync(() => {
          this.closePanel();
        });
      }
    } else if (event.which === 9) {
      // Handle the tab key, keep the focus within the elements of the overlay panel
      this.loadFocusElementList();
      var focusChanged = false;
      if (event.shiftKey) {
        if (this.isFocusInFirstItem(event)) {
          focusChanged = this.focusLastFocusableElement();
        }
      } else {
        if (this.isFocusInLastItem(event)) {
          focusChanged = this.focusFirstFocusableElement();
        }
      }

      if (focusChanged) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  private focusFirstFocusableElement = () => {
    if (this.focusableElementList.length > 0) {
      this.focusableElementList[0].focus();
      return true;
    }
    return false;
  };

  private focusLastFocusableElement = () => {
    if (this.focusableElementList.length > 0) {
      this.focusableElementList[this.focusableElementList.length - 1].focus();
      return true;
    }
    return false;
  };

  private isFocusInFirstItem = (evt: any) => {
    if (this.focusableElementList.length > 0) {
      return (evt.target || evt.srcElement) === this.focusableElementList[0];
    }
    return false;
  };

  private isFocusInLastItem = (evt: any) => {
    if (this.focusableElementList.length > 0) {
      return (evt.target || evt.srcElement) === this.focusableElementList[this.focusableElementList.length - 1];
    }
    return false;
  };

  private loadFocusElementList = () => {
    if (_.size(this.$element)) {
      this.focusableElementList = this.$element[0].querySelectorAll(this.tababbleSelector);
    }
  };
}
