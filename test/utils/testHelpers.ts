require('patternfly/dist/js/patternfly');
require('angular-patternfly/dist/angular-patternfly');
require('angular-ui-bootstrap/ui-bootstrap');
require('angular-ui-bootstrap/ui-bootstrap-tpls');
require('ui-select/dist/select');
require('angular-sanitize/angular-sanitize');
require('angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js');
require('angular-animate/angular-animate.min.js');
require('angular-moment/angular-moment');

require('jquery/dist/jquery.min.js');
require('lodash/index.js');

require('imports-loader?define=>false!js-logger/src/logger');
require('urijs');
require('urijs/src/URITemplate.js');
require('angular-utf8-base64');
require('origin-web-common/dist/origin-web-common-ui.js');
require('angular-schema-form');
require('angular-schema-form-bootstrap');

import '../../src/index';

import {MockServicesModule} from '../../app/mockServices/mockServices.module';

export class TestHelpers {

  constructor() {
    beforeAll(() => {
      window.onbeforeunload = () => {
        return null;
      };
    });
  }

  public initTests(): void {
    new MockServicesModule(window);
  }
}
