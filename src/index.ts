import * as angular from 'angular';
import {servicesView} from './components/services-view/services-view.component';
import './styles/main.less';

export const webCatalog: string = 'webCatalog';

angular
  .module(webCatalog, ['patternfly'])
    .component('servicesView', servicesView);
