import * as angular from 'angular';

export class LandingPageController implements angular.IController {
  static $inject = ['$scope', 'RecentlyViewedServiceItems'];

  public ctrl: any = this;
  private $scope: any;
  private RecentlyViewed: any;

  constructor ($scope: any, RecentlyViewedServiceItems: any) {
    this.$scope = $scope;
    this.RecentlyViewed = RecentlyViewedServiceItems;
  }

  public $onInit() {
    this.ctrl.searchText = '';
    this.ctrl.orderingPanelVisible = false;

    this.$scope.$on('open-overlay-panel', (event: any, item: any) => {
      if (item.kind === 'Template') {
        let cb = this.ctrl.onTemplateSelected();
        if (cb) {
          cb(item.resource);
        }
        return;
      }

      this.ctrl.selectedItem = item;
      this.ctrl.orderingPanelVisible = true;
    });
  }

  public $onDestroy() {
    if (this.ctrl.orderingPanelVisible) {
      this.closeOrderingPanel();
    }
  }

  public closeOrderingPanel = () => {
    this.RecentlyViewed.addItem(this.ctrl.selectedItem.resource.metadata.uid);
    this.ctrl.orderingPanelVisible = false;
  }
}
