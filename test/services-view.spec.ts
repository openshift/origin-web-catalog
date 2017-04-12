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

    // clear any 'recently viewed items' from local storage
    localStorage.removeItem('catalog-recently-viewed-services');
  });

  afterEach(() => {
    // clear any 'recently viewed items' from local storage
    localStorage.removeItem('catalog-recently-viewed-services');
  });

  // testing the isoScope $ctrl
  it('should have the correct $ctrl properties', () => {
    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.currentFilter).toBe('all');
    expect(ctrl.currentSubFilter).toBeNull();
    expect(ctrl.orderingPanelVisible).toBe(false);
  });

  it('should display the initial categories and correct number of catalog cards', () => {
    var element = componentTest.rawElement;
    // 4 main categories ('All', 'Languages', 'Databases', 'Other')
    // 'Middleware' should be hidden since mock data has no items with Middleware sub-categories
    expect(jQuery(element).find('.nav-tabs-pf a').length).toBe(5);

    // 'All' category should be selected and the current filter
    expect(jQuery(element).find('.nav-tabs-pf .active a').html()).toBe('All');

    // 15 cards/services
    expect(jQuery(element).find('.services-item-name').length).toBe(15);
  });

  it('should filter sub-categories and cards when main category is clicked', () => {
    var element = componentTest.rawElement;

    componentTest.eventFire(element.querySelector('#category-languages'), 'click');

    // 7 sub categories under category 'Languages' ('All', 'Java', 'Javascript',...'Python')
    expect(jQuery(element).find('.services-sub-category-tab-name').length).toBe(7);

    // 11 'language' cards/services
    expect(jQuery(element).find('.services-item-name').length).toBe(11);
  });

  it('should filter cards when sub-category is clicked', () => {
    var element = componentTest.rawElement;
    componentTest.eventFire(element.querySelector('#category-databases'), 'click');
    componentTest.eventFire(element.querySelector('#services-sub-category-mongodb .services-sub-category-tab'), 'click');
    // MongoDB image not shown because it isn't a builder image.
    expect(jQuery(element).find('.services-item-name').length).toBe(2);
  });

  it("should categorize 'Other' items", () => {
    var element = componentTest.rawElement;

    componentTest.eventFire(element.querySelector('#category-other'), 'click');

    // 1 'other' card
    expect(jQuery(element).find('.services-item-name').length).toBe(1);
  });

  it("should not display the 'All' sub-category when there is only one sub-category", () => {
    var element = componentTest.rawElement;

    componentTest.eventFire(element.querySelector('#category-cicd'), 'click');

    // 'CI/CD' should only have a 'Jenkins' sub-category and no 'All' sub-category
    let subCatCard: any = jQuery(element).find('.services-sub-category-tab-name');
    expect(subCatCard.length).toBe(1);
    expect(subCatCard.html()).toBe('Jenkins');

    // Expansion card should be shown with one card
    expect(jQuery(element).find('.services-item-name').length).toBe(1);
  });

  it("should set Recently Viewed items", () => {
    var element = componentTest.rawElement;

    let items = jQuery(element).find('.services-items-inner a');

    componentTest.eventFire(items[0], 'click');  // Node.js
    componentTest.eventFire(items[1], 'click');  // Perl
    componentTest.eventFire(items[2], 'click');  // PHP

    let recentlyViewed: any = getRecentlyViewed();

    // should list by most recently 'clicked'
    expect(recentlyViewed.length).toBe(3);
    expect(recentlyViewed[0].name).toBe('PHP');
    expect(recentlyViewed[1].name).toBe('Perl');
    expect(recentlyViewed[2].name).toBe('Node.js');

    // should limit to 3 recently viewed items
    componentTest.eventFire(items[3], 'click');  // Phython
    recentlyViewed = getRecentlyViewed();
    expect(recentlyViewed.length).toBe(3);
    expect(recentlyViewed[0].name).toBe('Python');

    // should move a previously viewed item to front of list
    componentTest.eventFire(items[1], 'click');  // Perl, was third in revently viewed list
    recentlyViewed = getRecentlyViewed();
    expect(recentlyViewed.length).toBe(3);
    expect(recentlyViewed[0].name).toBe('Perl');  // Should now be first
  });

  function getRecentlyViewed() {
    let recentlyViewed: any = localStorage.getItem('catalog-recently-viewed-services');
    recentlyViewed = recentlyViewed ? JSON.parse(recentlyViewed) : [];
    recentlyViewed = _.map(recentlyViewed, (item: any) => {
      return JSON.parse(item);
    });
    return recentlyViewed;
  }
});
