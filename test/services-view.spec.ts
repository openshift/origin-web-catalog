import * as jQuery from 'jquery';
import * as angular from 'angular';
import 'angular-mocks';

import '../app/app';
import {ComponentTest} from '../test/utils/ComponentTest';
import {ServicesViewController} from '../src/components/services-view/services-view.controller';
import {servicesData} from '../app/mockServices/mockData/services';
import {imagesData} from '../app/mockServices/mockData/openshift-images';

import 'angular-drag-and-drop-lists';
import 'angular-patternfly';
import 'angular-ui-bootstrap';
import 'angular-animate';

describe('servicesView', () => {
  var services: any, images: any;
  var componentTest: ComponentTest<ServicesViewController>;

  beforeEach( () => {
    angular.mock.module('catalogApp');
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
    // 5 main categories ('all', 'Languages', 'Databases', 'Middleware', 'CI/CD')
    expect(jQuery(element).find('.services-categories a').length).toBe(5);
    // 17 sub categories ('All', 'Java', 'Javascript',...'Jenkins', 'Pipelines')
    expect(jQuery(element).find('.sub-cat-label').length).toBe(17);

    componentTest.eventFire(element.querySelector('#sub-category-all'), 'click');

    // 18 cards/services
    expect(jQuery(element).find('.card-name').length).toBe(18);
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

});
