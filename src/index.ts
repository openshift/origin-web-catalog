import * as angular from 'angular';
import {servicesView} from './components/services-view/services-view.component';
import {MockDataService} from '../src/services/mockData.service';
import './styles/main.less';

export const webCatalog: string = 'webCatalog';

require('../node_modules/angular-patternfly/node_modules/patternfly/dist/js/patternfly');
require('../node_modules/angular-patternfly/dist/angular-patternfly');
require('../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/ui-bootstrap');
require('../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/ui-bootstrap-tpls');
require('../node_modules/angular-patternfly/node_modules/angular-sanitize/angular-sanitize');
require('../node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js');

angular
  .module(webCatalog, ['patternfly'])
    .service('MockDataService', MockDataService)
    .component('servicesView', servicesView);
