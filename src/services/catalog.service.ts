import * as angular from 'angular';
import * as _ from 'lodash';

export class CatalogService {
  static $inject = ['Constants', '$filter'];

  public $filter: any;
  private constants: any;
  private categories: any;

  constructor(constants: any, $filter: any) {
    this.constants = constants;
    this.$filter = $filter;
    this.categories = this.constants.SERVICE_CATALOG_CATEGORIES;
  }

  public getServiceItem(resource: any) {
    return new ServiceItem(resource, this);
  }

  public getImageItem(resource: any) {
    let imgStream = new ImageItem(resource, this);
    return (imgStream.isBuilder && !imgStream.isHidden) ? imgStream : null;
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
    return _.get(this.resource, ['osbMetadata', 'console.openshift.io/iconClass'], 'fa fa-cubes');
  }

  private getName() {
    return _.get(this.resource, 'osbMetadata.displayName', this.resource.metadata.name);
  }

  private getDescription() {
    return _.get(this.resource, 'osbMetadata.description', '');
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
  public isBuilder: boolean;
  public isHidden: boolean;
  private tags: any;
  private catalogSrv: CatalogService;

  constructor (image: any, catalogSrv : CatalogService) {
    this.resource = image;
    this.catalogSrv = catalogSrv;
    this.tags = this.catalogSrv.$filter('imageStreamTagTags')(this.resource);
    this.iconClass = this.getIcon();
    this.name = this.getName();
    this.description = this.getDescription();
    this.longDescription = this.getLongDescription();
    this.catsBySubCats = this.getCategoriesBySubCategories();
    this.isBuilder = _.includes(this.tags, 'builder');
    this.isHidden = _.includes(this.tags, 'hidden');
  }

  private getIcon() {
    let icon = this.catalogSrv.$filter('imageStreamTagIconClass')(this.resource, this.resource.spec.tags[0].name);
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


