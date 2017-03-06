import 'jquery';
import * as angular from 'angular';
import 'angular-mocks';

import '../src/index';
import {ComponentTest} from '../test/utils/ComponentTest';
import {ServicesViewController} from '../src/components/services-view/services-view.controller';

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
    categories = [
      {id: 'languages', label: 'Languages', subCategories: [
        {id: 'java', label: 'Java', icon: 'font-icon icon-openjdk'},
        {id: 'javascript', label: 'Javascript', icon: 'font-icon icon-js'},
        {id: 'perl', label: 'Perl', icon: 'font-icon icon-perl'}
      ]},
      {id: 'databases', label: 'Databases', subCategories: [
        {id: 'mongo', label: 'Mongo', icon: 'font-icon icon-mongodb'},
        {id: 'mysql', label: 'mySQL', icon: 'font-icon icon-mysql-database'},
        {id: 'postgres', label: 'Postgres', icon: 'font-icon icon-postgresql'}
      ]},
    ];

    services = [
      {id: 1, name: 'WildFly', icon: 'font-icon icon-wildfly', category: 'languages', subCategory: 'java'},
      {id: 2, name: 'Oracle Java', icon: 'font-icon icon-openjdk', category: 'languages', subCategory: 'java'},
      {id: 3, name: 'Mongo  (Ephemeral)', icon: 'font-icon icon-mongodb', category: 'databases', subCategory: 'mongo'},
      {id: 4, name: 'mySQL  (Ephemeral)', icon: 'font-icon icon-mysql-database', category: 'databases', subCategory: 'mysql'},
    ];

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
    expect(element.querySelectorAll('.services-categories a').length).toBe(3);
    // seven sub categories (3 Languages sub-cats, 3 Databases sub-cats, + 'All Services')
    expect(element.querySelectorAll('.sub-cat-label').length).toBe(7);
    // 4 cards/services
    expect(element.querySelectorAll('.card-name').length).toBe(4);
  });

  it('should filter sub-categories and cards when main category is clicked', () => {
    var element = componentTest.rawElement;
    element.querySelector('#category-languages').click();

    // 4 sub categories (3 Languages sub-cats + 'All Services')
    expect(element.querySelectorAll('.sub-cat-label').length).toBe(4);
    // 2 'language' cards/services
    expect(element.querySelectorAll('.card-name').length).toBe(2);
  });

  it('should filter cards when sub-category is clicked', () => {
    var element = componentTest.rawElement;
    element.querySelector('#sub-category-mongo').click();
    expect(element.querySelectorAll('.card-name').length).toBe(1);
  });

});
