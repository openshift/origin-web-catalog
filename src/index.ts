import * as angular from 'angular';
import './styles/main.less';

// Aphabetical order please
require('./constants');


// Filters
import {projectUrlFilter} from './filters/projectUrl';

// Components, Alphabetical order please
import {landingPage} from './components/landing-page/landing-page.component';
import {orderService} from './components/order-service/order-service.component';
import {overlayPanel} from './components/overlay-panel/overlay-panel.component';
import {projectsSummary} from './components/projects-summary/projects-summary.component';
import {saasList} from './components/saas-list/saas-list.component';
import {servicesView} from './components/services-view/services-view.component';
import {CatalogService} from './services/catalog.service';

import './styles/main.less';

export const webCatalog: string = 'webCatalog';

angular
  .module(webCatalog, ['patternfly', 'ngAnimate', 'ui.bootstrap', 'angularMoment'])
  .service('Catalog', CatalogService)
  .filter('projectUrl', projectUrlFilter)
  .component('landingPage', landingPage)
  .component('orderService', orderService)
  .component('overlayPanel', overlayPanel)
  .component('projectsSummary', projectsSummary)
  .component('saasList', saasList)
  .component('servicesView', servicesView)
  .run(['$templateCache', function($templateCache: any) {
    $templateCache.put('order-service/order-service-details.html', require('./components/order-service/order-service-details.html'));
    $templateCache.put('order-service/order-service-details.html', require('./components/order-service/order-service-details.html'));
    $templateCache.put('order-service/order-service-plans.html', require('./components/order-service/order-service-plans.html'));
    $templateCache.put('order-service/order-service-configure.html', require('./components/order-service/order-service-configure.html'));
    $templateCache.put('order-service/order-service-review.html', require('./components/order-service/order-service-review.html'));
  }]);
