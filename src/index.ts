import * as angular from 'angular';
import {servicesView} from './components/services-view/services-view.component';
import {orderService} from './components/order-service/order-service.component';
import './styles/main.less';

export const webCatalog: string = 'webCatalog';

angular
    .module(webCatalog, ['patternfly', 'ngAnimate', 'ui.bootstrap'])
    .component('servicesView', servicesView)
    .component('orderService', orderService);

