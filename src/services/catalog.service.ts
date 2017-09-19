import * as angular from 'angular';
import * as _ from 'lodash';

export class CatalogService {
  static $inject = ['$filter', '$q', 'Constants', 'APIService', 'DataService', 'Logger'];

  public $filter: any;
  public categories: any;
  public vendors: any = [];
  private $q: any;
  private constants: any;
  private apiService: any;
  private dataService: any;
  private logger: any;

  constructor($filter: any, $q: any, constants: any, APIService: any, DataService: any, Logger: any) {
    this.$filter = $filter;
    this.$q = $q;
    this.constants = constants;
    this.apiService = APIService;
    this.dataService = DataService;
    this.logger = Logger;
  }

  public getCatalogItems(includeTemplates: boolean) {
    let deferred = this.$q.defer();
    let catalogItems: any = {};
    let totalNumPromises: number = 0;
    let numPromisesExecuted: number = 0;
    let errorMsg: any = [];

    // Only request service classes if the kind is available.
    let serviceClassResourceGroup = {
      group: 'servicecatalog.k8s.io',
      resource: 'serviceclasses'
    };
    if (this.apiService.apiInfo(serviceClassResourceGroup)) {
      ++totalNumPromises;
      this.dataService.list(serviceClassResourceGroup, {}).then( (resources: any) => {
        catalogItems.serviceClasses = resources.by("metadata.name");
      }, () => {
        errorMsg.push('service classes');
      }).finally(() => {
        this.returnCatalogItems(deferred, catalogItems, ++numPromisesExecuted, totalNumPromises, errorMsg);
      });
    }

    ++totalNumPromises;
    this.dataService.list("imagestreams", {namespace: "openshift"}).then( (resources: any) => {
      catalogItems.imageStreams = resources.by("metadata.name");
    }, () => {
      errorMsg.push('builder images');
    }).finally(() => {
      this.returnCatalogItems(deferred, catalogItems, ++numPromisesExecuted, totalNumPromises, errorMsg);
    });

    if (includeTemplates) {
      ++totalNumPromises;
      this.dataService.list("templates", {namespace: "openshift"}, null, {partialObjectMetadataList: true}).then((resources: any) => {
        catalogItems.templates = resources.by("metadata.name");
      }, () => {
        errorMsg.push('templates');
      }).finally(() => {
        this.returnCatalogItems(deferred, catalogItems, ++numPromisesExecuted, totalNumPromises, errorMsg);
      });
    }

    return deferred.promise;
  }

  public getProjectCatalogItems(projectName: string, includeImages: boolean = true, includeTemplates: boolean = true, partialObjectMetadataList: boolean = false ) {
    let deferred = this.$q.defer();
    let catalogItems: any = {
      imageStreams: [],
      templates: []
    };
    let totalNumPromises: number = 0;
    let numPromisesExecuted: number = 0;
    let errorMsg: any = [];

    if (includeImages) {
      totalNumPromises++;
      this.dataService.list("imagestreams", {namespace: projectName}).then((resources: any) => {
        catalogItems.imageStreams = resources.by("metadata.name");
      }, () => {
        errorMsg.push('builder images');
      }).finally(() => {
        this.returnCatalogItems(deferred, catalogItems, ++numPromisesExecuted, totalNumPromises, errorMsg);
      });
    }

    if (includeTemplates) {
      totalNumPromises++;
      this.dataService.list("templates", {namespace: projectName}, null, {partialObjectMetadataList: partialObjectMetadataList}).then((resources: any) => {
        catalogItems.templates = resources.by('metadata.name');
      }, () => {
        errorMsg.push('templates');
      }).finally(() => {
        this.returnCatalogItems(deferred, catalogItems, ++numPromisesExecuted, totalNumPromises, errorMsg);
      });
    }

    return deferred.promise;
  }

