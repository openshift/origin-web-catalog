import * as angular from 'angular';
import animateScrollTo from 'animated-scroll-to';

export class LandingPageController implements angular.IController {
  static $inject = ['$scope', '$element', '$window'];

  public ctrl: any = this;
  private $scope: any;
  private $element: any;
  private $window: any;
  private scrollOptions : any;
  private snapToPosition : any;

  constructor($scope: any, $element: any, $window: any) {
    this.$scope = $scope;
    this.$element = $element;
    this.$window = $window;
  }

  public $onInit() {
    var _this: any = this;

    this.ctrl.searchText = '';
    this.scrollOptions = {
      speed: 1000,
      minDuration: 250,
      maxDuration: 3000,
      cancelOnUserAction: true
    };
    this.ctrl.showSnapDown = false;

    angular.element(this.$window).bind('scroll', function(event: any) {
      _this.ctrl.showSnapDown = event.srcElement.scrollingElement.scrollTop >= _this.snapToPosition;
      _this.$scope.$apply();
    });
    angular.element(this.$window).bind('resize', function(event: any) {
      var bodyArea = this.$element[0].querySelector('.landing-body-area');
      angular.element(bodyArea).css('min-height', _this.$window.innerHeight + 'px');
    });
  }

  public $postLink() {
    var bodyArea = this.$element[0].querySelector('.landing-body-area');
    this.snapToPosition = bodyArea.offsetTop;
    angular.element(bodyArea).css('min-height', this.$window.innerHeight + 'px');
  }

  public snapDown() {
    animateScrollTo(this.snapToPosition, this.scrollOptions);
  }

  public snapUp() {
    animateScrollTo(0, this.scrollOptions);
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
}
