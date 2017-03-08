import * as angular from 'angular';
import animateScrollTo from 'animated-scroll-to';

export class LandingPageController implements angular.IController {
  static $inject = ['$scope', '$element', '$window'];

  public ctrl: any = this;
  private $scope: any;
  private $element: any;
  private $window: any;
  private useScrollElement: boolean = false;
  private scrollElement: any;
  private scrollOptions : any;
  private snapElement : any;

  constructor($scope: any, $element: any, $window: any) {
    this.$scope = $scope;
    this.$element = $element;
    this.$window = $window;
  }

  public $onInit() {
    this.ctrl.searchText = '';
    this.scrollOptions = {
      speed: 1000,
      minDuration: 250,
      maxDuration: 3000,
      cancelOnUserAction: true
    };
    this.ctrl.showSnapDown = false;
  }

  public $postLink() {
    this.snapElement = this.$element[0].querySelector('.landing-body-area');
    angular.element(this.snapElement).css('min-height', this.$window.innerHeight + 'px');

    this.scrollElement = this.getScrollParent(this.snapElement, null);
    this.useScrollElement = this.scrollElement.parentElement !== null;

    if (this.useScrollElement) {
      angular.element(this.scrollElement).scroll(this.onScrollChange);
    } else {
      angular.element(this.$window).bind('scroll', this.onScrollChange);
    }

    angular.element(this.$window).bind('resize', this.onWindowResize);
  }

  public $onDestroy() {
    if (!this.useScrollElement) {
      angular.element(this.$window).unbind('scroll', this.onScrollChange);
    }
    angular.element(this.$window).unbind('resize', this.onWindowResize);
  }

  public snapDown(event: any) {
    if (this.useScrollElement) {
      this.scrollElementTo(this.snapElement.offsetTop);
    } else {
      animateScrollTo(this.snapElement.offsetTop, this.scrollOptions);
    }
  }

  public snapUp(event: any) {
    if (this.useScrollElement) {
      this.scrollElementTo(0);
    } else {
      animateScrollTo(0, this.scrollOptions);
    }
  }

  public onSearchButtonClick() {
    if (angular.isFunction(this.ctrl.doSearchFn)) {
      this.ctrl.doSearchFn(this.ctrl.searchText);
    }
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    // console.log('$onChanges' + JSON.stringify(onChangesObj));
  }

  public $doCheck() {
    // console.log('$doCheck');
  }

  private onWindowResize = (event: any) => {
    angular.element(this.snapElement).css('min-height', this.$window.innerHeight + 'px');
  };

  private  getScrollParent(node: any, prev: any) {
    if (node === null) {
      return prev;
    }

    if (node.scrollHeight > node.clientHeight) {
      return this.getScrollParent(node.parentNode, node);
    } else {
      return this.getScrollParent(node.parentNode, prev);
    }
  }

  private scrollElementTo(newScroll: any) {
    var currentScroll: number = this.scrollElement.scrollTop;
    var cosParameter: number = Math.abs(currentScroll - newScroll) / 2;
    var scrollCount: number = 0;
    var oldTimestamp: number = performance.now();
    var scrollUp: boolean = newScroll < currentScroll;

    var step = (newTimestamp: any) => {
      var delta: number;
      var scrollTop: number;

      scrollCount += Math.PI / ((0.5 * 1000) / (newTimestamp - oldTimestamp));
      if (scrollCount >= Math.PI) {
        this.scrollElement.scrollTop = newScroll;
      }

      if (this.scrollElement.scrollTop === newScroll) {
        return;
      }

      delta = Math.round(cosParameter + cosParameter * Math.cos(scrollCount));

      if (scrollUp) {
        scrollTop = delta;
      } else {
        scrollTop = newScroll - delta;
      }

      this.scrollElement.scrollTop = scrollTop;

      oldTimestamp = newTimestamp;
      this.$window.requestAnimationFrame(step);
    };
    this.$window.requestAnimationFrame(step);
  }

  private onScrollChange = (event: any) => {
    if (this.useScrollElement) {
      this.ctrl.showSnapDown = this.scrollElement.scrollTop >= this.snapElement.offsetTop;
    } else {
      this.ctrl.showSnapDown = event.srcElement.scrollingElement.scrollTop >= this.snapElement.offsetTop;
    }

    this.$scope.$apply();
  };
}