  public convertToServiceItems(serviceClasses: any, imageStreams: any, templates: any) {
    // Convert service classes to ServiceItem
    let items: any = _.map(serviceClasses, (serviceClass: any) => {
      return this.getServiceItem(serviceClass);
    });

    // Convert builders to ImageItem.
    items = items.concat(_.map(imageStreams, (imageStream: any) => {
      return this.getImageItem(imageStream);
    }));

    items = items.concat(_.map(templates, (template: any) => {
      return this.getTemplateItem(template);
    }));

    // Remove null items (non-builder images).
    items = _.reject(items, (item: any) => {
      return !item;
    });

    // Perform a case-insensitive sort on display name, falling back to kind
    // and metadata.name for a stable sort when items have the same display name.
    items = items.sort((item1: any, item2: any) => {
      let comparison = _.get(item1, 'name', '').localeCompare(_.get(item2, 'name', ''), undefined, {sensitivity: 'base'});

      if (comparison === 0) {
        comparison = _.get(item1, 'resource.kind', '').localeCompare(_.get(item2, 'resource.kind', ''), undefined, {sensitivity: 'base'});
      }

      if (comparison === 0) {
        comparison = _.get(item1, 'resource.metadata.name', '').localeCompare(_.get(item2, 'resource.metadata.name', ''), undefined, {sensitivity: 'base'});
      }

      return comparison;
    });

    this.categorizeItems(items);

    return items;
  }

  public getServiceItem(resource: any) {
    return new ServiceItem(resource, this);
  }

  public getImageItem(resource: any) {
    let imgStream = new ImageItem(resource, this);
    return imgStream.builderSpecTagName ? imgStream : null;
  }

  public getTemplateItem(resource: any) {
    return new TemplateItem(resource, this);
  }

  public getPublisherSynonym(rawVendor: string): string {
    return _.get(this.constants, ['PUBLISHER_SYNONYMS', rawVendor]) as string || rawVendor;
  }

  /**
   * Creates an items array under each sub-category and categorizes each
   * item accordingly.  Dynamically creates 'all' and 'other' main and sub-
   * categories as needed.
   */
  private categorizeItems(items: any) {
    let filteredSubCats: any;
    let itemCategorized: boolean;
    this.categories = angular.copy(this.constants.SERVICE_CATALOG_CATEGORIES);
    this.createAllAndOtherMainCategories();

    let allMainCategory: any = _.head(this.categories);
    let allSubCatOfAll: any = _.get(allMainCategory, 'subCategories[0]');
    let otherMainCategory: any = _.last(this.categories);
    let allSubCatOfOther: any = _.get(otherMainCategory, 'subCategories[0]');
    let vendors = {};

    _.each(items, (item: any) => {
      if (item.vendor) {
        vendors[item.vendor] = true;
      }
      itemCategorized = false;
      _.each(this.categories, (category: any) => {
        if (category.tags) {
          if (this.hasMatchingTags(category.tags, item.tags)) {
            itemCategorized = this.categorizeItem(item, category, 'all');
            filteredSubCats = this.filterSubCatsByTags(category.subCategories, item.tags);
            if (!_.isEmpty(filteredSubCats)) {
              _.each(filteredSubCats, (subCategory: any) => {
                this.categorizeItem(item, category, subCategory);
              });
            } else {
              this.categorizeItem(item, category, 'other');
            }
          }
        } else {
          filteredSubCats = this.filterSubCatsByTags(category.subCategories, item.tags);
          if (!_.isEmpty(filteredSubCats)) {
            itemCategorized = this.categorizeItem(item, category, 'all');
            _.each(filteredSubCats, (subCategory: any) => {
              this.categorizeItem(item, category, subCategory);
            });
          }
        }
      });  // .ea category
      if (!itemCategorized) {
        this.categorizeItem(item, otherMainCategory, allSubCatOfOther);
      }
      this.categorizeItem(item, allMainCategory, allSubCatOfAll);
    });  // .ea item

    this.vendors = _.keys(vendors).sort();
  }

  private categorizeItem(item: any, category: any, subCategory: any) {
    if (_.isString(subCategory)) {
      subCategory = this.getAllOrOtherSubCategory(category, subCategory);
    }

    subCategory.items = _.isArray(subCategory.items) ? subCategory.items.concat([item]) : [item];

    return category.hasItems = subCategory.hasItems = true;
  }

  private createAllAndOtherMainCategories() {
    this.categories.unshift({
      id: 'all', label: 'All', subCategories: [
        {id: 'all', label: 'All'}
      ]
    });
    this.categories.push({
      id: 'other', label: 'Other', subCategories: [
        {id: 'all', label: 'all'}
      ]
    });
  }

