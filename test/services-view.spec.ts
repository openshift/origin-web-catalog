import 'jquery';
import * as angular from 'angular';
import 'angular-mocks';

import '../src/index';
import {ComponentTest} from '../test/utils/ComponentTest';
import {ServicesViewController} from '../src/components/services-view/services-view.controller';
import {MockDataService} from '../app/mockServices/mockData.service';

import 'angular-drag-and-drop-lists';
import 'angular-patternfly';
import 'angular-ui-bootstrap';
import 'angular-animate';

describe('servicesView', () => {
  var services: any, categories: any;
  var componentTest: ComponentTest<ServicesViewController>;

  beforeEach( () => {
    angular.mock.module('webCatalog');
  });

  beforeEach(() => {
    let mockData = new MockDataService();
    services = mockData.getServices();
    categories = mockData.getServiceCategories();
  });

  beforeEach(() => {
    componentTest = new ComponentTest<ServicesViewController>('<services-view services=\"services\" categories=\"categories\"></services-view>');
    var attributes: any = { services: services, categories: categories};
    componentTest.createComponent(attributes);
  });

  // testing the isoScope $ctrl
  it('should have the correct $ctrl properties', () => {
    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.currentFilter).toBe('all');
    expect(ctrl.expandSubCatRow).toBe(0);
    expect(ctrl.orderingPanelvisible).toBe(false);
  });

  // testing rendered HTML
  it('should show have the correct number of caegories, sub-categories, and service cards', () => {

    // can't get element.find() to work.  Must be using jQueryLite which doesn't take class selectors
    // expect(angular.element(componentTest.element).find('.services-categories a').length).toBe(3);

    var element = componentTest.rawElement;
    // two main categories ('all', 'Languages', 'Databases')
    expect(element.querySelectorAll('.services-categories a').length).toBe(5);
    // seven sub categories (3 Languages sub-cats, 3 Databases sub-cats, + 'All Services')
    expect(element.querySelectorAll('.sub-cat-label').length).toBe(17);
    // 4 cards/services
    expect(element.querySelectorAll('.card-name').length).toBe(20);
  });

  it('should filter sub-categories and cards when main category is clicked', () => {
    var element = componentTest.rawElement;
    element.querySelector('#category-languages').click();

    // 4 sub categories (3 Languages sub-cats + 'All Services')
    expect(element.querySelectorAll('.sub-cat-label').length).toBe(7);
    // 2 'language' cards/services
    expect(element.querySelectorAll('.card-name').length).toBe(12);
  });

  it('should filter cards when sub-category is clicked', () => {
    var element = componentTest.rawElement;
    element.querySelector('#sub-category-mongo').click();
    expect(element.querySelectorAll('.card-name').length).toBe(1);
  });

});
