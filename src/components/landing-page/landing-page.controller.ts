import * as angular from 'angular';
import * as _ from 'lodash';

export class LandingPageController implements angular.IController {
  static $inject = ['$scope', '$rootScope', 'HTMLService', 'RecentlyViewedServiceItems'];

  public ctrl: any = this;
  private $scope: any;
  private $rootScope: any;
  private HTMLService: any;
  private RecentlyViewed: any;
  private debounceResize: any;
  private snapOnListener: any;
  private snapOffListener: any;

  constructor ($scope: any, $rootScope: any, HTMLService: any, RecentlyViewedServiceItems: any) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.HTMLService = HTMLService;
    this.RecentlyViewed = RecentlyViewedServiceItems;
  }

  public $onInit() {
    this.ctrl.searchText = '';
    this.ctrl.orderingPanelVisible = false;

    this.debounceResize = _.debounce(this.onResize, 250, { maxWait: 500 });
    angular.element(window).bind('resize', this.debounceResize);

    this.$scope.$on('open-overlay-panel', (event: any, item: any) => {
      if (item.resource.kind === 'Template') {
        let cb = this.ctrl.onTemplateSelected();
        if (cb) {
          cb(item.resource);
        }
        return;
      }

      this.ctrl.selectedItem = item;
      this.ctrl.orderingPanelVisible = true;
    });

    this.snapOnListener = this.$rootScope.$on('landing-page.main-area-snapped-up.on', this.snapOn);
    this.snapOffListener = this.$rootScope.$on('landing-page.main-area-snapped-up.off', this.snapOff);
  }

  public $onDestroy() {
    if (this.ctrl.orderingPanelVisible) {
      this.closeOrderingPanel();
    }
    this.snapOnListener();
    this.snapOffListener();
  }

  public closeOrderingPanel = () => {
    this.RecentlyViewed.addItem(this.ctrl.selectedItem.resource.metadata.uid);
    this.ctrl.orderingPanelVisible = false;
  };

  public expandHeader() {
    this.ctrl.collapsedHeader = false;
  }

  private onResize = () => {
    if (!this.HTMLService.isWindowAboveBreakpoint(this.HTMLService.WINDOW_SIZE_SM)) {
      this.$scope.$evalAsync(() => {
        this.ctrl.collapsedHeader = false;
      });
    }
  };

  private snapOn = () => {
    if (this.HTMLService.isWindowAboveBreakpoint(this.HTMLService.WINDOW_SIZE_SM)) {
      this.ctrl.collapsedHeader = true;
    }
  };

  private snapOff = () => {
    this.ctrl.collapsedHeader = false;
  };
}
