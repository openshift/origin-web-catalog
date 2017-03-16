import * as angular from 'angular';
import 'angular-mocks';
import * as jQuery from 'jquery';

import '../src/index';
import {ComponentTest} from '../test/utils/ComponentTest';
import {OverlayPanelController} from '../src/components/overlay-panel/overlay-panel.controller';

import 'angular-patternfly';
import 'angular-animate';

describe('landingPage', () => {
  var componentTest: ComponentTest<OverlayPanelController>;
  var showPanel: boolean = false;
  var showClose: boolean = true;
  var closeCount: number = 0;

  var handleClose: any = function () {
    closeCount++;
  };

  beforeEach( () => {
    angular.mock.module('webCatalog');
  });

  beforeEach(() => {
    closeCount = 0;
    var overlayPanelHTML: string = '' +
      '<overlay-panel show-panel="showPanel" show-close="showClose" handle-close="handleClose">' +
      '  <div class="test-transcluded-area"></div>' +
      '</overlay-panel>' +
      '';
    componentTest = new ComponentTest<OverlayPanelController>(overlayPanelHTML);
    var attributes: any = {
      showPanel: showPanel,
      showClose: showClose,
      handleClose: handleClose
    };
    componentTest.createComponent(attributes);
  });

  // testing the isoScope $ctrl
  it('should have the correct $ctrl properties', () => {
    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.showPanel).toBe(showPanel);
    expect(ctrl.showClose).toBe(showClose);
    expect(ctrl.handleClose).toBe(handleClose);
  });

  it('should hide until shown', () => {
    var element = componentTest.rawElement;

    var bodyArea = jQuery(element).find('.catalogs-overlay-modal');
    expect(bodyArea.length).toBe(1);

    var content = jQuery(bodyArea).find('.catalogs-overlay-panel');
    expect(content.length).toBe(0);

    componentTest.scope.showPanel = true;
    componentTest.scope.$apply();

    content = jQuery(bodyArea).find('.catalogs-overlay-panel');
    expect(content.length).toBe(1);

  });

  it('should include the correct transclusions', () => {
    var element = componentTest.rawElement;

    componentTest.scope.showPanel = true;
    componentTest.scope.$apply();

    var bodyArea = jQuery(element).find('.catalogs-overlay-modal');
    expect(bodyArea.length).toBe(1);

    var trancludedContent = jQuery(bodyArea).find('.test-transcluded-area');
    expect(trancludedContent.length).toBe(1);
  });

  it('should show the close button based on showClose parameter', () => {
    var element = componentTest.rawElement;

    componentTest.scope.showPanel = true;
    componentTest.scope.$apply();

    var closeButton = jQuery(element).find('.catalogs-overlay-panel-close');
    expect(closeButton.length).toBe(1);

    componentTest.scope.showClose = false;
    componentTest.scope.$apply();

    closeButton = jQuery(element).find('.catalogs-overlay-panel-close');
    expect(closeButton.length).toBe(0);
  });

  it('should request close when close button is clicked', () => {
    var element = componentTest.rawElement;

    componentTest.scope.showPanel = true;
    componentTest.scope.$apply();

    var closeButton = jQuery(element).find('.catalogs-overlay-panel-close');
    expect(closeButton.length).toBe(1);

    expect(closeCount).toBe(0);
    componentTest.eventFire(closeButton[0], 'click');
    expect(closeCount).toBe(1);
  });
});
