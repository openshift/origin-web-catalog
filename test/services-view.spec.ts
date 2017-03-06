import '../src/index';
import * as angular from 'angular';
import 'angular-mocks';

import {ComponentTest} from '../test/utils/ComponentTest';
import {ServicesViewController} from '../src/components/services-view/services-view.controller';

import 'jquery';
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
        {id: 'perl', label: 'Perl', icon: 'font-icon icon-perl'},
        {id: 'ruby', label: 'Ruby', icon: 'font-icon icon-ruby'},
        {id: 'php', label: 'PHP', icon: 'font-icon icon-php'},
        {id: 'python', label: 'Python', icon: 'font-icon icon-python'}
      ]}
    ];

    services = [
      {id: 1, name:  'WildFly', icon: 'font-icon icon-wildfly', category: 'languages', subCategory: 'java'},
      {id: 2, name:  'Oracle Java', icon: 'font-icon icon-openjdk', category: 'languages', subCategory: 'java'},
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
    // two main categories ('all' + 'Languages')
    expect(componentTest.document.querySelectorAll('.services-categories a').length).toBe(2);
    // seven sub categories (6 + 'All Services')
    expect(componentTest.document.querySelectorAll('.sub-cat-label').length).toBe(7);
    // two cards/services
    expect(componentTest.document.querySelectorAll('.card-name').length).toBe(2);
  });

});
