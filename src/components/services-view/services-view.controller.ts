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
  private serviceClassesLoaded = false;
  private imageStreamsLoaded = false;
  private debounceResize: any;

  constructor(constants: any, catalog: any, $filter: any, $scope: any, $timeout: any) {
    this.constants = constants;
    this.catalog = catalog;
    this.$filter = $filter;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.ctrl.loading = true;
  }

  public $onInit() {
    this.ctrl.allItems = [];
    this.ctrl.currentFilter = 'all';
    this.ctrl.currentSubFilter = null;

    this.updateAll();

    this.debounceResize = _.debounce(this.resizeExpansion, 50, { maxWait: 250 });
    angular.element(window).bind('resize', this.debounceResize);
    $(window).on('resize.services', this.debounceResize);
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.serviceClasses && !onChangesObj.serviceClasses.isFirstChange()) {
      this.ctrl.serviceClasses = onChangesObj.serviceClasses.currentValue;
      this.serviceClassesLoaded = true;
      this.updateServiceClasses();
    }

    if (onChangesObj.imageStreams && !onChangesObj.imageStreams.isFirstChange()) {
      this.ctrl.imageStreams = onChangesObj.imageStreams.currentValue;
      this.imageStreamsLoaded = true;
      this.updateImageStreams();
    }
  }

  public $onDestroy() {
    $(window).off('resize.services');
  }

  public filterByCategory(category: string, subCategory: string, updateSubCategories: boolean) {
    if (category === 'all' && subCategory === 'all') {
      this.ctrl.filteredItems =  this.ctrl.allItems;
    } else {
      this.ctrl.filteredItems = _.filter(this.ctrl.allItems, (item: any) => {
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

  private updateAll() {
    this.updateServiceClasses();
    this.updateImageStreams();
  }

  private updateState() {
    this.ctrl.loading = ((_.isEmpty(this.ctrl.serviceClasses) && !this.serviceClassesLoaded) ||
    (_.isEmpty(this.ctrl.imageStreams) && !this.imageStreamsLoaded));

    if (!this.ctrl.loading) {
      this.ctrl.filteredItems = this.ctrl.allItems;
      this.ctrl.categories = this.catalog.removeEmptyCategories(this.ctrl.filteredItems);
      this.ctrl.subCategories = this.getSubCategories('all');
    }
  }

  private sort(items: any[]) {
    // Perform a case-insensitive sort on display name, falling back to kind
    // and metadata.name for a stable sort when items have the same display name.
    return _.sortByAll(items, [(item) => item.name.toLowerCase(), 'resource.kind', 'resource.metadata.name']);
  }

  private updateServiceClasses() {
    let allItems = this.ctrl.allItems.concat(this.normalizeData('service', this.ctrl.serviceClasses));
    this.ctrl.allItems = this.sort(allItems);
    this.updateState();
  }

  private updateImageStreams() {
    let allItems = this.ctrl.allItems.concat(this.normalizeData('image', this.ctrl.imageStreams));
    this.ctrl.allItems = this.sort(allItems);
    this.updateState();
  }

  private normalizeData = (type: string, items: any) => {
    let retSvcs = [];
    let objClass: any;
    _.each(items, (item: any) => {
      if (type === 'service') {
        objClass = this.catalog.getServiceItem(item);
      } else if (type === 'image') {
        objClass = this.catalog.getImageItem(item);
      }
      if (objClass) {
        retSvcs.push(objClass);
      }
    });
    return retSvcs;
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
