import {CatalogSearchController} from './catalog-search.controller';

export const catalogSearch: angular.IComponentOptions = {
  bindings: {
    baseProjectUrl: '@',
    catalogItems: '<',
    toggleAtMobile: '<?',
    searchToggleCallback: '<?'
  },
  controller: CatalogSearchController,
  template: require('./catalog-search.html')
};
