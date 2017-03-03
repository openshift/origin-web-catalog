/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />


import * as angular from 'angular';
import {oauth} from './components/oauth/oauth.component';
import {homePage} from './pages/home/homePage';
import {servicesPage} from './pages/services/servicesPage';
import {projectsPage} from './pages/projects/projectsPage';
import {MockDataService} from './services/mockData.service';
import {navigation} from './components/navigation/navigation.component';
import {MockServicesModule} from './mockServices/mockServices.module';

import 'angular-ui-router';
import routesConfig from './routes';

import './app.less';
import '../src/index';

export const catalogApp: string = 'catalogApp';

require('./config.local.js');

require('patternfly/dist/js/patternfly');
require('angular-patternfly/dist/angular-patternfly');
require('angular-ui-bootstrap/ui-bootstrap');
require('angular-ui-bootstrap/ui-bootstrap-tpls');
require('angular-sanitize/angular-sanitize');
require('angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js');
require('angular-animate/angular-animate.min.js');

require('jquery/dist/jquery');
require('imports-loader?define=>false!js-logger/src/logger');

let hawtioPluginLoader = require('hawtio-core/dist/hawtio-core');

require('uri.js/src/URI');
require('angular-utf8-base64');

let commonServices = '';
let mockServicesModule = new MockServicesModule(window);

if (mockServicesModule.useMockServices() !== true) {
  require('origin-web-common/dist/origin-web-common.js');
  commonServices = 'openshiftCommon';
} else {
  commonServices = mockServicesModule.moduleName;
}
console.log('Common Services: "' + commonServices);

angular
  .module(catalogApp, ['webCatalog', commonServices, 'ui.router', 'patternfly'])
  .config(routesConfig)
  .service('MockDataService', MockDataService)
  .component('oauth', oauth)
  .component('homepage', homePage)
  .component('servicespage', servicesPage)
  .component('projectspage', projectsPage)
  .component('navigation', navigation);

hawtioPluginLoader.addModule(catalogApp);
