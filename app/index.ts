import * as angular from 'angular';

import '../src/index';

import {AppController} from './app.controller';

import './app.less';

export const catalogApp: string = 'catalogApp';

angular
  .module(catalogApp, ['webCatalog'])
    .controller('catalogAppCtrl', AppController);
