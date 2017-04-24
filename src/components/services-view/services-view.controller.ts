import * as angular from 'angular';
import * as _ from 'lodash';
import * as $ from 'jquery';

export class ServicesViewController implements angular.IController {
  static $inject = ['Constants', 'Catalog', '$filter', '$scope', '$timeout'];

  public ctrl: any = this;
  private constants: any;
  private catalog: any;
  private $filter: any;
  private $scope: any;
  private $timeout: any;
  private debounceResize: any;

  constructor(constants: any, catalog: any, $filter: any, $scope: any, $timeout: any) {
    this.constants = constants;
    this.catalog = catalog;
    this.$filter = $filter;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.ctrl.loaded = false;
    this.ctrl.isEmpty = false;
  }

  public $onInit() {
    this.ctrl.currentFilter = 'all';
    this.ctrl.currentSubFilter = null;

    this.debounceResize = _.debounce(this.resizeExpansion, 50, { maxWait: 250 });
    angular.element(window).bind('resize', this.debounceResize);
    $(window).on('resize.services', this.debounceResize);
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.catalogItems && this.ctrl.catalogItems) {
      this.ctrl.filteredItems = this.ctrl.catalogItems;
      this.ctrl.categories = this.catalog.removeEmptyCategories(this.ctrl.filteredItems);
      this.ctrl.subCategories = this.getSubCategories('all');
      this.ctrl.isEmpty = _.isEmpty(this.ctrl.catalogItems);
      this.ctrl.loaded = true;
    }
  }

  public $onDestroy() {
    $(window).off('resize.services');
  }

  public filterByCategory = (category: string, subCategory: string, updateSubCategories: boolean) => {
    if (category === 'all' && subCategory === 'all') {
      this.ctrl.filteredItems =  this.ctrl.catalogItems;
    } else {
      this.ctrl.filteredItems = _.filter(this.ctrl.catalogItems, (item: any) => {
        if (category !== 'all' && subCategory === 'all') {
          return this.catalog.hasCategory(item, category);
        } else if (category === 'all' && subCategory !== 'all') {
          return this.catalog.hasSubCategory(item, subCategory);
        } else {
          return this.catalog.hasCategory(item, category) && this.catalog.hasSubCategory(item, subCategory);
        }
      });
    }

    if (updateSubCategories) {
      this.ctrl.subCategories = this.getSubCategories(category);
    }

    this.ctrl.currentFilter = category;
    this.ctrl.currentSubFilter = (this.ctrl.subCategories.length === 1) ? this.ctrl.subCategories[0].id : (subCategory || 'all');
    this.updateActiveCardStyles();
  }

  public selectSubCategory(subCategory: string) {
    this.filterByCategory(this.ctrl.currentFilter, subCategory, false);
  }

  public getSubCategories(category: string) {
    let subCats: any = [];
    this.ctrl.categories.map(categoryObj => {
      if (category === categoryObj.id) {
        subCats = subCats.concat(categoryObj.subCategories);
      }
    });
    if (subCats.length > 1) {
      subCats.unshift({id: 'all', label:  'All'});
    }
    return subCats;
  };

  public handleClick = (item: any, e: any) => {
    this.$scope.$emit('open-overlay-panel', item);
  };

  private resizeExpansion() {
    $('.services-sub-category').removeAttr('style');
    let activeCat = $('.services-sub-category.active');
    let contentHeight = activeCat.find('.services-items').innerHeight();
    activeCat.css('margin-bottom', contentHeight + 'px');
  }

  private updateActiveCardStyles() {
    this.$timeout(this.resizeExpansion, 50);
  }
}
