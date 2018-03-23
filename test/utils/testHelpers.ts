require('angular-patternfly');
require('angular-ui-bootstrap');
require('ui-select');
require('angular-moment');
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
