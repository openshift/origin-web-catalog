import * as angular from 'angular';
import './styles/main.less';

import {landingPage} from './components/landing-page/landing-page.component';
import {servicesView} from './components/services-view/services-view.component';
import {orderService} from './components/order-service/order-service.component';

export const webCatalog: string = 'webCatalog';

angular
  .module(webCatalog, ['patternfly', 'ngAnimate', 'ui.bootstrap'])
  .component('landingPage', landingPage)
  .component('servicesView', servicesView)
  .component('orderService', orderService);
