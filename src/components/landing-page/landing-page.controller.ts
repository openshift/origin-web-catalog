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
      let kind = _.get(item, 'resource.kind');
      if (kind === 'ImageStream') {
        this.ctrl.selectedImageStream = item;
        this.ctrl.selectedServiceClass = null;
      } else {
        this.ctrl.selectedImageStream = null;
        this.ctrl.selectedServiceClass = item;
      }
      this.RecentlyViewed.addItem(item.resource.metadata.uid);
      this.ctrl.orderingPanelVisible = true;
    });
  }

  public closeOrderingPanel = () => {
    this.ctrl.orderingPanelVisible = false;
  };
}
