import * as angular from 'angular';
import './styles/main.less';

// Aphabetical order please
require('./constants');

// Filters
import {projectUrlFilter} from './filters/projectUrl';

// Services
import {BuilderAppService} from './services/builder-app.service';
import {CatalogService} from './services/catalog.service';
import {GuidedTourService} from './services/guided-tour.service';

// Components, Alphabetical order please
import {catalogSearch} from './components/catalog-search/catalog-search.component';
import {createFromBuilder} from './components/create-from-builder/create-from-builder.component';
import {landingPage} from './components/landing-page/landing-page.component';
import {orderService} from './components/order-service/order-service.component';
import {overlayPanel} from './components/overlay-panel/overlay-panel.component';
import {projectsSummary} from './components/projects-summary/projects-summary.component';
import {saasList} from './components/saas-list/saas-list.component';
import {selectProject} from './components/select-project/select-project.component';
import {servicesView} from './components/services-view/services-view.component';

import './styles/main.less';

export const webCatalog: string = 'webCatalog';

angular
  .module(webCatalog, ['patternfly', 'ngAnimate', 'ui.bootstrap', 'angularMoment', 'ui.select'])
  .service('BuilderAppService', BuilderAppService)
  .service('Catalog', CatalogService)
  .service('GuidedTourService', GuidedTourService)
  .filter('projectUrl', projectUrlFilter)
  .component('catalogSearch', catalogSearch)
  .component('createFromBuilder', createFromBuilder)
  .component('landingPage', landingPage)
  .component('orderService', orderService)
  .component('overlayPanel', overlayPanel)
  .component('projectsSummary', projectsSummary)
  .component('saasList', saasList)
  .component('selectProject', selectProject)
  .component('servicesView', servicesView)
  .run(['$templateCache', function($templateCache: any) {
    $templateCache.put('catalog-search/catalog-search-result.html', require('./components/catalog-search/catalog-search-result.html'));
    $templateCache.put('create-from-builder/create-from-builder-configure.html', require('./components/create-from-builder/create-from-builder-configure.html'));
    $templateCache.put('create-from-builder/create-from-builder-results.html', require('./components/create-from-builder/create-from-builder-results.html'));
    $templateCache.put('order-service/order-service-plans.html', require('./components/order-service/order-service-plans.html'));
    $templateCache.put('order-service/order-service-configure.html', require('./components/order-service/order-service-configure.html'));
    $templateCache.put('order-service/order-service-review.html', require('./components/order-service/order-service-review.html'));
  }]);
