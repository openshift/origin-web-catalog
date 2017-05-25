import * as angular from 'angular';
import * as _ from 'lodash';
import * as $ from 'jquery';

export class ServicesViewController implements angular.IController {
  static $inject = ['Constants', 'Catalog', 'Logger', 'HTMLService', '$filter', '$scope', '$timeout'];

  public ctrl: any = this;
  private constants: any;
  private catalog: any;
  private logger: any;
  private htmlService: any;
  private $filter: any;
  private $scope: any;
  private $timeout: any;
  private debounceResize: any;

  constructor(constants: any, catalog: any, logger: any, htmlService: any, $filter: any, $scope: any, $timeout: any) {
    this.constants = constants;
    this.catalog = catalog;
    this.logger = logger;
    this.htmlService = htmlService;
    this.$filter = $filter;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.ctrl.loaded = false;
    this.ctrl.isEmpty = false;
    this.ctrl.mobileView = 'categories';
  }

  public $onInit() {
    this.debounceResize = _.debounce(this.resizeExpansion, 50, { maxWait: 250 });
    angular.element(window).bind('resize', this.debounceResize);
    $(window).on('resize.services', this.debounceResize);
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.catalogItems && this.ctrl.catalogItems) {
      this.ctrl.categories = this.catalog.categories;
      this.filterByCategory('all', 'all', true);
      this.ctrl.isEmpty = _.isEmpty(this.ctrl.catalogItems);
      this.ctrl.loaded = true;
    }
  }

  public $onDestroy() {
    $(window).off('resize.services');
  }

  public selectCategory(category: string) {
    this.ctrl.mobileView = 'subcategories';
    this.filterByCategory(category, null, true);
  };

  public selectSubCategory(subCategory: string) {
    this.ctrl.mobileView = 'items';

    // Toggle the subcategory closed.
    if (this.ctrl.currentSubFilter === subCategory && this.htmlService.getBreakpoint() !== 'xxs') {
      subCategory = null;
      // Edge case where the window size changes later after toggling a subcategory closed.
      this.ctrl.mobileView = 'subcategories';
    }

    this.filterByCategory(this.ctrl.currentFilter, subCategory, false);
  }

  public getSubCategories(category: string) {
    let subCats: any = [];
    this.ctrl.categories.map(categoryObj => {
      if (category === categoryObj.id) {
        subCats = subCats.concat(categoryObj.subCategories);
      }
    });
    subCats = _.filter(subCats, {hasItems: true});
    // if 'all' and one other sub-cat, remove the 'all' and just
    // show the single subCat
    if (subCats[0].id === 'all' && subCats.length === 2) {
      subCats = _.drop(subCats, 1);
    }
    return subCats;
  }

  public handleClick = (item: any, e: any) => {
    this.$scope.$emit('open-overlay-panel', item);
  };

  private filterByCategory(category: string, subCategory: string, updateSubCategories: boolean) {
    let categoryObj: any;
    let subCategoryObj: any;

    if (category === 'all' || category === 'other') {
      subCategory = 'all';
    } else {
      if (updateSubCategories) {
        this.ctrl.subCategories = this.getSubCategories(category);
      }
      subCategory = (this.ctrl.subCategories.length === 1) ? this.ctrl.subCategories[0].id : (subCategory || null);
    }

    categoryObj =  _.find(this.ctrl.categories, {id: category});
    if (categoryObj) {
      if (subCategory) {
        subCategoryObj = _.find(categoryObj.subCategories, {id: subCategory});
        if (subCategoryObj) {
          this.ctrl.filteredItems = subCategoryObj.items;
        } else {
          this.logger.error("Could not find subcategory '" + subCategory + "' for category '" + category + "'");
        }
      }
    } else {
      this.logger.error("Could not find category '" + category + "'");
    }

    this.ctrl.currentFilter = category;
    this.ctrl.currentSubFilter = subCategory;
    this.updateActiveCardStyles();
  }

  private resizeExpansion = () => {
    let breakpoint = this.htmlService.getBreakpoint();
    $('.services-sub-category').removeAttr('style');
    if (breakpoint !== 'xxs') {
      // make room below the clicked subcategory for the items
      let activeCat = $('.services-sub-category.active');
      let contentHeight = activeCat.find('.services-items').outerHeight(true);
      activeCat.css('margin-bottom', contentHeight + 'px');
    }
  }

  private updateActiveCardStyles() {
    this.$timeout(this.resizeExpansion, 50);
  }
}
