import * as angular from 'angular';

export class ServicesViewController implements angular.IController {
  static $inject = ['$filter', '$scope'];

  public ctrl: any = this;
  public cardViewConfig: any;
  private $filter: any;
  private $scope: any;

  constructor($filter: any, $scope: any) {
    this.cardViewConfig = {
      selectItems: false,
      showSelectBox: false,
      onClick: this.handleClick
    };
    this.$filter = $filter;
    this.$scope = $scope;
  }

  public $onInit() {
    this.ctrl.origServices = this.ctrl.services.map(a => Object.assign({}, a, {ctrl: this}));  // clone
    this.ctrl.currentFilter = 'all';
    this.ctrl.currentSubFilter = 'all';
    this.ctrl.filteredServices = this.ctrl.origServices;
    this.ctrl.categories = this.ctrl.categories;
    this.ctrl.subCategories = this.getSubCategories('all');
    this.ctrl.orderingPanelvisible = false;

    this.$scope.$on('cancelOrder', () => {
      this.ctrl.closeOrderingPanel();
    });
  }

  public filterByCategory(category: string, subCategory: string, updateSubCategories: boolean) {
    if (category === 'all' && subCategory === 'all') {
      this.ctrl.filteredServices = this.ctrl.origServices;
    } else if (category !== 'all' && subCategory === 'all') {
        this.ctrl.filteredServices = this.$filter('filter')(this.ctrl.origServices, {category: category}, true);
    } else if (category === 'all' && subCategory !== 'all') {
        this.ctrl.filteredServices = this.$filter('filter')(this.ctrl.origServices, {subCategory: subCategory}, true);
    } else {
        this.ctrl.filteredServices = this.$filter('filter')(this.ctrl.origServices, {category: category, subCategory: subCategory}, true);
    }
    if (updateSubCategories) {
      this.ctrl.subCategories = this.getSubCategories(category);
    }
    this.ctrl.currentFilter = category;
    this.ctrl.currentSubFilter = (subCategory !== undefined) ? subCategory : 'all';
  }

  public getSubCategories(category: string) {
    let subCats = [];
    this.ctrl.categories.map(categoryObj => {
      if (category === 'all' || category === categoryObj.id) {
        subCats = subCats.concat(categoryObj.subCategories);
      }
    });
    return subCats;
  };

  public handleClick(item: any, e: any) {
    item.ctrl.serviceToOrder = item;
    item.ctrl.openOrderingPanel();
  };

  public openOrderingPanel() {
    this.ctrl.orderingPanelvisible = true;
  };

  public closeOrderingPanel() {
    this.ctrl.orderingPanelvisible = false;
  };

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    // console.log('$onChanges' + JSON.stringify(onChangesObj));
  }

  public $doCheck() {
    // console.log('$doCheck');
  }
}
