import * as angular from 'angular';
import * as _ from 'lodash';

export class SaasListController implements angular.IController {
  static $inject = ['$scope', '$window', '$element'];

  public ctrl: any = this;
  private $scope: any;
  private $window: any;
  private $element: any;
  private debounceResize: any;

  constructor($scope: any, $window: any, $element: any) {
    this.$scope = $scope;
    this.$window = $window;
    this.$element = $element;
    this.ctrl.sassListExpanded = false;
    this.ctrl.itemsOverflow = false;
  }

  public $postLink() {
    this.debounceResize = _.debounce(this.onWindowResize, 50, { maxWait: 250 });
    angular.element(this.$window).on('resize', this.debounceResize);

    this.updateListExpandVisibility();
  }

  public $onDestroy() {
    angular.element(this.$window).off('resize', this.debounceResize);
  }

  public hasSaasOfferings(): boolean {
    return !_.isEmpty(this.ctrl.saasOfferings);
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if ((onChangesObj.saasOfferings && !onChangesObj.saasOfferings.isFirstChange()) ) {
      this.ctrl.saasOfferings = onChangesObj.saasOfferings.currentValue;
      this.updateListExpandVisibility();
    }
  }

  public toggleListExpand() {
    this.ctrl.sassListExpanded = !this.ctrl.sassListExpanded;
  }

  private updateListExpandVisibility() {
    var windowWidth: number = this.$window.innerWidth;
    var offeringCount: number = _.size(this.ctrl.saasOfferings);

    this.ctrl.itemsOverflow = (windowWidth >= this.$window.patternfly.pfBreakpoints.tablet) &&
      ((offeringCount > 4) || (windowWidth < this.$window.patternfly.pfBreakpoints.desktop && offeringCount > 2));
  }

  private onWindowResize = () => {
    this.$scope.$evalAsync(() => {
      this.updateListExpandVisibility();
    });
  };
}
