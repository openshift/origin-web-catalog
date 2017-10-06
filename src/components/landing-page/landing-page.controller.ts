import * as angular from 'angular';

export class LandingPageController implements angular.IController {
  static $inject = ['$scope', 'Catalog', 'RecentlyViewedServiceItems'];

  public ctrl: any = this;
  private $scope: any;
  private Catalog: any;
  private RecentlyViewed: any;
  private plansByServiceClassName: any;

  constructor ($scope: any, Catalog: any, RecentlyViewedServiceItems: any) {
    this.$scope = $scope;
    this.Catalog = Catalog;
    this.RecentlyViewed = RecentlyViewedServiceItems;
    this.plansByServiceClassName = {};
  }

  public $onInit() {
    this.ctrl.searchText = '';
    this.ctrl.orderingPanelVisible = false;

    this.Catalog.getServicePlans().then((plans: any) => {
      if (!plans) {
        return;
      }

      plans = plans.by('metadata.name');
      this.plansByServiceClassName = this.Catalog.groupPlansByServiceClassName(plans);
    });

    this.$scope.$on('open-overlay-panel', (event: any, item: any) => {
      this.ctrl.servicePlansForItem = null;
      if (item.kind === 'Template') {
        let cb = this.ctrl.onTemplateSelected();
        if (cb) {
          cb(item.resource);
        }
        return;
      }

      if (item.kind === 'ServiceClass') {
        this.ctrl.servicePlansForItem = this.plansByServiceClassName[item.resource.metadata.name];
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
