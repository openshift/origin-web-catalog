/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />


import * as angular from 'angular';
import {servicesPage} from './pages/services/servicesPage';
import {projectsPage} from './pages/projects/projectsPage';
import {MockDataService} from './services/mockData.service';
import {navigation} from './components/navigation.component';

import 'angular-ui-router';
import routesConfig from './routes';

import './app.less';
import '../src/index';

export const catalogApp: string = 'catalogApp';

require('patternfly/dist/js/patternfly');
require('angular-patternfly/dist/angular-patternfly');
require('angular-ui-bootstrap/ui-bootstrap');
require('angular-ui-bootstrap/ui-bootstrap-tpls');
require('angular-sanitize/angular-sanitize');
require('angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js');
require('angular-animate/angular-animate.min.js');

require('jquery/dist/jquery');
// require('js-logger/src/logger');
// require('../bower_components/hawtio-core/dist/hawtio-core');
// require('../bower_components/hawtio-extension-service/dist/hawtio-extension-service');
// require('../bower_components/term.js/src/term');

// require('origin-web-common/dist/origin-web-common');

angular
  .module(catalogApp, ['webCatalog', /* 'openshiftCommon', */ 'ui.router', 'patternfly'])
  .config(routesConfig)
  .service('MockDataService', MockDataService)
  .component('servicespage', servicesPage)
  .component('projectspage', projectsPage)
  .component('navigation', navigation);
