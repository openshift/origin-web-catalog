import * as angular from 'angular';
import * as _ from 'lodash';

export class ServicesViewController implements angular.IController {
  static $inject = ['$filter', '$scope'];

  public ctrl: any = this;
  public cardViewConfig: any;
  private $filter: any;
  private $scope: any;
  private subCatMaxRowLength: number = 10;

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
    this.ctrl.origServices = this.ctrl.services.map(a => _.assign(a, {ctrl: this}));
    this.ctrl.currentFilter = 'all';
    this.ctrl.currentSubFilter = 'all';
    this.ctrl.filteredServices = this.ctrl.origServices;
    this.ctrl.categories = this.ctrl.categories;
    this.ctrl.subCategories = this.getSubCategories('all');
    this.ctrl.expandSubCatRow = 0;
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

    this.ctrl.expandSubCatRow = this.getRowOfSubCategory(subCategory);

    this.ctrl.currentFilter = category;
    this.ctrl.currentSubFilter = (subCategory !== undefined) ? subCategory : 'all';
  }

  public getSubCategories(category: string) {
    let subCats = [{id: 'all', label:  'All'}];
    this.ctrl.categories.map(categoryObj => {
      if (category === 'all' || category === categoryObj.id) {
        subCats = subCats.concat(categoryObj.subCategories);
      }
    });

    subCats = this.makeRows(subCats);

    return subCats;
  };

  public handleClick(item: any, e: any) {
    item.ctrl.serviceToOrder = item;
    item.ctrl.openOrderingPanel();
  };

  public openOrderingPanel() {
    this.ctrl.orderingPanelvisible = true;
  };

  public closeOrderingPanel = () => {
    this.ctrl.orderingPanelvisible = false;
  };

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    // console.log('$onChanges' + JSON.stringify(onChangesObj));
  }

  public $doCheck() {
    // console.log('$doCheck');
  }

  private makeRows(subCats: any) {
    let subCatsRows: any = [];
    for (let i = 0, len = subCats.length; i < len; i += this.subCatMaxRowLength) {
      subCatsRows.push(subCats.slice(i, i + this.subCatMaxRowLength));
    }
    return subCatsRows;
  }

  private getRowOfSubCategory(subCategory: string) {
    for (let row = 0; row < this.ctrl.subCategories.length; row += 1) {
      for (let card = 0; card < this.ctrl.subCategories[row].length; card += 1) {
        if (this.ctrl.subCategories[row][card].id === subCategory) {
          return row;
        }
      }
    }
  }
}
