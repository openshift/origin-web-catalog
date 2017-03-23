import * as angular from 'angular';
import 'angular-mocks';
import * as jQuery from 'jquery';
import * as _ from 'lodash';

import {TestHelpers} from '../test/utils/testHelpers';
import {ComponentTest} from '../test/utils/ComponentTest';
import {ProjectsSummaryController} from '../src/components/projects-summary/projects-summary.controller';
import {DataServiceData} from '../app/mockServices/mockData.service';
import {projectsData} from '../app/mockServices/mockData/projects';

import 'angular-patternfly';
import 'angular-animate';

describe('Projects Summary Panel', () => {
  var testHelpers: TestHelpers = new TestHelpers();
  var componentTest: ComponentTest<ProjectsSummaryController>;
  var $timeout: any;
  var $window: any;
  var $q: any;
  var ProjectsService: any;
  var DataService: any;
  var selectedProject: any;
  var selectCallCount: number = 0;
  var showProjectsCallCount: number = 0;
  var expectedCanCreate: boolean = true;

  var testProjectSelect = function(project: any) {
    selectedProject = project;
    selectCallCount++;
  };

  var testShowProjects = function(project: any) {
    showProjectsCallCount++;
  };

  var createProjectSummary = function() {
    var projectsSummaryHtml: string = '<projects-summary project-select="testProjectSelect" show-projects="testShowProjects"></projects-summary>';

    componentTest = new ComponentTest<ProjectsSummaryController>(projectsSummaryHtml);

    var attributes: any = {
      testProjectSelect: testProjectSelect,
      testShowProjects: testShowProjects,
    };

    componentTest.createComponent(attributes);
  };

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

  beforeEach(() => {
    spyOn(ProjectsService, 'canCreate').and.callFake(function() {
      let deferred = this.$q.defer();
      deferred.resolve(expectedCanCreate);
      return deferred.promise;
    });
  });

  // testing the isoScope $ctrl
  it('should have the correct $ctrl properties', () => {
    createProjectSummary();

    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.projectSelect()).toBe(testProjectSelect);
    expect(ctrl.showProjects()).toBe(testShowProjects);
  });

  it('should show the create button when allowed', () => {
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var createButton = jQuery(element).find('.create-button');
    expect(createButton.length).toBe(1);
  });

  it('should hide the create button when not allowed', () => {
    expectedCanCreate = false;
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var createButton = jQuery(element).find('.create-button');
    expect(createButton.length).toBe(1);
  });

  it('should show the existing projects in the projects list', () => {
    createProjectSummary();

    var ctrl = componentTest.isoScope.$ctrl;
    var element = componentTest.rawElement;

    $timeout.flush();

    expect(ctrl.loading).toBe(false);
    expect(ctrl.showGetStarted).toBe(false);

    expect(ctrl.projects.length).toBe(1);

    var projectTiles = jQuery(element).find('.project-tile');
    expect(projectTiles.length).toBe(1);
  });

  it('should show getting started when no existing projects', () => {
    spyOn(DataService, 'list').and.callFake(function(resource: any, context: any, callback: any, opts: any) {
      let deferred = this.$q.defer();
      var emptyData: DataServiceData = new DataServiceData([]);

      callback(emptyData);

      deferred.resolve(emptyData);
      return deferred.promise;
    });

    createProjectSummary();

    var ctrl = componentTest.isoScope.$ctrl;
    var element = componentTest.rawElement;

    $timeout.flush();

    expect(ctrl.loading).toBe(false);
    expect(ctrl.showGetStarted).toBe(true);

    expect(ctrl.projects.length).toBe(0);

    var projectTiles = jQuery(element).find('.project-tile');
    expect(projectTiles.length).toBe(0);

    var gettinStartedPanel = jQuery(element).find('.getting-started-panel');
    expect(gettinStartedPanel.length).toBe(1);
  });

  it('should show the create project panel when Create Project button is clicked', () => {
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var createButton = jQuery(element).find('.create-button');
    expect(createButton.length).toBe(1);

    var createPanel = jQuery(element).find('.catalog-create-project-panel');
    expect(createPanel.length).toBe(0);

    componentTest.eventFire(createButton[0], 'click');
    componentTest.scope.$digest();

    createPanel = jQuery(element).find('.catalog-create-project-panel');
    expect(createPanel.length).toBe(1);
  });

  it('should show the edit project panel when the Edit menu item is clicked', () => {
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var editPanel = jQuery(element).find('.catalog-edit-project-panel');
    expect(editPanel.length).toBe(0);

    var kebabButton = jQuery(element).find('.btn-link.uib-dropdown-toggle');
    expect(kebabButton.length).toBe(1);

    var menuItems = jQuery(element).find('li > a');
    expect(menuItems.length).toBe(2);

    componentTest.eventFire(menuItems[0], 'click');
    componentTest.scope.$digest();

    editPanel = jQuery(element).find('.catalog-edit-project-panel');
    expect(editPanel.length).toBe(1);
  });

  it('should show the delete confirmation panel when then Delete menu item is clicked', () => {
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var deleteDialog = jQuery(element).find('.delete-resource-modal');
    expect(deleteDialog.length).toBe(0);

    var kebabButton = jQuery(element).find('.btn-link.uib-dropdown-toggle');
    expect(kebabButton.length).toBe(1);

    var menuItems = jQuery(element).find('li > a');
    expect(menuItems.length).toBe(2);

    componentTest.eventFire(menuItems[1], 'click');
    componentTest.scope.$digest();

    deleteDialog = jQuery(element).find('.delete-resource-modal');
    expect(deleteDialog.length).toBe(0);
  });

  it ('should not show projects count area when 5 or less projects', () => {
    spyOn(DataService, 'list').and.callFake(function(resource: any, context: any, callback: any, opts: any) {
      let deferred = this.$q.defer();
      var mockProjects: any = [];

      for (var i: number = 0; i < 5; i++) {
        var nextProject: any = _.cloneDeep(projectsData[0]);
        nextProject.metadata.uid += i;
        mockProjects.push(nextProject);
      }

      var overData: DataServiceData = new DataServiceData(mockProjects);

      callback(overData);

      deferred.resolve(overData);
      return deferred.promise;
    });

    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var countArea = jQuery(element).find('.projects-count-area');
    expect(countArea.length).toBe(0);
  });

  it ('should show projects count area and only 5 projects when more than 5 projects exist.', () => {
    spyOn(DataService, 'list').and.callFake(function(resource: any, context: any, callback: any, opts: any) {
      let deferred = this.$q.defer();
      var mockProjects: any = [];

      for (var i: number = 0; i < 10; i++) {
        var nextProject: any = _.cloneDeep(projectsData[0]);
        nextProject.metadata.uid += i;
        mockProjects.push(nextProject);
      }

      var overData: DataServiceData = new DataServiceData(mockProjects);

      callback(overData);

      deferred.resolve(overData);
      return deferred.promise;
    });

    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var countArea = jQuery(element).find('.projects-count-area');
    expect(countArea.length).toBe(1);

    var projectTiles = jQuery(element).find('.project-tile');
    expect(projectTiles.length).toBe(5);
  });

  it('should call the show all projects callback when the View All link is clicked', () => {
    spyOn(DataService, 'list').and.callFake(function(resource: any, context: any, callback: any, opts: any) {
      let deferred = this.$q.defer();
      var mockProjects: any = [];

      for (var i: number = 0; i < 10; i++) {
        var nextProject: any = _.cloneDeep(projectsData[0]);
        nextProject.metadata.uid += i;
        mockProjects.push(nextProject);
      }

      var overData: DataServiceData = new DataServiceData(mockProjects);

      callback(overData);

      deferred.resolve(overData);
      return deferred.promise;
    });

    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var viewAllLink = jQuery(element).find('.projects-view-all');
    expect(viewAllLink.length).toBe(1);

    expect(showProjectsCallCount).toBe(0);

    componentTest.eventFire(viewAllLink[0], 'click');
    componentTest.scope.$digest();

    expect(showProjectsCallCount).toBe(1);
  });

  it('should call the select project callback when the project name is clicked', () => {
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var projectTitle = jQuery(element).find('.project-tile .project-title');
    expect(projectTitle.length).toBe(1);

    expect(selectCallCount).toBe(0);

    componentTest.eventFire(projectTitle[0], 'click');
    componentTest.scope.$digest();

    expect(selectedProject).toBe(projectsData[0]);
    expect(selectCallCount).toBe(1);
  });
});
