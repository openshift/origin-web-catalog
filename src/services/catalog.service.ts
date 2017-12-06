import * as angular from 'angular';
import * as _ from 'lodash';

export class CatalogService {
  static $inject = ['$filter', '$q', 'Constants', 'APIService', 'DataService', 'Logger'];

  public $filter: any;
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
    let serviceClassesVersion = this.apiService.getPreferredVersion('clusterserviceclasses');
    if (this.apiService.apiInfo(serviceClassesVersion)) {
      ++totalNumPromises;
      this.dataService.list(serviceClassesVersion, {}).then( (resources: any) => {
        catalogItems.serviceClasses = _.reject(resources.by("metadata.name"), {
          status: {
            removedFromBrokerCatalog: true
          }
        });
      }, () => {
        errorMsg.push('service classes');
      }).finally(() => {
        this.returnCatalogItems(deferred, catalogItems, ++numPromisesExecuted, totalNumPromises, errorMsg);
      });
    }

    ++totalNumPromises;
    let imageStreamsVersion = this.apiService.getPreferredVersion('imagestreams');
    this.dataService.list(imageStreamsVersion, {namespace: "openshift"}).then( (resources: any) => {
      catalogItems.imageStreams = resources.by("metadata.name");
    }, () => {
      errorMsg.push('builder images');
    }).finally(() => {
      this.returnCatalogItems(deferred, catalogItems, ++numPromisesExecuted, totalNumPromises, errorMsg);
    });

    if (includeTemplates) {
      ++totalNumPromises;
      let templateVersion = this.apiService.getPreferredVersion('templates');
      this.dataService.list(templateVersion, {namespace: "openshift"}, null, {partialObjectMetadataList: true}).then((resources: any) => {
        catalogItems.templates = resources.by("metadata.name");
      }, () => {
        errorMsg.push('templates');
      }).finally(() => {
        this.returnCatalogItems(deferred, catalogItems, ++numPromisesExecuted, totalNumPromises, errorMsg);
      });
    }

