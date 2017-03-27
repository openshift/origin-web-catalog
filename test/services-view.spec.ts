import * as angular from 'angular';
import 'angular-mocks';

import {TestHelpers} from '../test/utils/testHelpers';
import {ComponentTest} from '../test/utils/ComponentTest';
import {ServicesViewController} from '../src/components/services-view/services-view.controller';
import {servicesData} from '../app/mockServices/mockData/services';
import {imagesData} from '../app/mockServices/mockData/openshift-images';

describe('servicesView', () => {
  var services: any, images: any;
  var componentTest: ComponentTest<ServicesViewController>;
  var testHelpers: TestHelpers = new TestHelpers();

  beforeEach( () => {
    testHelpers.initTests();

    angular.mock.module('webCatalog', 'openshiftCommonUI', 'mockServices');
  });

  beforeEach(() => {
    services = angular.copy(servicesData);
    images = angular.copy(imagesData);
  });

  beforeEach(() => {
    componentTest = new ComponentTest<ServicesViewController>(
        '<services-view service-classes=\"services\" image-streams=\"images\"></services-view>'
    );
    var attributes: any = { services: services, images: images};
    componentTest.createComponent(attributes);
  });

  // testing the isoScope $ctrl
  it('should have the correct $ctrl properties', () => {
    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.currentFilter).toBe('all');
    expect(ctrl.currentSubFilter).toBeNull();
    expect(ctrl.expandSubCatRow).toBe(-1);
    expect(ctrl.orderingPanelvisible).toBe(false);
  });

  // testing rendered HTML
  it('should have the correct number of caegories, sub-categories, and service cards', () => {
    var element = componentTest.rawElement;
    // 4 main categories ('all', 'Languages', 'Databases', 'CI/CD', 'Other')
    // 'Middleware' should be hidden since mock data has no items with Middleware sub-categories
    expect(jQuery(element).find('.services-categories a').length).toBe(5);

    // 12 sub categories ('All', 'Java', 'Javascript',...'Jenkins')
    // 'Pipelines', 'Other', + the 4 Middleware sub-categories should be hidden since mock data doesn't have
    // items with these sub-categories.
    expect(jQuery(element).find('.sub-cat-label').length).toBe(12);

    // Show the service item cards (hidden by default)
    componentTest.eventFire(element.querySelector('#sub-category-all'), 'click');

    // 19 cards/services
    expect(jQuery(element).find('.card-name').length).toBe(19);
  });

  it('should filter sub-categories and cards when main category is clicked', () => {
    var element = componentTest.rawElement;

    componentTest.eventFire(element.querySelector('#category-languages'), 'click');

    // 7 sub categories under category 'Languages' ('All', 'Java', 'Javascript',...'Python')
    expect(jQuery(element).find('.sub-cat-label').length).toBe(7);

    // 11 'language' cards/services
    expect(jQuery(element).find('.card-name').length).toBe(11);
  });

  it('should filter cards when sub-category is clicked', () => {
    var element = componentTest.rawElement;
    componentTest.eventFire(element.querySelector('#sub-category-mongodb'), 'click');
    expect(jQuery(element).find('.card-name').length).toBe(3);
  });

  it('should show/hide cards when same sub-category is clicked twice', () => {
    var element = componentTest.rawElement;
    componentTest.eventFire(element.querySelector('#sub-category-mongodb'), 'click');
    expect(jQuery(element).find('.card-name').length).toBe(3);
    componentTest.eventFire(element.querySelector('#sub-category-mongodb'), 'click');
    expect(jQuery(element).find('.card-name').length).toBe(0);
  });

  it("should categorize 'Other' items", () => {
    var element = componentTest.rawElement;

    componentTest.eventFire(element.querySelector('#category-other'), 'click');

    // no sub categories should exist under 'Other'
    expect(jQuery(element).find('.sub-cat-label').length).toBe(0);

    // 1 'other' card
    expect(jQuery(element).find('.card-name').length).toBe(1);
  });

});
