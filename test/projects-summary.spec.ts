import * as angular from 'angular';
import 'angular-mocks';
import * as jQuery from 'jquery';
import * as _ from 'lodash';

import {TestHelpers} from '../test/utils/testHelpers';
import {ComponentTest} from '../test/utils/ComponentTest';
import {ProjectsSummaryController} from '../src/components/projects-summary/projects-summary.controller';
import {DataServiceData} from '../app/mockServices/mockData.service';
import {projectsData} from '../app/mockServices/mockData/projects';
import {servicesData} from '../app/mockServices/mockData/services';
import {imagesData} from '../app/mockServices/mockData/openshift-images';

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
  var RecentlyViewed: any;
  var services: any;
  var images: any;
  var viewMembershipProject: any;
  var viewMembershipCallCount: number = 0;
  var showTourCount: number = 0;
  var expectedCanCreate: boolean = true;
  var expectedCanCreateData: any;

  var testShowTour = function() {
    showTourCount++;
  };

  var testViewMembership = function(project: any) {
    viewMembershipProject = project;
    viewMembershipCallCount++;
  };

  var setProjectList = function(numProjects: number) {
    spyOn(DataService, 'list').and.callFake(function(resource: any, context: any, callback: any, opts: any) {
      let deferred = this.$q.defer();
      var mockProjects: any = [];

      for (var i: number = 0; i < numProjects; i++) {
        var nextProject: any = _.cloneDeep(projectsData[0]);
        nextProject.metadata.uid += i;
        mockProjects.push(nextProject);
      }

      var overData: DataServiceData = new DataServiceData(mockProjects);

      callback(overData);

      deferred.resolve(overData);
      return deferred.promise;
    });
  };

  var createProjectSummary = function() {
    var projectsSummaryHtml: string = '<projects-summary ' +
      'service-classes="services" ' +
      'image-streams="images" ' +
      'view-edit-membership="testViewMembership" ' +
      'start-getting-started-tour="testShowTour">' +
      '</projects-summary>';

    componentTest = new ComponentTest<ProjectsSummaryController>(projectsSummaryHtml);

    var attributes: any = {
      services: services,
      images: images,
      testViewMembership: testViewMembership,
      testShowTour: testShowTour,
    };

    componentTest.createComponent(attributes);
  };

  beforeEach( () => {
    testHelpers.initTests();

    angular.mock.module('webCatalog', 'openshiftCommonUI', 'mockServices');
  });

  beforeEach(() => {
    inject(function (_$window_: any, _$timeout_: any, _$q_: any, _ProjectsService_: any, _DataService_: any, _RecentlyViewedServiceItems_: any) {
      $window = _$window_;
      $timeout = _$timeout_;
      $q = _$q_;
      ProjectsService = _ProjectsService_;
      DataService = _DataService_;
      RecentlyViewed = _RecentlyViewedServiceItems_;
    });
  });

  beforeEach(() => {
    expectedCanCreate = true;
    services = angular.copy(servicesData);
    images = angular.copy(imagesData);

    spyOn(ProjectsService, 'canCreate').and.callFake(function() {
      let deferred = this.$q.defer();
      if (!expectedCanCreate) {
        deferred.reject(
          {
            status: 403,
            data: expectedCanCreateData
          }
        );
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    });

    // clear any 'recently viewed items' from local storage
    localStorage.removeItem('catalog-recently-viewed-services');
  });

  afterEach(() => {
    // clear any 'recently viewed items' from local storage
    localStorage.removeItem('catalog-recently-viewed-services');
  });

  // testing the isoScope $ctrl
  it('should have the correct $ctrl properties', () => {
    createProjectSummary();

    var ctrl = componentTest.isoScope.$ctrl;
    expect(ctrl.viewEditMembership()).toBe(testViewMembership);
    expect(ctrl.startGettingStartedTour()).toBe(testShowTour);
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
    expect(createButton.length).toBe(0);
  });

  it('should show the existing projects in the projects list', () => {
    setProjectList(1);
    createProjectSummary();

    var ctrl = componentTest.isoScope.$ctrl;
    var element = componentTest.rawElement;

    $timeout.flush();

    expect(ctrl.loading).toBe(false);

    expect(ctrl.projects.length).toBe(1);

    var projectTiles = jQuery(element).find('.project-tile');
    expect(projectTiles.length).toBe(1);
  });

  it('should show getting started when no existing projects', () => {
    setProjectList(0);
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

  it('should show getting started when only one project exists', () => {
    setProjectList(1);
    createProjectSummary();

    var ctrl = componentTest.isoScope.$ctrl;
    var element = componentTest.rawElement;

    $timeout.flush();

    expect(ctrl.loading).toBe(false);
    expect(ctrl.showGetStarted).toBe(true);

    expect(ctrl.projects.length).toBe(1);

    var projectTiles = jQuery(element).find('.project-tile');
    expect(projectTiles.length).toBe(1);

    var gettinStartedPanel = jQuery(element).find('.getting-started-panel');
    expect(gettinStartedPanel.length).toBe(1);
  });

  it('should show the create project panel when Create Project button is clicked', () => {
    setProjectList(1);
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var createButton = jQuery(element).find('.create-button');
    expect(createButton.length).toBe(1);

    var createPanel = jQuery(element).find('.catalog-modal-create-project');
    expect(createPanel.length).toBe(0);

    componentTest.eventFire(createButton[0], 'click');
    componentTest.scope.$digest();

    createPanel = jQuery(element).find('.catalog-modal-create-project');
    expect(createPanel.length).toBe(1);
  });

  it('should call the edit/view membership callback when the Edit and View Membership menu item is clicked', () => {
    setProjectList(1);
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    expect(viewMembershipProject).toBeUndefined();
    expect(viewMembershipCallCount).toBe(0);

    var menuItems = jQuery(element).find('.catalog-project-summary-list li > a');
    expect(menuItems.length).toBe(3);

    componentTest.eventFire(menuItems[0], 'click');
    componentTest.scope.$digest();

    expect(viewMembershipProject).toBeDefined();
    expect(viewMembershipCallCount).toBe(1);
  });

  it('should show the edit project panel when the Edit menu item is clicked', () => {
    setProjectList(1);
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var editPanel = jQuery(element).find('.catalog-modal-edit-project');
    expect(editPanel.length).toBe(0);

    var kebabButton = jQuery(element).find('.btn-link.uib-dropdown-toggle');
    expect(kebabButton.length).toBe(1);

    var menuItems = jQuery(element).find('.catalog-project-summary-list li > a');
    expect(menuItems.length).toBe(3);

    componentTest.eventFire(menuItems[1], 'click');
    componentTest.scope.$digest();

    editPanel = jQuery(element).find('.catalog-modal-edit-project');
    expect(editPanel.length).toBe(1);
  });

  it('should show the delete confirmation panel when then Delete menu item is clicked', () => {
    setProjectList(1);
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var deleteDialog = jQuery(element).find('.delete-resource-modal');
    expect(deleteDialog.length).toBe(0);

    var kebabButton = jQuery(element).find('.btn-link.uib-dropdown-toggle');
    expect(kebabButton.length).toBe(1);

    var menuItems = jQuery(element).find('.catalog-project-summary-list li > a');
    expect(menuItems.length).toBe(3);

    componentTest.eventFire(menuItems[2], 'click');
    componentTest.scope.$digest();

    deleteDialog = jQuery(element).find('.delete-resource-modal');
    expect(deleteDialog.length).toBe(0);
  });

  it ('should not show projects count area when 5 or less projects', () => {
    setProjectList(5);
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var countArea = jQuery(element).find('.projects-count-area');
    expect(countArea.length).toBe(0);
  });

  it ('should show projects count area and only 5 projects when more than 5 projects exist.', () => {
    setProjectList(10);
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var countArea = jQuery(element).find('.projects-count');
    expect(countArea.length).toBe(1);

    var projectTiles = jQuery(element).find('.project-tile');
    expect(projectTiles.length).toBe(5);
  });


  it('should call the start guided tour callback when the start tour button is clicked', () => {
    setProjectList(1);
    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var starTourButton = jQuery(element).find('.getting-started-button ');
    expect(starTourButton.length).toBe(1);

    expect(showTourCount).toBe(0);

    componentTest.eventFire(starTourButton[0], 'click');
    componentTest.scope.$digest();

    expect(showTourCount).toBe(1);
  });

  it('should show a defined message when unable to create projects', () => {
    expectedCanCreate = false;
    expectedCanCreateData = {
      details: {
        causes: [{message: "test message"}]
      }
    };

    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var message = jQuery(element).find('.catalog-projects-summary-panel > div > span');

    expect(message.length).toBe(1);
    expect(message[0].innerHTML).toBe("test message");
  });

  it('should show a default message when no defined message for unable to create projects', () => {
    expectedCanCreate = false;
    expectedCanCreateData = undefined;

    createProjectSummary();

    var element = componentTest.rawElement;

    $timeout.flush();

    var message = jQuery(element).find('.catalog-projects-summary-panel > div > span');

    expect(message.length).toBe(1);
    expect(message[0].innerHTML.trim().startsWith('A cluster admin can create a project')).toBe(true);
  });

  it("should show Recently Viewed items", () => {
    createProjectSummary();

    var element = componentTest.rawElement;

    // should be no recently viewed items
    var recentlyViewedItems = jQuery(element).find('.services-item-name');
    expect(recentlyViewedItems.length).toBe(0);

    RecentlyViewed.addItem('nodejs');
    RecentlyViewed.addItem('perl');
    componentTest.scope.$digest();

    recentlyViewedItems = jQuery(element).find('.services-item-name');
    expect(recentlyViewedItems.length).toBe(2);

    // Ordered by last added is first in list
    expect(jQuery(recentlyViewedItems[0]).text()).toBe('Perl');
    expect(jQuery(recentlyViewedItems[1]).text()).toBe('Node.js');
  });
});
