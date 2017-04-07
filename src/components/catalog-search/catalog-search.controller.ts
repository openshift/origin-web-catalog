import * as _ from 'lodash';

export class CatalogSearchController implements angular.IController {
  static $inject = ['$scope', '$q', 'Catalog', 'KeywordService'];

  public ctrl: any = this;

  private Catalog: any;
  private KeywordService: any;
  private allItems: any[];
  private $scope: any;
  private $q: any;
  private loaded: boolean = false;
  // Used when the user starts typing before the items have loaded.
  private searchDeferred: ng.IDeferred<any[]>;

  constructor($scope: any, $q: any, Catalog: any, KeywordService: any) {
    this.$scope = $scope;
    this.$q = $q;
    this.Catalog = Catalog;
    this.KeywordService = KeywordService;
  }

  public $onInit() {
    this.ctrl.searchText = '';
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.serviceClasses || onChangesObj.imageStreams) {
      if (!this.ctrl.serviceClasses && !this.ctrl.imageStreams) {
        return;
      }

      // Convert service classes to ServiceItem, which is needed for the ordering panel.
      let items = _.map(this.ctrl.serviceClasses, (serviceClass) => {
        return this.Catalog.getServiceItem(serviceClass);
      });

      // Convert builders to ImageItem.
      items = items.concat(_.map(this.ctrl.imageStreams, (imageStream) => {
        return this.Catalog.getImageItem(imageStream);
      }));

      // Remove null items (non-builder images).
      items = _.reject(items, (item) => {
        return !item;
      });

      this.allItems = _.sortBy(items, 'name');
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
    this.$scope.$emit('open-overlay-panel', item);
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
    let items = this.KeywordService.filterForKeywords(this.allItems, ['name', 'tags', 'resource.osbTags'], keywords);
    return _.take(items, 5);
  }
}
