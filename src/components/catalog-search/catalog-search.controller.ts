import * as angular from 'angular';
import * as _ from 'lodash';
import * as $ from 'jquery';

export class CatalogSearchController implements angular.IController {
  static $inject = ['$rootScope', '$scope', '$timeout', '$q', 'Catalog', 'Constants', 'KeywordService'];

  public ctrl: any = this;

  private Catalog: any;
  private Constants: any;
  private KeywordService: any;
  private $rootScope: any;
  private $scope: any;
  private $timeout: any;
  private $q: any;
  private loaded: boolean = false;
  private maxResultsToShow: number = 5;

  // Used when the user starts typing before the items have loaded.
  private searchDeferred: ng.IDeferred<any[]>;

  constructor($rootScope: any, $scope: any, $timeout: any, $q: any, Catalog: any, Constants: any, KeywordService: any) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$q = $q;
    this.Catalog = Catalog;
    this.Constants = Constants;
    this.KeywordService = KeywordService;
  }

  public $onInit() {
    this.ctrl.searchText = '';
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.catalogItems && this.ctrl.catalogItems) {

      this.loaded = true;

      // Show search results now if the user began typing before the items loaded.
      if (this.searchDeferred) {
        let searchResult = this.weightedSearch(this.ctrl.searchText);
        this.searchDeferred.resolve(searchResult);
        this.searchDeferred = null;
      }
    }
  }

  public onKeyPress = (keyEvent: any) => {
    if (keyEvent.which === 13 && this.ctrl.searchText) {
      this.$rootScope.$emit('filter-catalog-items', {searchText: this.ctrl.searchText});
      this.ctrl.searchText = '';
    }
  };

  public itemSelected(item: any) {
    if (item.id === 'viewAll') {
      this.$rootScope.$emit('filter-catalog-items', {searchText: this.ctrl.searchText});
    } else if (item.id !== 'viewNone') {
      this.$scope.$emit('open-overlay-panel', item);
    }
    this.ctrl.searchText = '';
    this.ctrl.mobileSearchInputShown = false;
    if (_.isFunction(this.ctrl.searchToggleCallback)) {
      this.ctrl.searchToggleCallback(this.ctrl.mobileSearchInputShown);
    }
  }

  public search(searchText: string) {
    if (!searchText) {
      return [];
    }

    // If the items haven't loaded, return a promise instead.
    if (!this.loaded) {
      this.searchDeferred = this.$q.defer();
      return this.searchDeferred.promise;
    }

    return this.weightedSearch(searchText);
  }

  public toggleMobileShowSearchInput() {
    this.ctrl.mobileSearchInputShown = !this.ctrl.mobileSearchInputShown;
    this.ctrl.searchText = '';
    if (_.isFunction(this.ctrl.searchToggleCallback)) {
      this.ctrl.searchToggleCallback(this.ctrl.mobileSearchInputShown);
    }
    if (this.ctrl.mobileSearchInputShown) {
      this.setSearchInputFocus(0);
    }
  }

  public setSearchInputFocus(timeSoFar: number) {
    var searchInput: any = $('.catalog-search-input');

    if (searchInput.is(':visible')) {
      searchInput.focus();
    } else if (timeSoFar < 5) {
      this.$timeout(() => {
        this.setSearchInputFocus(timeSoFar + 1);
      }, 100);
    }
  }

  private weightedSearch(searchText: string) {
    let keywords = this.KeywordService.generateKeywords(searchText);
    let items = this.KeywordService.weightedSearch(this.ctrl.catalogItems, this.Constants.CATALOG_SEARCH_FIELDS, keywords);
    let totalNumItems: number = _.size(items);
    let results: any = _.take(items, this.maxResultsToShow);

    if (totalNumItems === 0) {
      results.push({id: 'viewNone', text: "No results found for Keyword: " + searchText, name: searchText});
    } else if (totalNumItems === 1) {
      results.push({id: 'viewAll', text: "View the result for Keyword: " + searchText, name: searchText});
    } else if (totalNumItems > 1) {
      results.push({id: 'viewAll', text: "View all " + totalNumItems + " results for Keyword: " + searchText, name: searchText});
    }

    return results;
  }
}
