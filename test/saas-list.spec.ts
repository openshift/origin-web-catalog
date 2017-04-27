import * as angular from 'angular';
import * as $ from 'jquery';
import 'angular-mocks';

import {TestHelpers} from '../test/utils/testHelpers';
import {ComponentTest} from '../test/utils/ComponentTest';
import {SaasListController} from '../src/components/saas-list/saas-list.controller';

describe('saasOfferingsList', () => {
  var saasOfferings: any, saasTitle: string;
  var componentTest: ComponentTest<SaasListController>;
  var testHelpers: TestHelpers = new TestHelpers();
  var Constants: any;

  beforeEach( () => {
    testHelpers.initTests();

    angular.mock.module('webCatalog', 'openshiftCommonUI', 'mockServices');
  });

  beforeEach(() => {
    inject(function (_Constants_: any) {
      Constants = _Constants_;
    });
  });

  beforeEach(() => {
    saasOfferings = angular.copy(Constants.SAAS_OFFERINGS);
    saasTitle = 'What do you want to build?';
  });

  beforeEach(() => {
    componentTest = new ComponentTest<SaasListController>(
        '<saas-list saas-title="saasTitle" saas-offerings="saasOfferings"></saas-list>'
    );
  });

  it('should display SaaS Offerings correctly', () => {
    var attributes: any = { saasTitle: saasTitle, saasOfferings: saasOfferings};
    componentTest.createComponent(attributes);

    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.saasTitle).toBe('What do you want to build?');
    expect(ctrl.saasOfferings.length).toBe(4);

    var element = componentTest.rawElement;
    expect($(element).find('.card').length).toBe(4);
  });

  it('should hide SaaS Offerings when none are defined', () => {
    saasOfferings = {};
    var attributes: any = { saasTitle: saasTitle, saasOfferings: saasOfferings};
    componentTest.createComponent(attributes);

    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.hasSaasOfferings()).toBeFalsy();

    var element = componentTest.rawElement;
    expect($(element).find('.card').length).toBe(0);
  });
});
