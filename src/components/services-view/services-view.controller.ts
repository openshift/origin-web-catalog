import * as angular from 'angular';
import * as _ from 'lodash';
import * as $ from 'jquery';

export class ServicesViewController implements angular.IController {
  static $inject = ['Constants', 'Catalog', 'KeywordService', 'Logger', 'HTMLService', '$element', '$filter', '$rootScope', '$scope', '$timeout'];

  public ctrl: any = this;
  private constants: any;
  private catalog: any;
  private keywordService: any;
  private logger: any;
  private htmlService: any;
  private element: any;
  private $filter: any;
  private $rootScope: any;
  private $scope: any;
  private $timeout: any;
  private scrollParent: any;
  private debounceResize: any;
  private keywordFilterField: any = {
    id: 'keyword',
    title:  'Keyword',
    placeholder: 'Filter by keyword in Category',
    filterType: 'text'
  };
  private removeFilterListener: any;

  constructor(constants: any, catalog: any, keywordService: any, logger: any, htmlService: any, $element: any, $filter: any, $rootScope: any, $scope: any, $timeout: any) {
    this.constants = constants;
    this.catalog = catalog;
    this.keywordService = keywordService;
    this.logger = logger;
    this.htmlService = htmlService;
    this.element = $element[0];
    this.$filter = $filter;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.ctrl.loaded = false;
    this.ctrl.isEmpty = false;
    this.ctrl.mobileView = 'categories';
    this.ctrl.filterConfig = {};
  }

  public $onInit() {
    this.debounceResize = _.debounce(this.resizeExpansion, 50, { maxWait: 250 });
    angular.element(window).bind('resize', this.debounceResize);
    $(window).on('resize.services', this.debounceResize);

    this.removeFilterListener = this.$rootScope.$on('filter-catalog-items', (event: any, searchCriteria: any) => {
      let keyWordFilter: any = angular.copy(this.keywordFilterField);
      keyWordFilter.value = searchCriteria.searchText;
      this.ctrl.currentFilter = this.ctrl.currentSubFilter = 'all';
      this.filterChange([keyWordFilter]);
    });

    this.ctrl.filterConfig = {
      fields: [this.keywordFilterField],
      resultsCount: 0,
      appliedFilters: [],
      onFilterChange: this.filterChange
    };
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.catalogItems && this.ctrl.catalogItems) {
      this.ctrl.categories = this.catalog.categories;
      this.filterByCategory('all', 'all', true);
      this.ctrl.isEmpty = _.isEmpty(this.ctrl.catalogItems);
      this.ctrl.loaded = true;
    }
  }

  public $postLink() {
    this.scrollParent = this.getScrollParent(this.element);
    if (this.scrollParent) {
      this.ctrl.viewStyle = {
        'min-height': 'calc(100vh - ' + this.scrollParent.offsetTop + 'px)'
      };
    }
  }

  public $onDestroy() {
    $(window).off('resize.services');
    this.removeFilterListener();
  }

  public selectCategory(category: string) {
    this.ctrl.mobileView = 'subcategories';
    this.filterByCategory(category, null, true);

    // Scroll to show category browsing at the top of the page
    if (this.scrollParent) {
      let scrollElement: any = $(this.scrollParent);
      if (scrollElement.scrollTop() !== this.element.offsetTop) {
        scrollElement.animate(
          {
            scrollTop: this.element.offsetTop
          },
          200
        );
      }
    }
  }

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

    this.clearAppliedFilters();

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
          this.ctrl.totalCount = this.ctrl.filteredItems.length;
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
    this.updateFilterControls();
  }

  private filterForKeywords (searchText: string, items: any) {
    let keywords = this.keywordService.generateKeywords(searchText);
    return this.keywordService.filterForKeywords(items, ['name', 'tags'], keywords);
  }

  private filterChange = (filters: any) => {
    this.filterByCategory(this.ctrl.currentFilter, this.ctrl.currentSubFilter, false);

    this.ctrl.filterConfig.appliedFilters = filters;

    if (filters && filters.length > 0) {
      _.each(filters, (filter) => {
        this.ctrl.filteredItems = this.filterForKeywords(filter.value, this.ctrl.filteredItems);
      });
    }

    this.updateFilterControls();
  };

  private clearAppliedFilters() {
    this.ctrl.filterConfig.appliedFilters = [];
  }

  private  getScrollParent(node: any) {
    if (node === null || !(node instanceof Element)) {
      return null;
    }

    let overflowY: string = window.getComputedStyle(node).overflowY;
    if (overflowY !== 'visible' && overflowY !== 'hidden') {
      return node;
    } else {
      return this.getScrollParent(node.parentNode);
    }
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
  };

  private updateActiveCardStyles() {
    this.$timeout(this.resizeExpansion, 50);
  }

  private updateFilterControls() {
    this.$timeout(() => {
      if (this.ctrl.filterConfig.appliedFilters.length > 0) {
        this.ctrl.filterConfig.resultsCount = this.ctrl.filteredItems.length;
        $('.toolbar-pf-results h5').text(this.ctrl.filterConfig.resultsCount + ' of ' + this.ctrl.totalCount + ' items');
      } else {
        $('.toolbar-pf-results h5').text(this.ctrl.totalCount + (this.ctrl.totalCount === 1 ? ' item' : ' items'));
        if (this.ctrl.totalCount <= 1) {
          $('.filter-pf.filter-fields input').attr('disabled', '');
        } else {
          $('.filter-pf.filter-fields input').removeAttr("disabled");
        }
      }
    }, 0);
  }
};
