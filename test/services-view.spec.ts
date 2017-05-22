import * as angular from 'angular';
import 'angular-mocks';
import * as _ from 'lodash';

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
  var Constants: any;

  beforeEach( () => {
    testHelpers.initTests();

    angular.mock.module('webCatalog', 'openshiftCommonUI', 'mockServices');
  });

  beforeEach(() => {
    inject(function (_Catalog_: any, _Constants_: any) {
      Catalog = _Catalog_;
      Constants = _Constants_;
    });
  });

  beforeEach(() => {
    services = angular.copy(servicesData);
    images = angular.copy(imagesData);
    catalogItems = Catalog.convertToServiceItems(services, images);
  });

  var createServiceView = function() {
    componentTest = new ComponentTest<ServicesViewController>(
        '<services-view catalog-items="catalogItems"></services-view>'
    );
    var attributes: any = {catalogItems: catalogItems};
    componentTest.createComponent(attributes);
  };

  // testing the isoScope $ctrl
  it('should have the correct $ctrl properties', () => {
    createServiceView();
    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.currentFilter).toBe('all');
    expect(ctrl.currentSubFilter).toBe('all');
    expect(ctrl.filteredItems.length).toBe(15);
  });

  it('should display the initial categories and correct number of catalog cards', () => {
    createServiceView();
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
    createServiceView();
    var element = componentTest.rawElement;

    componentTest.eventFire(element.querySelector('#category-languages'), 'click');

    // 7 sub categories under category 'Languages' ('All', 'Java', 'Javascript',...'Python')
    expect(jQuery(element).find('.services-sub-category-tab-name').length).toBe(7);

    // 11 'language' cards/services
    expect(jQuery(element).find('.services-item-name').length).toBe(11);
  });

  it('should filter cards when sub-category is clicked', () => {
    createServiceView();
    var element = componentTest.rawElement;

    componentTest.eventFire(element.querySelector('#category-databases'), 'click');
    componentTest.eventFire(element.querySelector('#services-sub-category-mongodb.services-sub-category-tab'), 'click');
    // MongoDB image not shown because it isn't a builder image.
    expect(jQuery(element).find('.services-item-name').length).toBe(2);
  });

  it("should categorize items under main category 'Other'", () => {
    createServiceView();
    var element = componentTest.rawElement;

    componentTest.eventFire(element.querySelector('#category-other'), 'click');

    // 1 'other' card
    expect(jQuery(element).find('.services-item-name').length).toBe(1);
  });

  it("should categorize an item under multiple categories and sub-categories", () => {
    createServiceView();
    var element = componentTest.rawElement;

    // 'Test ServiceClass Ruby-Mongo' should be categorized under 'Languages->Ruby' and 'Databases->Mongo'

    componentTest.eventFire(element.querySelector('#category-languages'), 'click');
    componentTest.eventFire(element.querySelector('#services-sub-category-ruby.services-sub-category-tab'), 'click');

    let items: any = jQuery(element).find('.services-item-name');
    expect(items.length).toBe(2);
    expect(_.trim(jQuery(items[1]).text())).toBe('Test ServiceClass Ruby-Mongo');

    componentTest.eventFire(element.querySelector('#category-databases'), 'click');
    componentTest.eventFire(element.querySelector('#services-sub-category-mongodb.services-sub-category-tab'), 'click');

    items = jQuery(element).find('.services-item-name');
    expect(items.length).toBe(2);
    expect(_.trim(jQuery(items[1]).text())).toBe('Test ServiceClass Ruby-Mongo');
  });

  it("should categorize items correctly when main category has 'tags'", () => {
    // Add category with 'tags'
    Constants.SERVICE_CATALOG_CATEGORIES.push(
      {id: 'mycat', label: 'My Category', tags: ['mycat'], subCategories: [
        {id: 'database', label: 'Database', tags: ['database']}
      ]}
    );

    services = {
      "mycat-database": {
        kind: 'ServiceClass',
        "metadata": {
          "name": "mycat-database",
          "uid": "10",
        },
        osbTags: [
          "mycat",
          "database"
        ]
      },
      "mycat-other": {
        kind: 'ServiceClass',
        "metadata": {
          "name": "mycat-other",
          "uid": "11",
        },
        osbTags: [
          "mycat",
          "foobar"
        ]
      }
    };

    images = {};

    catalogItems = Catalog.convertToServiceItems(services, images);

    createServiceView();
    var element = componentTest.rawElement;

    // 2 main categories ('All', 'My Category')
    expect(jQuery(element).find('.nav-tabs-pf a').length).toBe(2);

    componentTest.eventFire(element.querySelector('#category-mycat'), 'click');

    // 3 'mycat' sub categories ('All', 'Database', 'Other')
    expect(jQuery(element).find('.services-sub-category-tab-name').length).toBe(3);

    // 2 'mycat' cards/services
    expect(jQuery(element).find('.services-item-name').length).toBe(2);

    componentTest.eventFire(element.querySelector('#services-sub-category-other'), 'click');

    // 1 'other' card
    expect(jQuery(element).find('.services-item-name').length).toBe(1);
  });

  it("should categorize an item under multiple categories and sub-categories when main category has 'tags'", () => {
    // Add category with 'tags'
    Constants.SERVICE_CATALOG_CATEGORIES.push(
      {id: 'mycata', label: 'My Category A', tags: ['mycata'], subCategories: [
        {id: 'database', label: 'Database', tags: ['database']}
      ]},
      {id: 'mycatb', label: 'My Category B', tags: ['mycatb'], subCategories: [
        {id: 'database', label: 'Database', tags: ['database']}
      ]}
    );

    services = {
      "mycat-database": {
        kind: 'ServiceClass',
        "metadata": {
          "name": "mycat-database",
          "uid": "10",
        },
        osbTags: [
          "mycata",
          "mycatb",
          "database"
        ]
      }
    };

    images = {};

    catalogItems = Catalog.convertToServiceItems(services, images);

    createServiceView();
    var element = componentTest.rawElement;

    // 3 main categories ('All', 'My Category A', 'My Category B')
    expect(jQuery(element).find('.nav-tabs-pf a').length).toBe(3);

    // Click on 'My Category A'
    componentTest.eventFire(element.querySelector('#category-mycata'), 'click');

    // 1 'mycata' sub category ('Database')
    expect(jQuery(element).find('.services-sub-category-tab-name').length).toBe(1);

    componentTest.eventFire(element.querySelector('#services-sub-category-database'), 'click');

    // 1 'db' card
    var items: any = jQuery(element).find('.services-item-name');
    expect(items.length).toBe(1);
    expect(_.trim(jQuery(items[0]).text())).toBe('mycat-database');

    // Click on 'My Category B'
    componentTest.eventFire(element.querySelector('#category-mycatb'), 'click');

    // 1 'mycatb' sub category ('Database')
    expect(jQuery(element).find('.services-sub-category-tab-name').length).toBe(1);

    componentTest.eventFire(element.querySelector('#services-sub-category-database'), 'click');

    // 1 'db' card
    items = jQuery(element).find('.services-item-name');
    expect(items.length).toBe(1);
    expect(_.trim(jQuery(items[0]).text())).toBe('mycat-database');
  });

  it("should not display the 'All' sub-category when there is only one sub-category", () => {
    createServiceView();
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
