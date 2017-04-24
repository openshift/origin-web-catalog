import * as angular from 'angular';
import 'angular-mocks';

import {TestHelpers} from '../test/utils/testHelpers';
import {ComponentTest} from '../test/utils/ComponentTest';
import {ServicesViewController} from '../src/components/services-view/services-view.controller';
import {servicesData} from '../app/mockServices/mockData/services';
import {imagesData} from '../app/mockServices/mockData/openshift-images';

describe('servicesView', () => {
  var services: any, images: any;
  var catalogItems: any;
  var componentTest: ComponentTest<ServicesViewController>;
  var testHelpers: TestHelpers = new TestHelpers();
  var Catalog: any;

  beforeEach( () => {
    testHelpers.initTests();

    angular.mock.module('webCatalog', 'openshiftCommonUI', 'mockServices');
  });

  beforeEach(() => {
    inject(function (_Catalog_: any) {
      Catalog = _Catalog_;
    });
  });

  beforeEach(() => {
    services = angular.copy(servicesData);
    images = angular.copy(imagesData);
    catalogItems = Catalog.convertToServiceItems(services, images);
  });

  beforeEach(() => {
    componentTest = new ComponentTest<ServicesViewController>(
        '<services-view catalog-items="catalogItems"></services-view>'
    );
    var attributes: any = {catalogItems: catalogItems};
    componentTest.createComponent(attributes);
  });

  // testing the isoScope $ctrl
  it('should have the correct $ctrl properties', () => {
    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.currentFilter).toBe('all');
    expect(ctrl.currentSubFilter).toBeNull();
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
});
