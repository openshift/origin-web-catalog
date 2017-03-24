import {CatalogSearchController} from './catalog-search.controller';

export const catalogSearch: angular.IComponentOptions = {
  bindings: {
    imageStreams: '<',
    serviceClasses: '<'
  },
  controller: CatalogSearchController,
  template: require('./catalog-search.html')
};
