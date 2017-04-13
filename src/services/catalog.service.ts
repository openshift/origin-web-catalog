import * as angular from 'angular';
import * as _ from 'lodash';

export class CatalogService {
  static $inject = ['$filter', '$q', 'Constants', 'DataService', 'Logger'];

  public $filter: any;

  private $q: any;
  private categories: any;
  private constants: any;
  private dataService: any;
  private logger: any;

  constructor($filter: any, $q: any, constants: any, DataService: any, Logger: any) {
    this.$filter = $filter;
    this.$q = $q;
    this.constants = constants;
    this.categories = this.constants.SERVICE_CATALOG_CATEGORIES;
    this.dataService = DataService;
    this.logger = Logger;
  }

  public getCatalogItems() {
    return this.$q.all({
      serviceClasses: this.dataService.list({
        group: 'servicecatalog.k8s.io',
        resource: 'serviceclasses'
      }, {}),
      imageStreams: this.dataService.list("imagestreams", {namespace: "openshift"})
    }).then((values) => {
      let serviceClasses: any = values.serviceClasses.by("metadata.name");
      let imageStreams: any = values.imageStreams.by("metadata.name");
      return this.convertToServiceItems(serviceClasses, imageStreams);
    }, () => {
      this.logger.log("Error Loading Catalog Items");
    });
  }

  public convertToServiceItems(serviceClasses: any, imageStreams: any) {
    // Convert service classes to ServiceItem
    let items: any = _.map(serviceClasses, (serviceClass) => {
      return this.getServiceItem(serviceClass);
    });

    // Convert builders to ImageItem.
    items = items.concat(_.map(imageStreams, (imageStream) => {
      return this.getImageItem(imageStream);
    }));

    // Remove null items (non-builder images).
    items = _.reject(items, (item) => {
      return !item;
    });

    // Perform a case-insensitive sort on display name, falling back to kind
    // and metadata.name for a stable sort when items have the same display name.
    return _.sortByAll(items, [(item: any) => item.name.toLowerCase(), 'resource.kind', 'resource.metadata.name']);
  }

  public getServiceItem(resource: any) {
    return new ServiceItem(resource, this);
  }

  public getImageItem(resource: any) {
    let imgStream = new ImageItem(resource, this);
    return imgStream.builderSpecTagName ? imgStream : null;
  }

  public getCategoriesBySubCategories(tags: any) {
    let catsBySubCats = {};
    let otherId = 'other';

    _.each(tags, (tag) => {
      _.each(this.categories, (category) => {
        let subCat: any = _.find(category.subCategories, (subCategory: any) => {
              return subCategory.id === tag || _.includes(subCategory.categoryAliases, tag);
            }
        );
        if (subCat) {
          catsBySubCats[subCat.id] = category.id;
          return false;
        }
      });  // .ea category
    });  // .ea tag
    if (_.isEmpty(catsBySubCats)) {
      catsBySubCats[otherId] = otherId;
    }
    return catsBySubCats;
  }

  public hasCategory(item: any, category: string) {
    return _.includes(item.catsBySubCats, category);
  }

  public hasSubCategory(item: any, subCategory: string) {
    return _.has(item, ['catsBySubCats', subCategory]);
  }

  /**
   * Return a new Array of only those Categories and SubCategories which
   * exist in the passed in items.
   * @param items
   * @returns {Array}
   */
  public removeEmptyCategories(items: IServiceItem) {
    let categories = angular.copy(this.categories);
    let retCategories = [];

    _.each(categories, (category) => {
      let retSubCategories: any = _.filter(category.subCategories, (subCategory: any) => {
        return _.some(items, (item: any) => {
          return this.hasSubCategory(item, subCategory.id);
        });
      });

      if (!_.isEmpty(retSubCategories)) {
        let retCategory = angular.copy(category);
        retCategory.subCategories = retSubCategories;
        retCategories.push(retCategory);
      }
    }); // ea. category

    return retCategories;
  }
}

interface IServiceItem {
  iconClass: string;
  imageUrl: string;
  name: string;
  catsBySubCats: any;
  description: string;
  longDescription: string;
  resource: any;
}

export class ServiceItem implements IServiceItem {
  public iconClass: string;
  public imageUrl: string;
  public name: string;
  public catsBySubCats: any;
  public description: string;
  public longDescription: string;
  public resource: any;
  private catalogSrv: CatalogService;

  constructor (serviceClass: any, catalogSrv: CatalogService) {
    this.resource = serviceClass;
    this.catalogSrv = catalogSrv;
    this.imageUrl = this.getImage();
    this.iconClass = this.getIcon();
    this.name = this.getName();
    this.description = this.getDescription();
    this.longDescription = this.getLongDescription();
    this.catsBySubCats = this.getCategoriesBySubCategories();
  }

  private getImage() {
    return _.get(this.resource, 'osbMetadata.imageUrl', '');
  }

  private getIcon() {
    let icon = _.get(this.resource, ['osbMetadata', 'console.openshift.io/iconClass'], 'fa fa-cubes');
    icon = (icon.indexOf('icon-') !== -1) ? 'font-icon ' + icon : icon;
    return icon;
  }

  private getName() {
    return _.get(this.resource, 'osbMetadata.displayName', this.resource.metadata.name);
  }

  private getDescription() {
    return _.get(this.resource, 'description', '');
  }

  private getLongDescription() {
    return _.get(this.resource, 'osbMetadata.longDescription', '');
  }

  private getCategoriesBySubCategories() {
    return this.catalogSrv.getCategoriesBySubCategories(this.resource.osbTags);
  }
}

export class ImageItem implements IServiceItem {
  public iconClass: string;
  public imageUrl: string;
  public name: string;
  public catsBySubCats: any;
  public description: string;
  public longDescription: string;
  public resource: any;
  public builderSpecTagName: any;
  private tags: any;
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
      this.catsBySubCats = this.getCategoriesBySubCategories();
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

  // TODO OpenShift Imagestreams desciptions/long descriptions vary depending
  // on the 'version' (spec.tags[].annotations). Implement during ordering panel

  private getDescription() {
    return null;
  }

  private getLongDescription() {
    return null;
  }

  private getCategoriesBySubCategories() {
    return this.catalogSrv.getCategoriesBySubCategories(this.tags);
  }
}