    return deferred.promise;
  }

  // Get service plans for a service class, takes either the serviceClass object or it's name
  public getServicePlansForServiceClass(serviceClass: any) : angular.IPromise < any > {
    let plansVersion = this.apiService.getPreferredVersion('clusterserviceplans');
    let serviceClassName = _.isString(serviceClass) ? serviceClass : _.get(serviceClass, 'metadata.name');

    // Only request service plans if the resource is available.
    if (serviceClassName && this.apiService.apiInfo(plansVersion)) {
      let opts = {
        http: {
          params: {
            fieldSelector: 'spec.clusterServiceClassRef.name=' + serviceClassName
          }
        }
      };
      return this.dataService.list(plansVersion, {}, _.noop, opts);
    }

    return this.$q.when(null);
  }

  public getServicePlans() : angular.IPromise < any > {
    // Only request service plans if the resource is available.
    let plansVersion = this.apiService.getPreferredVersion('clusterserviceplans');
    if (this.apiService.apiInfo(plansVersion)) {
      return this.dataService.list(plansVersion, {});
    }

    return this.$q.when(null);
  }

  public groupPlansByServiceClassName(plans: any) : any {
    return _.groupBy(plans, 'spec.clusterServiceClassRef.name');
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

  public sortCatalogItems(catalogItems: any) {
    // Perform a case-insensitive sort on display name, falling back to kind
    // and metadata.name for a stable sort when items have the same display name.
    return catalogItems.sort((item1: any, item2: any) => {
      let comparison = _.get(item1, 'name', '').localeCompare(_.get(item2, 'name', ''), undefined, {sensitivity: 'base'});

      if (comparison === 0) {
        comparison = _.get(item1, 'resource.kind', '').localeCompare(_.get(item2, 'resource.kind', ''), undefined, {sensitivity: 'base'});
      }

      if (comparison === 0) {
        comparison = _.get(item1, 'resource.metadata.name', '').localeCompare(_.get(item2, 'resource.metadata.name', ''), undefined, {sensitivity: 'base'});
      }

      return comparison;
    });

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

    // Remove hidden items such as non-builder images or items with a `hidden` tag.
    items = _.reject(items, 'hidden');

    // Sort the items
    items = this.sortCatalogItems(items);

    return items;
  }

  public getServiceItem(resource: any) {
    return new ServiceItem(resource, this);
  }

  public getImageItem(resource: any) {
    return new ImageItem(resource, this);
  }

  public getTemplateItem(resource: any) {
    return new TemplateItem(resource, this);
  }

  public getPublisherSynonym(rawVendor: string): string {
    return _.get(this.constants, ['PUBLISHER_SYNONYMS', rawVendor]) as string || rawVendor;
  }

  public getImageForIconClass(iconClass: string): string {
    return this.$filter('imageForIconClass')(iconClass) as string;
  }

  /**
   * Creates an items array under each sub-category and categorizes each
   * item accordingly.  Dynamically creates 'all' and 'other' main and sub-
   * categories as needed.
   */
  public categorizeItems(items: any) {
    let filteredSubCats: any;
    let itemCategorized: boolean;
    var categories = angular.copy(this.constants.SERVICE_CATALOG_CATEGORIES);
    this.createAllAndOtherMainCategories(categories);

    let allMainCategory: any = _.head(categories);
    let allSubCatOfAll: any = _.get(allMainCategory, 'subCategories[0]');
    let otherMainCategory: any = _.last(categories);
    let allSubCatOfOther: any = _.get(otherMainCategory, 'subCategories[0]');

    _.each(items, (item: any) => {
      itemCategorized = false;
      _.each(categories, (category: any) => {
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

    return categories;
  }

  public getVendors(items: any) {
    let vendors = {};

    _.each(items, (item: any) => {
      if (item.vendor) {
        vendors[item.vendor] = true;
      }
    });

    return _.keys(vendors).sort();
  }

  private categorizeItem(item: any, category: any, subCategory: any) {
    if (_.isString(subCategory)) {
      subCategory = this.getAllOrOtherSubCategory(category, subCategory);
    }

    subCategory.items = _.isArray(subCategory.items) ? subCategory.items.concat([item]) : [item];

    return category.hasItems = subCategory.hasItems = true;
  }

  private createAllAndOtherMainCategories(categories: any) {
    categories.unshift({
      id: 'all', label: 'All', subCategories: [
        {id: 'all', label: 'All'}
      ]
    });
    categories.push({
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
  hidden: boolean;
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
  public hidden: boolean;
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
    this.kind = "ClusterServiceClass";
    this.vendor = this.getVendor();
    this.hidden = _.includes(this.tags, 'hidden');
  }

  private getImage(): string {
    let image: string = _.get(this.resource, 'spec.externalMetadata.imageUrl') as string;
    if (image) {
      return image;
    }


    let iconClass: string = _.get(this.resource, ['spec', 'externalMetadata', 'console.openshift.io/iconClass']) as string;
    return this.catalogSrv.getImageForIconClass(iconClass);
  }

  private getIcon(): string {
    let icon: string = _.get(this.resource, ['spec', 'externalMetadata', 'console.openshift.io/iconClass']) as string || 'fa fa-clone';
    icon = (icon.indexOf('icon-') !== -1) ? 'font-icon ' + icon : icon;
    return icon;
  }

  private getName(): string {
    return _.get(this.resource, 'spec.externalMetadata.displayName') || _.get(this.resource, 'spec.externalName') || this.resource.metadata.name;
  }

  private getDescription(): string {
    return _.get(this.resource, 'spec.description') as string || '';
  }

  private getLongDescription(): string {
    return _.get(this.resource, 'spec.externalMetadata.longDescription') as string || '';
  }

  private getTags(): string[] {
    return _.get(this.resource, 'spec.tags') as string[] || [];
  }

  private getVendor(): string {
    var rawVendor = _.get(this.resource, 'spec.externalMetadata.providerDisplayName') as string;
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
  public hidden: boolean;
  private catalogSrv: CatalogService;

  constructor (image: any, catalogSrv : CatalogService) {
    this.resource = image;
    this.catalogSrv = catalogSrv;
    this.builderSpecTagName = this.getBuilderSpecTagName();
    if (this.builderSpecTagName) {
      this.tags = this.getTags();
      this.imageUrl = this.getImage();
      this.iconClass = this.getIcon();
      this.name = this.getName();
      this.description = this.getDescription();
      this.longDescription = this.getLongDescription();
      this.kind = "ImageStream";
      this.vendor = this.getVendor();
      this.hidden = false;
    } else {
      this.hidden = true;
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

  private getImage() {
    let iconClass = this.catalogSrv.$filter('imageStreamTagIconClass')(this.resource, this.builderSpecTagName);
    return this.catalogSrv.getImageForIconClass(iconClass);
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
    let provider = _.get(this.resource, ['metadata', 'annotations', 'openshift.io/provider-display-name'], '');
    return this.catalogSrv.getPublisherSynonym(provider);
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
  public hidden: boolean;
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
    this.hidden = _.includes(this.tags, 'hidden');
  }

  private getImage() {
    // Show images instead for some icon classes that we recognize.
    let iconClass = _.get(this.resource, 'metadata.annotations.iconClass') as string;
    return this.catalogSrv.getImageForIconClass(iconClass);
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
    return _.get(this.resource, ['metadata', 'annotations', 'openshift.io/long-description'], '');
  }

  private getTags() {
    return _.get(this.resource, 'metadata.annotations.tags', '').split(/\s*,\s*/);
  }

  private getVendor(): string {
    var rawVendor = _.get(this.resource, ['metadata', 'annotations', 'openshift.io/provider-display-name']) as string || '';
    return this.catalogSrv.getPublisherSynonym(rawVendor);
  }
}
