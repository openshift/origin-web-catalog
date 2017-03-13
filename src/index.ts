import * as angular from 'angular';
import './styles/main.less';

// Aphabetical order please
require('./constants');
import {landingPage} from './components/landing-page/landing-page.component';
import {orderService} from './components/order-service/order-service.component';
import {overlayPanel} from './components/overlay-panel/overlay-panel.component';
import {projectsSummary} from './components/projects-summary/projects-summary.component';
import {rhAppsList} from './components/redhat-apps-list/rh-apps-list.component';
import {servicesView} from './components/services-view/services-view.component';

import './styles/main.less';

export const webCatalog: string = 'webCatalog';

angular
  .module(webCatalog, ['patternfly', 'ngAnimate', 'ui.bootstrap'])
  .component('landingPage', landingPage)
  .component('orderService', orderService)
  .component('overlayPanel', overlayPanel)
  .component('projectsSummary', projectsSummary)
  .component('rhAppsList', rhAppsList)
  .component('servicesView', servicesView);
