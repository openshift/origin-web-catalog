import {CatalogFilterController} from './catalog-filter.controller';

export const catalogFilter: angular.IComponentOptions = {
  bindings: {
    config: '<',
    vendors: '<',
    filterOnKeyword: '<',
    applyFilters: "&"
  },
  controller: CatalogFilterController,
  template: require('./catalog-filter.html'),
};
