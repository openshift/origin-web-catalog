import * as angular from 'angular';
import 'angular-mocks';
import * as jQuery from 'jquery';
import * as _ from 'lodash';

import {TestHelpers} from '../test/utils/testHelpers';
import {ComponentTest} from '../test/utils/ComponentTest';
import {SelectProjectController} from '../src/components/select-project/select-project.controller';
// import {DataServiceData} from '../app/mockServices/mockData.service';
// import {projectsData} from '../app/mockServices/mockData/projects';

import 'angular-patternfly';
import 'angular-animate';

describe('Select Project Component', () => {
  var testHelpers: TestHelpers = new TestHelpers();
  var componentTest: ComponentTest<SelectProjectController>;
  var selectedProject: any;
  var nameTaken: boolean;
  var $timeout: any;
  var $window: any;
  var $q: any;
  var ProjectsService: any;
  var DataService: any;
  var expectedCanCreate: boolean = true;

  beforeEach( () => {
    testHelpers.initTests();

    angular.mock.module('webCatalog', 'openshiftCommonUI', 'mockServices');
  });

  beforeEach(() => {
    inject(function (_$window_: any, _$timeout_: any, _$q_: any, _ProjectsService_: any, _DataService_: any) {
      $window = _$window_;
      $timeout = _$timeout_;
      $q = _$q_;
      ProjectsService = _ProjectsService_;
      DataService = _DataService_;
    });
  });

  var createSelectProjectDropdown = function() {
    selectedProject = null;
    nameTaken = false;
    var selectProjectHtml: string = '<select-project selected-project="selectedProject" name-taken="nameTaken"></select-project>';
    componentTest = new ComponentTest<SelectProjectController>(selectProjectHtml);

    var attributes: any = {
      selectedProject: selectedProject,
      nameTaken: nameTaken,
    };

    componentTest.createComponent(attributes);
  };

  beforeEach(() => {
    expectedCanCreate = true;
    spyOn(ProjectsService, 'canCreate').and.callFake(function() {
      let deferred = this.$q.defer();
      if (!expectedCanCreate) {
        deferred.reject({status: 403});
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    });
  });

  it('should have the correct project list', () => {
    createSelectProjectDropdown();

    var element = componentTest.rawElement;

    $timeout.flush();

    var projectSelect = jQuery(element).find('.ui-select-toggle');
    expect(projectSelect.length).toBe(1);

    componentTest.eventFire(projectSelect[0], 'click');

    var projects = jQuery(element).find('.ui-select-choices-row');
    // 'Create Project' + 3 projects
    expect(projects.length).toBe(4);

    // 'Create Project' should be first in the list
    expect(_.trim(jQuery(projects[0]).text())).toBe('Create Project');
  });

  it("should not show 'Create Project' when user cannot create projects", () => {
    expectedCanCreate = false;
    createSelectProjectDropdown();

    var element = componentTest.rawElement;

    $timeout.flush();

    var projectSelect = jQuery(element).find('.ui-select-toggle');
    expect(projectSelect.length).toBe(1);

    componentTest.eventFire(projectSelect[0], 'click');

    var projects = jQuery(element).find('.ui-select-choices-row');
    // 3 projects, no 'Create Project'
    expect(projects.length).toBe(3);

    // 'Create Project' should not be first in the list
    expect(_.trim(jQuery(projects[0]).text())).not.toBe('Create Project');
  });

  it("should show the new project fields when 'Create Project' selected", () => {
    createSelectProjectDropdown();

    var element = componentTest.rawElement;

    $timeout.flush();

    // 'Create Project' form fields initially hidden
    expect(jQuery(element).find('#name').length).toBe(0);
    expect(jQuery(element).find('#displayName').length).toBe(0);
    expect(jQuery(element).find('#description').length).toBe(0);

    var projectSelect = jQuery(element).find('.ui-select-toggle');
    expect(projectSelect.length).toBe(1);

    componentTest.eventFire(projectSelect[0], 'click');

    var projects = jQuery(element).find('.ui-select-choices-row');
    // 'Create Project' + 3 projects
    expect(projects.length).toBe(4);

    // 'Create Project' should be first in the list
    expect(_.trim(jQuery(projects[0]).text())).toBe('Create Project');

    componentTest.eventFire(projects[0], 'click');
    componentTest.scope.$digest();

    expect(jQuery(element).find('#name').length).toBe(1);
    expect(jQuery(element).find('#displayName').length).toBe(1);
    expect(jQuery(element).find('#description').length).toBe(1);
  });
});
