import * as angular from 'angular';

import {frontPage} from './components/front-page/front-page.component';

import './styles/main.less';

export const webCatalog: string = 'webCatalog';

angular
  .module(webCatalog, [])
  .component('frontPage', frontPage);
