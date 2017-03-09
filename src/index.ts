import * as angular from 'angular';
import './styles/main.less';

import {overlayPanel} from './components/overlay-panel/overlay-panel.component';
import {landingPage} from './components/landing-page/landing-page.component';
import {servicesView} from './components/services-view/services-view.component';
import {orderService} from './components/order-service/order-service.component';
import {rhAppsList} from './components/redhat-apps-list/rh-apps-list.component';
import './styles/main.less';

export const webCatalog: string = 'webCatalog';

angular
  .module(webCatalog, ['patternfly', 'ngAnimate', 'ui.bootstrap'])
  .component('overlayPanel', overlayPanel)
  .component('landingPage', landingPage)
  .component('servicesView', servicesView)
  .component('orderService', orderService)
  .component('rhAppsList', rhAppsList);
