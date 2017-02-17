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
    this.ctrl.allServices = this.ctrl.origServices;
    this.ctrl.featuredServices = this.$filter('filter')(this.ctrl.origServices, {featured: true}, false);
    this.ctrl.currentFilter = 'all';
    this.ctrl.currentSubFilter = 'all';
    this.ctrl.serviceCategories = this.getServiceCategories();
    this.ctrl.orderingPanelvisible = false;

    this.$scope.$on('cancelOrder', () => {
      this.ctrl.closeOrderingPanel();
    });
  }

  public getServiceCategories() {
    let uniqueCategories = [];
    let uniqueCategoriesVals = this.ctrl.origServices.map(item => item.category)
        .filter((value, index, self) => self.indexOf(value) === index);
    uniqueCategoriesVals.forEach((value, index, self) => {
      let obj = {'label': '', 'value': ''};
      obj.label = (value === 'cicd') ? 'CI/CD' : value.charAt(0).toUpperCase() + value.slice(1);
      obj.value = value;
      uniqueCategories[index] = obj;
    });
    return uniqueCategories;
  };

  public filterByCategory(category: string, subCategory: string) {
    if (category === 'all') {
      this.ctrl.allServices = this.ctrl.origServices;
    } else {
      if (subCategory === undefined || subCategory === 'all') {
        this.ctrl.allServices = this.$filter('filter')(this.ctrl.origServices, {category: category}, true);
        this.ctrl.serviceSubCategories = this.getServiceSubCategories(category);
      } else {
        this.ctrl.allServices = this.$filter('filter')(this.ctrl.origServices, {category: category, subCategory: subCategory}, true);
      }
    }
    this.ctrl.featuredServices = this.$filter('filter')(this.ctrl.allServices, {featured: true}, true);
    this.ctrl.currentFilter = category;
    this.ctrl.currentSubFilter = (subCategory !== undefined) ? subCategory : 'all';
  }

  public getServiceSubCategories(category: string) {
    let uniqueCategories = [];
    let uniqueCategoriesVals = this.ctrl.allServices.map(item => item.subCategory)
        .filter((value, index, self) => self.indexOf(value) === index);
    uniqueCategoriesVals.forEach((value, index, self) => {
      let obj = {'label': '', 'value': ''};
      obj.label = value.charAt(0).toUpperCase() + value.slice(1);
      obj.value = value;
      uniqueCategories[index] = obj;
    });
    return uniqueCategories;
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
