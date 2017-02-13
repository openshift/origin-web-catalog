import * as angular from 'angular';

import '../src/index';

import './app.less';

export const catalogApp: string = 'catalogApp';

angular
  .module(catalogApp, ['webCatalog']);
