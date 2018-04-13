import * as angular from 'angular';
import 'angular-mocks';
import * as _ from 'lodash';
import * as jQuery from 'jquery';

import {TestHelpers} from '../test/utils/testHelpers';
import {ComponentTest} from '../test/utils/ComponentTest';
import {ServicesViewController} from '../src/components/services-view/services-view.controller';
import {servicesData} from '../app/mockServices/mockData/services';
import {imagesData} from '../app/mockServices/mockData/openshift-images';

require('bootstrap/dist/js/bootstrap');

describe('servicesView', () => {
  var services: any, images: any;
  var catalogItems: any;
  var componentTest: ComponentTest<ServicesViewController>;
  var testHelpers: TestHelpers = new TestHelpers();
  var Catalog: any;
  var Constants: any;
  var $location: any;

  beforeEach( () => {
    testHelpers.initTests();

    angular.mock.module('webCatalog', 'openshiftCommonUI', 'mockServices');
  });

  beforeEach(() => {
    inject(function (_Catalog_: any, _Constants_: any, _$location_: any) {
      Catalog = _Catalog_;
      Constants = _Constants_;
      $location = _$location_;
    });
  });

  beforeEach(() => {
    services = angular.copy(_.reject(servicesData, { status: { removedFromBrokerCatalog: true } }));
    images = angular.copy(imagesData);
    catalogItems = Catalog.convertToServiceItems(services, images);
  });

  var enterFilterKeyword = function(filterCtrl: any, keyword: string) {
    // set input's new value
    filterCtrl.val(keyword);

    // dispatch change event
    var event: any = document.createEvent("HTMLEvents");
    event.initEvent("change", false, true);
    filterCtrl[0].dispatchEvent(event);

    // press ENTER key
    componentTest.fireKeyPressEvent(filterCtrl[0], 13);
  };

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
    expect(ctrl.filteredItems.length).toBe(16);
  });

  it('should display the initial categories and correct number of catalog cards', () => {
    createServiceView();
    var element = componentTest.rawElement;

    // 4 main categories ('All', 'Languages', 'Databases', 'Other')
    // 'Middleware' should be hidden since mock data has no items with Middleware sub-categories
    expect(jQuery(element).find('.nav-tabs-pf .services-category-heading').length).toBe(5);

    // 'All' category should be selected and the current filter
    expect(jQuery(element).find('.nav-tabs-pf .active .services-category-heading').html()).toBe('All');

    // 16 cards/services
    expect(jQuery(element).find('.services-item-name').length).toBe(16);
  });

  it('should filter sub-categories and cards when main category is clicked', () => {
    createServiceView();
    var element = componentTest.rawElement;

    componentTest.eventFire(element.querySelector('#category-languages'), 'click');
    componentTest.eventFire(element.querySelector('#services-sub-category-all'), 'click');

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
        kind: 'ClusterServiceClass',
        "metadata": {
          "name": "mycat-database",
          "uid": "10",
        },
        spec: {
          tags: [
            "mycat",
            "database"
          ]
        }
      },
      "mycat-other": {
        kind: 'ClusterServiceClass',
        "metadata": {
          "name": "mycat-other",
          "uid": "11",
        },
        spec: {
          tags: [
            "mycat",
            "foobar"
          ]
        }
      }
    };

    images = {};

    catalogItems = Catalog.convertToServiceItems(services, images);

    createServiceView();
    var element = componentTest.rawElement;

    // 2 main categories ('All', 'My Category')
    expect(jQuery(element).find('.nav-tabs-pf .services-category-heading').length).toBe(2);

    componentTest.eventFire(element.querySelector('#category-mycat'), 'click');
    componentTest.eventFire(element.querySelector('#services-sub-category-all'), 'click');

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
        kind: 'ClusterServiceClass',
        "metadata": {
          "name": "mycat-database",
          "uid": "10",
        },
        spec: {
          tags: [
            "mycata",
            "mycatb",
            "database"
          ]
        }
      }
    };

    images = {};

    catalogItems = Catalog.convertToServiceItems(services, images);

    createServiceView();
    var element = componentTest.rawElement;

    // 3 main categories ('All', 'My Category A', 'My Category B')
    expect(jQuery(element).find('.nav-tabs-pf .services-category-heading').length).toBe(3);

    // Click on 'My Category A'
    componentTest.eventFire(element.querySelector('#category-mycata'), 'click');

    // 1 'mycata' sub category ('Database')
    expect(jQuery(element).find('.services-sub-category-tab-name').length).toBe(1);

    // 1 'db' card
    var items: any = jQuery(element).find('.services-item-name');
    expect(items.length).toBe(1);
    expect(_.trim(jQuery(items[0]).text())).toBe('mycat-database');

    // Click on 'My Category B'
    componentTest.eventFire(element.querySelector('#category-mycatb'), 'click');

    // 1 'mycatb' sub category ('Database')
    expect(jQuery(element).find('.services-sub-category-tab-name').length).toBe(1);

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

  it("should apply keyword filters correctly", () => {
    createServiceView();

    var element = componentTest.rawElement;

    // 16 initial catalog items
    expect(jQuery(element).find('.services-item-name').length).toBe(16);

    //Get Filter Dropdown
    var filterDropdown = jQuery(element).find('span[uib-dropdown]');
    expect(filterDropdown.length).toBe(1, 'filterDropdown');

    //Open Filter Panel
    filterDropdown.find('button').click();
    var keyWordInput = filterDropdown.find('.keyword-filter');
    expect(keyWordInput.length).toBe(1, 'keyword filter');

    enterFilterKeyword(keyWordInput, "test");

    // 10 catalog items with 'test' keyword
    expect(jQuery(element).find('.services-item-name').length).toBe(10);

    // 1 active filter tag
    let keywordFilterTags: any = jQuery(element).find('.pf-filter-category-label.label.label-info');
    expect(keywordFilterTags.length).toBe(1, 'active keyword tag');
    expect(keywordFilterTags.text().trim()).toBe('Keyword:test');

    // apply second keyword filter
    enterFilterKeyword(keyWordInput, "node");
    componentTest.scope.$digest();

    // 2 catalog items with 'test' and 'node' keywords
    expect(jQuery(element).find('.services-item-name').length).toBe(2, "catalog items with 'test' and 'node' keywords");

    // 2 active filter tags
    keywordFilterTags = jQuery(element).find('.pf-filter-category-label.label.label-info');
    expect(keywordFilterTags.length).toBe(2, 'There should be 2 active filter tags');
    expect(keywordFilterTags.eq(1).text().trim()).toBe('Keyword:node');

    // clear second keyword filter
    componentTest.eventFire(keywordFilterTags.eq(1).find('.pficon-close')[0], 'click');

    // back to 10 catalog items with 'test' keyword
    expect(jQuery(element).find('.services-item-name').length).toBe(10);

    // remove all filters
    componentTest.eventFire(jQuery(element).find('a:contains("Clear All Filters")')[0], 'click');

    // back to the original 16 catalog items
    expect(jQuery(element).find('.services-item-name').length).toBe(16);

    // no keyword filter tags
    expect(jQuery(element).find('.pf-filter-category-label.label.label-info').length).toBe(0);
  });

  it("should remove filters when switching categories", () => {
    createServiceView();

    var element = componentTest.rawElement;

    //Get Filter Dropdown
    var filterDropdown = jQuery(element).find('span[uib-dropdown]');
    expect(filterDropdown.length).toBe(1);

    //Open Filter Panel
    filterDropdown.find('button').click();
    var keyWordInput = filterDropdown.find('.keyword-filter');
    expect(keyWordInput.length).toBe(1);

    enterFilterKeyword(keyWordInput, "test");
    componentTest.scope.$digest();

    // 10 catalog items with 'test' keyword
    expect(jQuery(element).find('.services-item-name').length).toBe(10);

    // 1 active filter tag
    let keywordFilterTags: any = jQuery(element).find('.pf-filter-category-label.label.label-info');
    expect(keywordFilterTags.length).toBe(1);
    expect(keywordFilterTags.text().trim()).toBe('Keyword:test');

    // swtich category
    componentTest.eventFire(element.querySelector('#category-languages'), 'click');
    componentTest.eventFire(element.querySelector('#services-sub-category-all'), 'click');

    // should be no filter tags
    expect(jQuery(element).find('.pf-filter-category-label.label.label-info').length).toBe(0);

    // should be 11 'languages' catalog items
    expect(jQuery(element).find('.services-item-name').length).toBe(11);

    //Get Filter Dropdown
    filterDropdown = jQuery(element).find('span[uib-dropdown]');
    expect(filterDropdown.length).toBe(1);

    //Open Filter Panel
    filterDropdown.find('button').click();
    keyWordInput = filterDropdown.find('.keyword-filter');
    expect(keyWordInput.length).toBe(1);

    enterFilterKeyword(keyWordInput, "test");
    componentTest.scope.$digest();

    // should be 5 languages catalog items with keyword 'test', and 1 keyword filter tag
    expect(jQuery(element).find('.services-item-name').length).toBe(5, "should be 5 languages catalog items with keyword 'test'");
    expect(jQuery(element).find('.pf-filter-category-label.label.label-info').length).toBe(1, "should be 1 keyword filter tag");

    // click on 'ruby' sub-category
    componentTest.eventFire(element.querySelector('#services-sub-category-ruby.services-sub-category-tab'), 'click');

    // should be no filter tags
    expect(jQuery(element).find('.pf-filter-category-label.label.label-info').length).toBe(0);
  });

  it("should show pfEmptyState component when no filter matches", () => {
    createServiceView();

    var element = componentTest.rawElement;

    //Get Filter Dropdown
    var filterDropdown = jQuery(element).find('span[uib-dropdown]');

    //Open Filter Panel
    filterDropdown.find('button').click();
    var keyWordInput = filterDropdown.find('.keyword-filter');
    expect(jQuery(element).find('pf-empty-state').length).toEqual(0);

    //pfEmptyState component with 'nomatches' keyword
    enterFilterKeyword(keyWordInput, "nomatches");
    expect(jQuery(element).find('pf-empty-state').length).toBe(1);
  });

  it("should clear filters when pfEmptyState link is clicked", () => {
    createServiceView();

    var element = componentTest.rawElement;

    //Get Filter Dropdown
    var filterDropdown = jQuery(element).find('span[uib-dropdown]');

    //Open Filter Panel
    filterDropdown.find('button').click();
    var keyWordInput = filterDropdown.find('.keyword-filter');
    expect(jQuery(element).find('pf-empty-state').length).toEqual(0);

    //pfEmptyState component with 'nomatches' keyword
    enterFilterKeyword(keyWordInput, "nomatches");
    expect(jQuery(element).find('pf-empty-state').length).toBe(1);

    //Click clear filter link
    var filterLink = jQuery(element).find('pf-empty-state');
    filterLink.find('.blank-state-pf-helpbutton').click();
    componentTest.scope.$digest();
    expect(jQuery(element).find('.pf-filter-category-label.label.label-info').length).toBe(0);
  });

  it("should display publisher synonyms", () => {
    createServiceView();

    var element = componentTest.rawElement;

    var vendorFilters = jQuery(element).find('.category-option-label');
    expect(vendorFilters.length).toBe(4);
    expect(jQuery(vendorFilters[2]).text().trim()).toBe('Vendor B, Inc.');
  });

  it("should fall back to external name when no display name", () => {
    services = {
      "40c9e163-bffe-11e7-a324-f2cad19b6969": {
        kind: "ClusterServiceClass",
        metadata: {
          name: "40c9e163-bffe-11e7-a324-f2cad19b6969",
          uid: "724e409d-bfee-11e7-a324-f2cad19b6969"
        },
        spec: {
          externalName: 'my-service-class'
        }
      }
    };

    images = {};

    catalogItems = Catalog.convertToServiceItems(services, images);

    createServiceView();

    var element = componentTest.rawElement;

    var items = jQuery(element).find('.services-item-name');
    expect(items.length).toBe(1);
    expect(jQuery(items[0]).text().trim()).toBe('my-service-class');
  });

  it("should filter by category if search params present", () => {
    $location.search = () => ({category: 'cicd'});
    createServiceView();

    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.currentFilter).toBe('cicd');

    var element = componentTest.rawElement;

    expect(jQuery(element).find('.nav-tabs-pf .active .services-category-heading').html()).toBe('CI/CD');
  });

  it("should filter by category and subcategory if search params present", () => {
    $location.search = () => ({category: 'languages', subcategory: 'java'});
    createServiceView();

    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.currentFilter).toBe('languages');
    expect(ctrl.currentSubFilter).toBe('java');

    var element = componentTest.rawElement;

    expect(jQuery(element).find('.nav-tabs-pf .active .services-category-heading').html()).toBe('Languages');
    expect(jQuery(element).find('.services-sub-category.active .services-sub-category-tab-name').html()).toBe('Java');
  });
});