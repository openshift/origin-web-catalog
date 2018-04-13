import * as angular from 'angular';
import * as _ from 'lodash';
import * as $ from 'jquery';

export class ServicesViewController implements angular.IController {
  static $inject = ['Constants', 'Catalog', 'KeywordService', 'Logger', 'HTMLService', '$element', '$filter', '$location', '$rootScope', '$scope', '$timeout'];

  static readonly MAX_RESIZE_RETRIES: number = 20;

  public ctrl: any = this;
  private constants: any;
  private catalog: any;
  private keywordService: any;
  private logger: any;
  private htmlService: any;
  private element: any;
  private $filter: any;
  private $rootScope: any;
  private $location: any;
  private $scope: any;
  private $timeout: any;
  private scrollParent: any;
  private debounceResize: any;
  private removeFilterListener: any;

  // Only resize to the difference bteween the old and new heights.
  private previousSubCategoryHeight: number = 0;

  // We resize the height of the expanded subcategories in JavaScript.
  // Depending on the timing, the expanded content can have height 0 before the
  // items render. Count how many times we try to read the height before giving up.
  private resizeRetries: number = 0;

  constructor(constants: any, catalog: any, keywordService: any, logger: any, htmlService: any, $element: any, $filter: any,  $location: any, $rootScope: any, $scope: any, $timeout: any) {
    this.constants = constants;
    this.catalog = catalog;
    this.keywordService = keywordService;
    this.logger = logger;
    this.htmlService = htmlService;
    this.element = $element[0];
    this.$filter = $filter;
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.ctrl.loaded = false;
    this.ctrl.isEmpty = false;
    this.ctrl.mobileView = 'categories';
    this.ctrl.filterConfig = {
      resultsLabel: "Items",
      appliedFilters: []
    };
    this.ctrl.keywordFilterValue = null;
    this.ctrl.currentFilter = this.$location.search().category || 'all';
    this.ctrl.currentSubFilter = this.$location.search().category && this.$location.search().subcategory;
  }

