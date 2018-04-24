import * as angular from 'angular';
import './styles/main.less';

// Aphabetical order please
require('./constants');


// Filters
import {escapeRegExpFilter} from './filters/escapeRegExp';
import {projectUrlFilter} from './filters/projectUrl';
import {secretUrlFilter} from './filters/secretUrl';

// Components, Alphabetical order please
import {BuilderAppService} from './services/builder-app.service';
import {catalogParameters} from './components/catalog-parameters/catalog-parameters.component';
import {catalogSearch} from './components/catalog-search/catalog-search.component';
import {CatalogService} from './services/catalog.service';
import {createFromBuilder} from './components/create-from-builder/create-from-builder.component';
import {landingPage} from './components/landing-page/landing-page.component';
import {orderService} from './components/order-service/order-service.component';
import {overlayPanel} from './components/overlay-panel/overlay-panel.component';
import {projectsSummary} from './components/projects-summary/projects-summary.component';
import {saasList} from './components/saas-list/saas-list.component';
import {selectPlan} from './components/select-plan/select-plan.component';
import {selectProject} from './components/select-project/select-project.component';
import {servicesView} from './components/services-view/services-view.component';
import {updateService} from './components/update-service/update-service.component';
import {RecentlyViewedServiceItems} from './services/recently-viewed-service-items.service';
import {catalogFilter} from './components/catalog-filter/catalog-filter.component';

export const webCatalog: string = 'webCatalog';

angular
  .module(webCatalog, ['patternfly', 'ngAnimate', 'ui.bootstrap', 'angularMoment', 'ui.select', 'schemaForm', 'angularSchemaFormBase64FileUpload'])
  .service('BuilderAppService', BuilderAppService)
  .service('Catalog', CatalogService)
  .service('RecentlyViewedServiceItems', RecentlyViewedServiceItems)
  .filter('escapeRegExp', escapeRegExpFilter)
  .filter('projectUrl', projectUrlFilter)
  .filter('secretUrl', secretUrlFilter)
  .component('catalogParameters', catalogParameters)
  .component('catalogSearch', catalogSearch)
  .component('createFromBuilder', createFromBuilder)
  .component('landingPage', landingPage)
  .component('orderService', orderService)
  .component('overlayPanel', overlayPanel)
  .component('projectsSummary', projectsSummary)
  .component('saasList', saasList)
  .component('selectPlan', selectPlan)
  .component('selectProject', selectProject)
  .component('servicesView', servicesView)
  .component('updateService', updateService)
  .component('catalogFilter', catalogFilter)
  .run(['$templateCache', function($templateCache: any) {
    $templateCache.put('catalog-search/catalog-search-result.html', require('./components/catalog-search/catalog-search-result.html'));
    $templateCache.put('create-from-builder/create-from-builder-info.html', require('./components/create-from-builder/create-from-builder-info.html'));
    $templateCache.put('create-from-builder/create-from-builder-configure.html', require('./components/create-from-builder/create-from-builder-configure.html'));
    $templateCache.put('create-from-builder/create-from-builder-bind.html', require('./components/create-from-builder/create-from-builder-bind.html'));
    $templateCache.put('create-from-builder/create-from-builder-results.html', require('./components/create-from-builder/create-from-builder-results.html'));
    $templateCache.put('order-service/order-service-info.html', require('./components/order-service/order-service-info.html'));
    $templateCache.put('order-service/order-service-plans.html', require('./components/order-service/order-service-plans.html'));
    $templateCache.put('order-service/order-service-configure.html', require('./components/order-service/order-service-configure.html'));
    $templateCache.put('order-service/order-service-bind.html', require('./components/order-service/order-service-bind.html'));
    $templateCache.put('order-service/order-service-bind-parameters.html', require('./components/order-service/order-service-bind-parameters.html'));
    $templateCache.put('order-service/order-service-results.html', require('./components/order-service/order-service-results.html'));
    $templateCache.put('update-service/update-service-plans.html', require('./components/update-service/update-service-plans.html'));
    $templateCache.put('update-service/update-service-configure.html', require('./components/update-service/update-service-configure.html'));
    $templateCache.put('update-service/update-service-results.html', require('./components/update-service/update-service-results.html'));

    // Override the default angular-schema-form-bootstrap decorators for custom
    // styles to support horizontal forms (and eventually valueFrom parameters).
    // Adapted from files in node_modules/angular-schema-form-bootstrap/src
    // See https://github.com/json-schema-form/angular-schema-form-bootstrap/issues/22
    //
    $templateCache.put('decorators/bootstrap/array.html', require('./decorators/bootstrap/array.html'));
    $templateCache.put('decorators/bootstrap/checkbox.html', require('./decorators/bootstrap/checkbox.html'));
    $templateCache.put('decorators/bootstrap/checkboxes.html', require('./decorators/bootstrap/checkboxes.html'));
    $templateCache.put('decorators/bootstrap/default.html', require('./decorators/bootstrap/default.html'));
    $templateCache.put('decorators/bootstrap/select.html', require('./decorators/bootstrap/select.html'));
  }]);
