import * as angular from 'angular';
import 'angular-mocks';
import * as jQuery from 'jquery';

import {TestHelpers} from '../test/utils/testHelpers';
import {ComponentTest} from '../test/utils/ComponentTest';
import {LandingPageController} from '../src/components/landing-page/landing-page.controller';

import 'angular-patternfly';

describe('landingPage', () => {
  var componentTest: ComponentTest<LandingPageController>;
  var testHelpers: TestHelpers = new TestHelpers();

  beforeEach( () => {
    testHelpers.initTests();

    angular.mock.module('webCatalog', 'openshiftCommonUI', 'mockServices');
  });

  beforeEach(() => {
    var landingPageHtml: string = '' +
      '<landing-page>' +
      '  <landingsearch>' +
      '    <div id="testSearch">' +
      '      <h1>I am the search</h1>' +
      '    </div>' +
      '  </landingsearch>' +
      '  <landingheader>' +
      '    <div id="testHeader" style="height: 800px;">' +
      '      <h1>I am the header</h1>' +
      '   </div>' +
      '  </landingheader>' +
      '  <landingbody>' +
      '    <div id="testBody" style="height: 300px;">' +
      '      <h1>I am the body</h1>' +
      '    </div>' +
      '  </landingbody>' +
      '  <landingside>' +
      '    <div id="testSide">' +
      '      <h1>I am the body</h1>' +
      '    </div>' +
      '  </landingside>' +
      '</landing-page>' +
      '';
    componentTest = new ComponentTest<LandingPageController>(landingPageHtml);
    componentTest.createComponent({});
  });

  // testing rendered HTML
  it('should include the correct transclusions', () => {
    var element = componentTest.rawElement;

    var searchArea = jQuery(element).find('.landing-search-area');
    expect(searchArea.length).toBe(1);

    var testSearchArea = jQuery(searchArea).find('#testSearch');
    expect(testSearchArea.length).toBe(1);

    var headerArea = jQuery(element).find('.landing-header-area');
    expect(headerArea.length).toBe(1);

    var testHeaderArea = jQuery(headerArea).find('#testHeader');
    expect(testHeaderArea.length).toBe(1);

    var bodyArea = jQuery(element).find('.landing-body-area');
    expect(bodyArea.length).toBe(1);

    var testBodyArea = jQuery(bodyArea).find('#testBody');
    expect(testBodyArea.length).toBe(1);

    var sideArea = jQuery(element).find('.landing-side-bar');
    expect(sideArea.length).toBe(1);

    var testSideArea = jQuery(sideArea).find('#testSide');
    expect(testSideArea.length).toBe(1);
  });
});