  public $onInit() {
    this.debounceResize = _.debounce(() => this.resizeExpansion(false), 50, { maxWait: 250 });
    $(window).on('resize.services', this.debounceResize);

    this.ctrl.sectionTitle = this.ctrl.sectionTitle || 'Browse Catalog';

    this.removeFilterListener = this.$rootScope.$on('filter-catalog-items', (event: any, searchCriteria: any) => {
      this.setKeywordFilter(searchCriteria.searchText);
    });

    this.ctrl.emptyFilterConfig = {
      title: 'No results match.',
      info: 'The active filters are hiding all catalog items.',
      helpLink: {
        urlLabel: 'Clear All Filters',
        urlAction: this.clearAppliedFilters
      }
    };

    this.ctrl.noItemsConfig = {
        title: 'No items.',
        info: 'No catalog items have been loaded.',
        helpLink: {
            urlLabel: 'See Loading the Default Image Streams and Templates',
            url: 'https://docs.openshift.org/latest/install_config/imagestreams_templates.html'
        }
    };

    if (this.ctrl.keywordFilter) {
      this.setKeywordFilter(this.ctrl.keywordFilter);
    }
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.catalogItems && onChangesObj.catalogItems.currentValue) {
      this.ctrl.isEmpty = _.isEmpty(this.ctrl.catalogItems);
      if (!this.ctrl.isEmpty) {
        this.ctrl.categories = this.catalog.categorizeItems(this.ctrl.catalogItems);
        this.ctrl.vendors = this.catalog.getVendors(this.ctrl.catalogItems);
        this.filterByCategory(this.ctrl.currentFilter, this.ctrl.currentSubFilter, true);
      }
      this.ctrl.loaded = true;
    }
    if (onChangesObj.keywordFilter && !onChangesObj.keywordFilter.isFirstChange()) {
      this.setKeywordFilter(this.ctrl.keywordFilter);
    }
  }

  public $postLink() {
    this.scrollParent = this.getScrollParent(this.element);
    if (this.scrollParent && this.htmlService.isWindowAboveBreakpoint(this.htmlService.WINDOW_SIZE_SM)) {
      this.ctrl.viewStyle = {
        'min-height': 'calc(100vh - ' + this.scrollParent.getBoundingClientRect().top + 'px)'
      };
    }
  }

  public $onDestroy() {
    $(window).off('resize.services');
    this.removeFilterListener();
  }

  public selectCategory(category: string) {
    this.ctrl.mobileView = 'subcategories';
    this.clearAppliedFilters();
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

    this.clearAppliedFilters();
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
    if (subCats[0] && subCats[0].id === 'all' && subCats.length === 2) {
      subCats = _.drop(subCats, 1);
    }
    return subCats;
  }

  public serviceViewItemClicked = (item: any, e: any) => {
    this.$scope.$emit('open-overlay-panel', item);
  };

  // called when catalogFacetedFilter changes
  public applyFilters(event: any) {
    this.filterChange(event.appliedFilters);
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

      if (!subCategory) {
        subCategory = (this.ctrl.subCategories.length === 1) ? this.ctrl.subCategories[0].id : null;
      } else {
        let subCategoryExists = _.some(this.ctrl.subCategories, subCat => subCat.id === subCategory);
        subCategory = subCategoryExists ? subCategory : null;
      }
    }

    categoryObj =  _.find(this.ctrl.categories, {id: category});
    if (categoryObj) {
      if (subCategory) {
        subCategoryObj = _.find(categoryObj.subCategories, {id: subCategory});
        if (subCategoryObj) {
          this.ctrl.filteredItems = subCategoryObj.items;
          this.ctrl.filterConfig.totalCount = this.ctrl.filteredItems.length;
          this.ctrl.filterConfig.resultsCount = this.ctrl.filterConfig.totalCount;
        } else {
          this.logger.error("Could not find subcategory '" + subCategory + "' for category '" + category + "'");
        }
      }
    } else {
      this.logger.error("Could not find category '" + category + "'");
    }

    this.ctrl.currentFilter = category;
    this.ctrl.currentSubFilter = subCategory;
    subCategory = category === 'all' ? null : subCategory;
    this.$location.path(this.$location.path()).search({category: this.ctrl.currentFilter, subcategory: subCategory});
    this.updateActiveCardStyles();
  }

  private setKeywordFilter (keyword: String) {
    this.ctrl.keywordFilterValue = keyword;
    this.ctrl.currentFilter = this.ctrl.currentSubFilter = 'all';
    this.ctrl.mobileView = 'subcategories';
  }

  private filterForKeywords (searchText: string, items: any) {
    let keywords = this.keywordService.generateKeywords(searchText);
    return this.keywordService.weightedSearch(items, this.constants.CATALOG_SEARCH_FIELDS, keywords);
  }

  private filterForVendors (vendors: string[], items: any) {
    return _.filter(items, (item: any) => {
      return _.includes(vendors, item.vendor);
    });
  }

  private filterChange = (filters: any) => {
    this.filterByCategory(this.ctrl.currentFilter, this.ctrl.currentSubFilter, false);

    if (!_.isEmpty(filters)) {
      _.each(filters, (filter: any) => {
        switch (filter.id) {
          case "keyword":
            this.ctrl.filteredItems = this.filterForKeywords(filter.values[0], this.ctrl.filteredItems);
            break;
          case "vendors":
            this.ctrl.filteredItems = this.filterForVendors(filter.values, this.ctrl.filteredItems);
            break;
        }
      });
    }

    this.ctrl.filterConfig.resultsCount = this.ctrl.filteredItems.length;
    this.ctrl.keywordFilterValue = null;  //reset flag
  };

  private clearAppliedFilters = () => {
    this.$scope.$broadcast('clear-filters');
  };

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

  private resizeExpansion(subCategoryChanged: boolean) {
    // Unless at mobile, add a bottom margin to the tab to accommodate the
    // subcategory content. The content element is a child of the tab.
    if (this.ctrl.currentFilter !== 'all' &&
        this.ctrl.currentFilter !== 'other' &&
        this.ctrl.currentSubFilter &&
        this.htmlService.isWindowAboveBreakpoint(this.htmlService.WINDOW_SIZE_XS)) {
      // Give up if we are past the max retries.
      if (this.resizeRetries > ServicesViewController.MAX_RESIZE_RETRIES) {
        this.resizeRetries = 0;
        return;
      }

      // Find the active category content, and calculate the size of the items.
      let activeCat = $('#' + this.ctrl.currentSubFilter);
      let servicesItems = activeCat.find('.services-items');
      let contentHeight = servicesItems.outerHeight(true);
      if (!contentHeight) {
        // The content has not rendered yet. Try again in 50ms.
        this.resizeRetries++;
        setTimeout(() => this.resizeExpansion(subCategoryChanged), 50);
      }

      if (subCategoryChanged) {
        // Remove any previous values set on other active tabs when the selection changes.
        $('.services-sub-category').removeAttr('style').removeClass('items-shown');
        activeCat.css('margin-bottom', this.previousSubCategoryHeight + 'px');
        activeCat.animate({
          'margin-bottom': contentHeight
        }, 100, 'swing', () => {
          activeCat.addClass('items-shown');
        });
      } else {
        activeCat.css('margin-bottom', contentHeight + 'px');
        activeCat.addClass('items-shown');
      }

      this.previousSubCategoryHeight = contentHeight;
    } else {
      $('.services-sub-category').removeAttr('style').removeClass('items-shown');
      this.previousSubCategoryHeight = 0;
      this.resizeRetries = 0;
    }

    this.$scope.$evalAsync(() => {
      this.scrollParent = this.getScrollParent(this.element);
      if (this.htmlService.isWindowAboveBreakpoint(this.htmlService.WINDOW_SIZE_SM) && this.scrollParent) {
        this.ctrl.viewStyle = {
          'min-height': 'calc(100vh - ' + this.scrollParent.getBoundingClientRect().top + 'px)'
        };
      } else {
        this.ctrl.viewStyle = undefined;
      }
    });
  }

  private updateActiveCardStyles() {
    this.$timeout(() => this.resizeExpansion(true));
  }
}
