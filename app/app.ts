/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />


import * as angular from 'angular';
import {servicesPage} from './pages/servicesPage';
import {MockDataService} from './services/mockData.service';

import 'angular-ui-router';
import routesConfig from './routes';


import './app.less';
import '../src/index';

export const catalogApp: string = 'catalogApp';

require('../node_modules/angular-patternfly/node_modules/patternfly/dist/js/patternfly');
require('../node_modules/angular-patternfly/dist/angular-patternfly');
require('../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/ui-bootstrap');
require('../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/ui-bootstrap-tpls');
require('../node_modules/angular-patternfly/node_modules/angular-sanitize/angular-sanitize');
require('../node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js');

angular
    .module(catalogApp, ['webCatalog', 'ui.router'])
    .config(routesConfig)
    .service('MockDataService', MockDataService)
    .component('servicespage', servicesPage);
