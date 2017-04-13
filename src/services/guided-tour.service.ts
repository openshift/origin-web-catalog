import * as angular from 'angular';
import * as hopscotch from 'hopscotch';
import * as $ from 'jquery';
import * as _ from 'lodash';

interface IGuidedTourService {
  startTour(tourConfig: any);
  cancelTour();
}

export class GuidedTourService implements IGuidedTourService {
  public static $inject = ['$document'];

  private $document: any;
  private hopscotchConfig: any;
  private innerConfig: any;
  private bubbleHeight: number = 175;

  constructor ($document: any) {
    this.$document = $document;
  }

  public startTour(tourConfig: any) {
    var backdropElement = '<div id="guided_tour_backdrop" class="modal-backdrop fade guided-tour-backdrop"></div>';
    $(this.$document).find('body').append(backdropElement);

    this.innerConfig = {
      bubblePadding: 5,
      arrowWidth: 10,
      onStart: this.handleTourStart,
      onEnd: this.handleTourEnd,
      onClose: this.handleTourEnd,
      showPrevButton: true,
      i18n: {
        nextBtn: 'Next >',
        prevBtn: '< Back',
      }
    };
    this.hopscotchConfig = {};
    angular.merge(this.hopscotchConfig, this.innerConfig, tourConfig);

    this.setupSteps();
    this.makeStepTargetVisible(0);

    hopscotch.startTour(this.hopscotchConfig, 0);
  }

  public cancelTour = () => {
    hopscotch.endTour();
  };

  public handleTourStart = () => {
    $('#guided_tour_backdrop').click(this.cancelTour);
  };

  public handleTourEnd = () => {
    $('#guided_tour_backdrop').remove();
  };

  private setupSteps = () => {
    _.forEach(this.hopscotchConfig.steps, (step: any) => {
      step.onNextOrig = step.onNext;
      step.onPrevOrig = step.onPrev;
      step.onNext = this.onStepNext;
      step.onPrev = this.onStepPrev;
      step.fixedElement = true;

      // Since we use a title area, move up to get arrow out of title area
      if (angular.isUndefined(step.yOffset) && (step.placement === 'right' || step.placement === 'left' )) {
        step.yOffset = -45;
      }
    });
  };

  private onStepNext = () => {
    var stepNum: number = hopscotch.getCurrStepNum() - 1;
    var stepConfig: any = this.hopscotchConfig.steps[stepNum];

    if (stepConfig) {
      if (stepConfig.onNextOrig) {
        stepConfig.onNextOrig();
      }

      this.makeStepTargetVisible(stepNum + 1);
    }
  };

  private onStepPrev = () => {
    var stepNum: number = hopscotch.getCurrStepNum() + 1;
    var stepConfig: any = this.hopscotchConfig.steps[stepNum];

    if (stepConfig) {
      if (stepConfig.onPrevOrig) {
        stepConfig.onPrevOrig();
      }

      this.makeStepTargetVisible(stepNum - 1);
    }
  };

  private makeStepTargetVisible = (stepNum: number) => {
    var stepConfig: any = this.hopscotchConfig.steps[stepNum];

    if (!stepConfig) {
      return;
    }

    if (stepConfig.preShow) {
      stepConfig.preShow();
    }

    if (stepConfig.targetScrollElement) {
      var scrollElement: any = $(this.$document).find(stepConfig.targetScrollElement)[0];
      var targetElement: any = $(this.$document).find(stepConfig.target)[0];

      if (scrollElement && scrollElement) {

        var offsetTop = this.getOffsetTopFromScrollElement(targetElement, scrollElement);
        if (stepConfig.placement === 'top') {
          offsetTop -= this.bubbleHeight;
        } else {
          offsetTop += this.bubbleHeight;
        }

        if (offsetTop > scrollElement.clientHeight) {
          scrollElement.scrollTop = offsetTop;
        } else {
          scrollElement.scrollTop = 0;
        }
      }
    }
  };

  private getOffsetTopFromScrollElement(targetElement: any, scrollElement: any) {
    if (!targetElement || targetElement === scrollElement) {
      return 0;
    } else {
      return targetElement.offsetTop + this.getOffsetTopFromScrollElement(targetElement.offsetParent, scrollElement);
    }
  }
}
