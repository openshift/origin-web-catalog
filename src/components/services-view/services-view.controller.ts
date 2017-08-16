import * as angular from 'angular';
import * as _ from 'lodash';
import * as $ from 'jquery';

export class ServicesViewController implements angular.IController {
  static $inject = ['Constants', 'Catalog', 'KeywordService', 'Logger', 'HTMLService', '$element', '$filter', '$rootScope', '$scope', '$timeout'];

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
  private $scope: any;
  private $timeout: any;
  private scrollParent: any;
  private debounceResize: any;
  private keywordFilterField: any = {
    id: 'keyword',
    title:  'Keyword',
    placeholder: 'Filter by Keyword in Category',
    filterType: 'text'
  };
  private removeFilterListener: any;

  // Only resize to the difference bteween the old and new heights.
  private previousSubCategoryHeight: number = 0;

  // We resize the height of the expanded subcategories in JavaScript.
  // Depending on the timing, the expanded content can have height 0 before the
  // items render. Count how many times we try to read the height before giving up.
  private resizeRetries: number = 0;

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
    this.debounceResize = _.debounce(() => this.resizeExpansion(false), 50, { maxWait: 250 });
    angular.element(window).bind('resize', this.debounceResize);
    $(window).on('resize.services', this.debounceResize);

    this.removeFilterListener = this.$rootScope.$on('filter-catalog-items', (event: any, searchCriteria: any) => {
      let keyWordFilter: any = angular.copy(this.keywordFilterField);
      keyWordFilter.value = searchCriteria.searchText;
      this.ctrl.currentFilter = this.ctrl.currentSubFilter = 'all';
      this.ctrl.mobileView = 'subcategories';
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

  public serviceViewItemClicked = (item: any, e: any) => {
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

    // only use filters which have a filter criteria 'value'
    // prevents applying an empty keyword filter
    // TODO: can remove the following line of code after angular-patternfly issue is fixed:
    //   https://github.com/patternfly/angular-patternfly/issues/509
    filters = _.filter(filters, 'value');

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

    if (this.htmlService.isWindowAboveBreakpoint(this.htmlService.WINDOW_SIZE_SM)) {
      if (this.scrollParent && !_.get(this.ctrl.viewStyle, 'min-height')) {
        this.ctrl.viewStyle = {
          'min-height': 'calc(100vh - ' + this.scrollParent.getBoundingClientRect().top + 'px)'
        };
      }
    } else {
      this.ctrl.viewStyle = undefined;
    }
  }

  private updateActiveCardStyles() {
    this.$timeout(() => this.resizeExpansion(true));
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