  private getAllOrOtherSubCategory(category: any, subCategory: string) {

    let subCatObj: any = _.find(category.subCategories, {id: subCategory});

    if (!subCatObj) {
      if (subCategory === 'other') {
        subCatObj = {id: 'other', label: 'Other'};
        category.subCategories.push(subCatObj);
      } else {
        subCatObj = {id: 'all', label: 'All'};
        category.subCategories.unshift(subCatObj);
      }
    }

    return subCatObj;
  }

  private hasMatchingTags(tagsOne: any, tagsTwo: any) {
    return _.some(tagsOne, function(tagOne: string) {
      let tagOneLower: string = tagOne.toLowerCase();
      return _.some(tagsTwo, function(tagTwo: string){
        return tagOneLower === tagTwo.toLowerCase();
      });
    });
  };

  private filterSubCatsByTags(subCats: any, tags: any) {
    return _.filter(subCats, (subCat: any) => {
      return this.hasMatchingTags(subCat.tags, tags);
    });
  }

  private returnCatalogItems(deferred: any, catalogItems: any, numPromisesExecuted: number, totalNumPromises: number, errorMsg: any) {
    if (numPromisesExecuted < totalNumPromises) {
      return;
    }

    errorMsg = _.size(errorMsg) ? 'Unable to load all content for the catalog. Error loading ' + this.formatArray(errorMsg) : null;

    let results: any = this.convertToServiceItems(catalogItems.serviceClasses,
                                                  catalogItems.imageStreams,
                                                  catalogItems.templates);

    deferred.resolve([results, errorMsg]);
  }

  private formatArray(arr: string[]) {
    var outStr = "";
    if (arr.length === 1) {
      outStr = arr[0];
    } else if (arr.length === 2) {
      //joins all with "and" but no commas
      //example: "bob and sam"
      outStr = arr.join(' and ');
    } else if (arr.length > 2) {
      //joins all with commas, but last one gets ", and" (oxford comma!)
      //example: "bob, joe, and sam"
      outStr = arr.slice(0, -1).join(', ') + ', and ' + arr.slice(-1);
    }
    return outStr + '.';
  }
}

interface IServiceItem {
  iconClass: string;
  imageUrl: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  vendor: string;
  resource: any;
  // Necessary to track kind here since the real kind will not be in the
  // `resource` if requesting partial object metadata for templates
  kind: string;
}

export class ServiceItem implements IServiceItem {
  public iconClass: string;
  public imageUrl: string;
  public name: string;
  public description: string;
  public longDescription: string;
  public tags: string[];
  public vendor: string;
  public resource: any;
  public kind: string;
  private catalogSrv: CatalogService;

  constructor (serviceClass: any, catalogSrv: CatalogService) {
    this.resource = serviceClass;
    this.catalogSrv = catalogSrv;
    this.imageUrl = this.getImage();
    this.iconClass = this.getIcon();
    this.name = this.getName();
    this.description = this.getDescription();
    this.longDescription = this.getLongDescription();
    this.tags = this.getTags();
    this.kind = "ServiceClass";
    this.vendor = this.getVendor();
  }

  private getImage(): string {
    return _.get(this.resource, 'externalMetadata.imageUrl') as string || '';
  }

  private getIcon(): string {
    let icon: string = _.get(this.resource, ['externalMetadata', 'console.openshift.io/iconClass']) as string || 'fa fa-clone';
    icon = (icon.indexOf('icon-') !== -1) ? 'font-icon ' + icon : icon;
    return icon;
  }

  private getName(): string {
    return _.get(this.resource, 'externalMetadata.displayName') || this.resource.metadata.name;
  }

  private getDescription(): string {
    return _.get(this.resource, 'description') as string || '';
  }

  private getLongDescription(): string {
    return _.get(this.resource, 'externalMetadata.longDescription') as string || '';
  }

  private getTags(): string[] {
    return _.get(this.resource, 'tags') as string[] || [];
  }

  private getVendor(): string {
    var rawVendor = _.get(this.resource, 'externalMetadata.providerDisplayName') as string;
    return this.catalogSrv.getPublisherSynonym(rawVendor);
  }

}

