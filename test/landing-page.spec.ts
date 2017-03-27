import * as angular from 'angular';
import 'angular-mocks';
import * as jQuery from 'jquery';

import {TestHelpers} from '../test/utils/testHelpers';
import {ComponentTest} from '../test/utils/ComponentTest';
import {LandingPageController} from '../src/components/landing-page/landing-page.controller';

import 'angular-patternfly';
import 'angular-animate';

describe('landingPage', () => {
  var componentTest: ComponentTest<LandingPageController>;
  var $timeout: any;
  var $window: any;
  var testHelpers: TestHelpers = new TestHelpers();

  beforeEach( () => {
    testHelpers.initTests();

    angular.mock.module('webCatalog', 'openshiftCommonUI', 'mockServices');
  });

  beforeEach(() => {
    inject(function (_$window_: any, _$timeout_: any) {
      $window = _$window_;
      $timeout = _$timeout_;
    });
  });

  beforeEach(() => {
    var landingPageHtml: string = '' +
      '<landing-page search-placeholder="Test Placeholder">' +
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

  // testing the isoScope $ctrl
  it('should have the correct $ctrl properties', () => {
    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.searchPlaceholder).toBe('Test Placeholder');
  });

  // testing rendered HTML
  it('should include the correct transclusions', () => {
    var element = componentTest.rawElement;

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

  it('should hide the snap up button when not scrolled', () => {
    var element = componentTest.rawElement;

    var snapUp = jQuery(element).find('.snap-container.snap-up');
    expect(snapUp.length).toBe(1);

    snapUp = jQuery(element).find('.snap-container.snap-up.scrolled-down');
    expect(snapUp.length).toBe(0);
  });

  it('should show the snap up button when scrolled', () => {
    var element = componentTest.rawElement;
    var ctrl = componentTest.isoScope.$ctrl;

    $timeout.flush();

    var snapToElement: any = jQuery(element).find('.landing-body-area');
    expect(snapToElement.length).toBe(1);

    snapToElement.offsetTop = 800;
    $window.scrollBy(0, 900);

    // Create a fake scrolling event
    var scrollEvent: any = new CustomEvent('scroll');

    var snapUp = jQuery(element).find('.snap-container.snap-up.scrolled-down');
    expect(snapUp.length).toBe(0);

    ctrl.onScrollChange(scrollEvent);

    snapUp = jQuery(element).find('.snap-container.snap-up.scrolled-down');
    expect(snapUp.length).toBe(1);
  });
});
