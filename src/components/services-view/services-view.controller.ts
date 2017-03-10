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
    this.ctrl.loading = true;
  }

  public $onInit() {
    this.ctrl.currentFilter = 'all';
    this.ctrl.currentSubFilter = 'all';
    this.ctrl.expandSubCatRow = 0;
    this.ctrl.orderingPanelvisible = false;
    this.ctrl.loading = _.isEmpty(this.ctrl.services);

    this.updateAll();

    this.$scope.$on('cancelOrder', () => {
      this.ctrl.closeOrderingPanel();
    });
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.categories && !onChangesObj.categories.isFirstChange()) {
      this.ctrl.categories = onChangesObj.categories.currentValue;
      this.updateCategories();
    }
    if (onChangesObj.services && !onChangesObj.services.isFirstChange()) {
      this.ctrl.services = onChangesObj.services.currentValue;
      this.updateServices();
      this.ctrl.loading = false;
    }
  }

  public filterByCategory(category: string, subCategory: string, updateSubCategories: boolean) {
    if (category === 'all' && subCategory === 'all') {
      this.ctrl.filteredServices = this.ctrl.origServices;
    } else {
      this.ctrl.filteredServices = this.$filter('filter')(this.ctrl.origServices, (service: any) => {
        if (category !== 'all' && subCategory === 'all') {
          return service.metadata.category === category;
        } else if (category === 'all' && subCategory !== 'all') {
          return service.metadata.subCategory === subCategory;
        } else {
          return  service.metadata.category === category && service.metadata.subCategory === subCategory;
        }
      });
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

  private updateAll() {
    this.updateCategories();
    this.updateServices();
  }

  private updateServices() {
    this.ctrl.origServices = this.normalizeServices();
    this.ctrl.filteredServices = this.ctrl.origServices;
  }

  private updateCategories() {
    this.ctrl.categories = this.ctrl.categories;
    this.ctrl.subCategories = this.getSubCategories('all');
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

  private normalizeServices() {
    let retSvcs = [];
    _.each(this.ctrl.services, (service: any, key: string) => {
        // each service needs a call back to 'this' class
      _.assign(service, {ctrl: this});
      retSvcs.push(service);
    });
    return retSvcs;
  }
}
