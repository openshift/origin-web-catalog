import * as angular from 'angular';
import * as hopscotch from 'hopscotch';
import * as $ from 'jquery';

export class GuidedTourController {
  static $inject = ['$document', '$timeout'];

  public ctrl: any = this;
  private $document: any;
  private $timeout: any;
  private bodyElement: any;
  private showBackdrop: boolean = false;
  private hopscotchConfig: any;
  private innerConfig: any;

  constructor ($document: any, $timeout: any) {
    this.$document = $document;
    this.$timeout = $timeout;

    this.innerConfig = {
      bubblePadding: 5,
      arrowWidth: 15,
      onStart: this.handleTourStart,
      onEnd: this.handleTourEnd,
      onClose: this.handleTourEnd,
      showPrevButton: true,
      i18n: {
        nextBtn: 'Next >',
        prevBtn: '< Back',
      }
    };
  }

  public $postLink () {
    this.bodyElement = $(this.$document).find('body');
    this.hopscotchConfig = {};
    angular.merge(this.hopscotchConfig, this.innerConfig, this.ctrl.tourConfig);
  }

  public $onChanges (onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.showTour) {
      if (this.ctrl.showTour) {
        hopscotch.startTour(this.hopscotchConfig);
      } else {
        hopscotch.endTour();
      }
    }
    if (onChangesObj.tourConfig) {
      this.hopscotchConfig = {};
      angular.merge(this.hopscotchConfig, this.innerConfig, this.ctrl.tourConfig);
    }
  }

  public cancelTour = () => {
    hopscotch.endTour();
  };

  public handleTourStart = () => {
    this.$timeout(() => {
      this.showBackdrop = true;
      this.bodyElement.addClass('overlay-open');
    });
  };

  public handleTourEnd = () => {
    this.$timeout(() => {
      this.ctrl.showTour = false;
      this.showBackdrop = false;
      this.bodyElement.removeClass('overlay-open');
      var cb = this.ctrl.onTourEnd();
      if (cb) {
        cb();
      }
    });
  };
}
