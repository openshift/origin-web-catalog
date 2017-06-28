import * as _ from 'lodash';

export class CatalogSearchController implements angular.IController {
  static $inject = ['$rootScope', '$scope', '$q', 'Catalog', 'KeywordService'];

  public ctrl: any = this;

  private Catalog: any;
  private KeywordService: any;
  private $rootScope: any;
  private $scope: any;
  private $q: any;
  private loaded: boolean = false;
  private maxResultsToShow: number = 5;

  // Used when the user starts typing before the items have loaded.
  private searchDeferred: ng.IDeferred<any[]>;

  constructor($rootScope: any, $scope: any, $q: any, Catalog: any, KeywordService: any) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$q = $q;
    this.Catalog = Catalog;
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
        let searchResult = this.filterForKeywords(this.ctrl.searchText);
        this.searchDeferred.resolve(searchResult);
        this.searchDeferred = null;
      }
    }
  }

  public itemSelected(item: any) {
    if (item.id === 'viewAll') {
      this.$rootScope.$emit('filter-catalog-items', {searchText: this.ctrl.searchText});
    } else if (item.id !== 'viewNone') {
      this.$scope.$emit('open-overlay-panel', item);
    }
    this.ctrl.searchText = '';
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

    return this.filterForKeywords(searchText);
  }

  private filterForKeywords(searchText: string) {
    let keywords = this.KeywordService.generateKeywords(searchText);
    let items = this.KeywordService.filterForKeywords(this.ctrl.catalogItems, ['name', 'tags'], keywords);
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
