/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />

import * as angular from 'angular';

require('bootstrap/dist/js/bootstrap');
require('patternfly/dist/js/patternfly');
require('angular-patternfly/dist/angular-patternfly');
require('angular-ui-bootstrap/ui-bootstrap');
require('angular-ui-bootstrap/ui-bootstrap-tpls');
require('ui-select/dist/select');
require('angular-sanitize/angular-sanitize');
require('angular-moment/angular-moment');

require('angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js');
require('angular-animate/angular-animate.min.js');

require('jquery/dist/jquery.min.js');
require('lodash/index.js');

require('imports-loader?define=>false!js-logger/src/logger');
require('urijs');
require('urijs/src/URITemplate.js');
require('angular-utf8-base64');
require('hopscotch/dist/js/hopscotch.js');
require('angular-schema-form');
require('angular-schema-form-bootstrap');
require('angular-schema-form-base64-file-upload');

try {
  require('./config.local.js');
} catch (e) {
  require('./config.js');
}

import {oauth} from './components/oauth/oauth.component';
import {homePage} from './pages/home/homePage';
import {errorPage} from './pages/error/errorPage';
import {logoutPage} from './pages/logout/logoutPage';
import {navigation} from './components/navigation/navigation.component';
import {MockServicesModule} from './mockServices/mockServices.module';

import '@uirouter/angularjs';
import routesConfig from './routes';

import './app.less';
import '../src/index';

export const catalogApp: string = 'catalogApp';

let pluginLoader, commonServices = '';
let mockServicesModule = new MockServicesModule(window);

if (mockServicesModule.useMockServices() !== true) {
  pluginLoader = require('origin-web-common/dist/origin-web-common.js');
  commonServices = 'openshiftCommonServices';
} else {
  pluginLoader = require('origin-web-common/dist/origin-web-common-ui.js');
  commonServices = mockServicesModule.moduleName;
}

angular
  .module(catalogApp, ['webCatalog', 'openshiftCommonUI', commonServices, 'ui.router', 'patternfly', 'angularMoment', 'schemaForm', 'angularSchemaFormBase64FileUpload'])
  .config(routesConfig)
  .component('oauth', oauth)
  .component('homepage', homePage)
  .component('errorpage', errorPage)
  .component('logoutpage', logoutPage)
  .component('navigation', navigation)
  .constant('amTimeAgoConfig', {titleFormat: 'LLL'})
  .run(function(IS_IOS: boolean) {
    if (IS_IOS) {
      // Add a class for iOS devices. This lets us disable some hover effects
      // since iOS will treat the first tap as a hover if it changes the DOM
      // content (e.g. using :before pseudo-elements).
      $('body').addClass('ios');
    }
  });

pluginLoader.addModule(catalogApp);
