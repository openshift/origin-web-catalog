import * as angular from 'angular';
import {frontPage} from './components/front-page/front-page.component';
import {servicesView} from './components/services-view/services-view.component';
import './styles/main.less';

export const webCatalog: string = 'webCatalog';

require('../node_modules/angular-patternfly/node_modules/patternfly/dist/js/patternfly');
require('../node_modules/angular-patternfly/dist/angular-patternfly');
require('../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/dist/ui-bootstrap');
require('../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls');
require('../node_modules/angular-patternfly/node_modules/angular-sanitize/angular-sanitize');

angular
  .module(webCatalog, ['patternfly'])
  .component('frontPage', frontPage)
  .component('servicesView', servicesView);
