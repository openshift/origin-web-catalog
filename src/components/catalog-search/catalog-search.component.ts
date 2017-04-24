import {CatalogSearchController} from './catalog-search.controller';

export const catalogSearch: angular.IComponentOptions = {
  bindings: {
    baseProjectUrl: '@',
    catalogItems: '<'
  },
  controller: CatalogSearchController,
  template: require('./catalog-search.html')
};
