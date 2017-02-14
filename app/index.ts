import * as angular from 'angular';

import '../src/index';

import {AppController} from './app.controller';

import './app.less';

import {MockDataService} from '../src/services/mockData.service';

export const catalogApp: string = 'catalogApp';

angular
  .module(catalogApp, ['webCatalog'])
    .service('MockDataService', MockDataService)
    .controller('catalogAppCtrl', AppController);