export class ImageItem implements IServiceItem {
  public iconClass: string;
  public imageUrl: string;
  public name: string;
  public description: string;
  public longDescription: string;
  public tags: string[];
  public resource: any;
  public builderSpecTagName: any;
  public kind: string;
  public vendor: string;
  private catalogSrv: CatalogService;

  constructor (image: any, catalogSrv : CatalogService) {
    this.resource = image;
    this.catalogSrv = catalogSrv;
    this.builderSpecTagName = this.getBuilderSpecTagName();
    if (this.builderSpecTagName) {
      this.tags = this.getTags();
      this.iconClass = this.getIcon();
      this.name = this.getName();
      this.description = this.getDescription();
      this.longDescription = this.getLongDescription();
      this.kind = "ImageStream";
      this.vendor = this.getVendor();
    }
  }

  // A valid specTag has a 'builder' tag. no 'hidden' tag, and exists in 'status.tags'.
  private getBuilderSpecTagName() {
    let validSpecTag: any;

    if (!this.resource.status) {
      return null;
    }

    if (this.resource.spec && this.resource.spec.tags) {
      validSpecTag = _.find(this.resource.spec.tags, (specTag: any) => {
        let specTagTags: any = _.get(specTag, 'annotations.tags');
        if (specTagTags) {
          specTagTags = specTagTags.split(/\s*,\s*/);
          if (_.includes(specTagTags, 'builder') && !_.includes(specTagTags, 'hidden')) {
            return _.some(this.resource.status.tags, (statusTag: any) => {
              return statusTag.tag === specTag.name;
            });
          }
        }
      });
    }

    return validSpecTag ? validSpecTag.name : null;
  }

  private getTags() {
    return this.catalogSrv.$filter('imageStreamTagTags')(this.resource, this.builderSpecTagName);
  }

  private getIcon() {
    let icon = this.catalogSrv.$filter('imageStreamTagIconClass')(this.resource, this.builderSpecTagName);
    icon = (icon.indexOf('icon-') !== -1) ? 'font-icon ' + icon : icon;
    return icon;
  }

  private getName() {
    let name: string = this.catalogSrv.$filter('displayName')(this.resource);
    if (!name) {
      name = this.resource.metadata.name;
    }
    return name;
  }

  private getVendor(): string {
    return '';
  }

  private getDescription() {
    return null;
  }

  private getLongDescription() {
    return null;
  }
}

export class TemplateItem implements IServiceItem {
  public iconClass: string;
  public imageUrl: string;
  public name: string;
  public description: string;
  public longDescription: string;
  public tags: string[];
  public resource: any;
  public kind: string;
  public vendor: string;
  private catalogSrv: CatalogService;

  constructor (template: any, catalogSrv: CatalogService) {
    this.resource = template;
    this.catalogSrv = catalogSrv;
    this.imageUrl = this.getImage();
    this.iconClass = this.getIcon();
    this.name = this.getName();
    this.description = this.getDescription();
    this.longDescription = this.getLongDescription();
    this.tags = this.getTags();
    this.kind = "Template";
    this.vendor = this.getVendor();
  }

  private getImage() {
    return '';
  }

  private getIcon() {
    let icon = _.get(this.resource, 'metadata.annotations.iconClass', 'fa fa-clone');
    icon = (icon.indexOf('icon-') !== -1) ? 'font-icon ' + icon : icon;
    return icon;
  }

  private getName() {
    return this.catalogSrv.$filter('displayName')(this.resource);
  }

  private getDescription() {
    return _.get(this.resource, 'metadata.annotations.description', '');
  }

  private getLongDescription() {
    return _.get(this.resource, ['metadata', 'annotations', 'template.openshift.io/long-description'], '');
  }

  private getTags() {
    return _.get(this.resource, 'metadata.annotations.tags', '').split(/\s*,\s*/);
  }

  private getVendor(): string {
    var rawVendor = _.get(this.resource, ['metadata', 'annotations', 'template.openshift.io/provider-display-name']) as string || '';
    return this.catalogSrv.getPublisherSynonym(rawVendor);
  }
}
