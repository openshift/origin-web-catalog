import * as angular from 'angular';

require('bootstrap');
require('angular-patternfly');
require('angular-ui-bootstrap');
require('ui-select');
require('angular-moment');
require('angular-schema-form');
require('angular-schema-form-bootstrap');

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
  .module(catalogApp, ['webCatalog', 'openshiftCommonUI', commonServices, 'ui.router', 'patternfly', 'angularMoment', 'schemaForm'])
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
