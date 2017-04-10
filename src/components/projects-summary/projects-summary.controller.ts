import * as angular from 'angular';
import * as _ from 'lodash';

export class ProjectsSummaryController implements angular.IController {
  static $inject = ['$element', '$scope', '$filter', 'ProjectsService', 'Logger', 'AuthService', 'DataService', 'Constants', 'AlertMessageService'];

  public ctrl: any = this;
  public showNewProjectPanel: boolean = false;
  public showEditwProjectPanel: boolean = false;
  public alerts: any = [];
  public projects: any = [];
  private $element: any;
  private $scope: any;
  private $filter: any;
  private ProjectsService: any;
  private Logger: any;
  private AuthService: any;
  private DataService: any;
  private Constants: any;
  private AlertMessageService: any;
  private watches: any = [];
  private maxDisplayProjects: number = 5;

  constructor ($element: any, $scope: any, $filter: any, ProjectsService: any, Logger: any, AuthService: any, DataService: any, Constants: any, AlertMessageService: any) {
    this.$element = $element;
    this.$scope = $scope;
    this.$filter = $filter;
    this.ProjectsService = ProjectsService;
    this.Logger = Logger;
    this.AuthService = AuthService;
    this.DataService = DataService;
    this.Constants = Constants;
    this.AlertMessageService = AlertMessageService;
  }

  public $onInit () {
    this.ProjectsService.canCreate().then(() => {
      this.ctrl.canCreate = true;
    }, (result) => {
      this.ctrl.canCreate = false;

      var data = result.data || {};

      // 403 Forbidden indicates the user doesn't have authority.
      // Any other failure status is an unexpected error.
      if (result.status !== 403) {
        var msg = 'Failed to determine create project permission';
        if (result.status !== 0) {
          msg += " (" + result.status + ")";
        }
        this.Logger.warn(msg);
        return;
      }

      // Check if there are detailed messages. If there are, show them instead of our default message.
      if (data.details) {
        var messages = [];
        _.forEach(data.details.causes || [], function (cause: any) {
          if (cause.message) {
            messages.push(cause.message);
          }
        });
        if (messages.length > 0) {
          this.ctrl.newProjectMessage = messages.join("\n");
          // TODO: Toast Notification
        }
      }
    }).finally(() => {
      this.init();
    });
  }

  public init = () => {
    this.ctrl.loading = true;
    this.ctrl.orderingPanelVisible = false;
    this.watches.push(this.DataService.watch('projects', this.$scope, this.onProjectsUpdate));
    this.AlertMessageService.getAlerts().forEach(function(alert: any) {
      this.ctrl.alerts[alert.name] = alert.data;
    });

    this.ctrl.resourceDescription = this.Constants.CATALOG_HELP_RESOURCES.description;
    this.ctrl.resourceLinks = _.clone(this.Constants.CATALOG_HELP_RESOURCES.links);

    _.forEach(this.ctrl.resourceLinks, (nextResource: any) => {
      if (angular.isDefined(nextResource.help)) {
        nextResource.href = this.Constants.HELP_BASE_URL + this.Constants.HELP[nextResource.help];
      }
    });

    this.$scope.$watch(this.getgetRecentlyViewedItemsFromStorage, (newValue: any) => {
     this.ctrl.recentlyViewedItems = this.getRecentlyViewedItems(newValue);
    });
  };

  public onProjectsUpdate = (projectData: any) => {
    var projects: any = _.toArray(projectData.by('metadata.creationTimestamp'));
    var orderByDate: any = this.$filter('orderObjectsByDate');
    this.ctrl.projects = orderByDate(projects, true);

    this.ctrl.totalProjects = this.ctrl.projects.length;
    this.ctrl.projects = _.take(this.ctrl.projects, this.maxDisplayProjects);
    this.ctrl.loading = false;
    this.ctrl.showGetStarted = !this.ctrl.projects || this.ctrl.projects.length < 2;
  };

  public openNewProjectPanel() {
    this.ctrl.showNewProjectPanel = true;
  }

  public closeNewProjectPanel = () => {
    this.ctrl.showNewProjectPanel = false;
  };

  public onNewProject = (projectName: string) => {
    this.ctrl.showNewProjectPanel = false;
  };

  public onViewMemebership = (project: any) => {
    var cb: any = this.ctrl.viewEditMembership();
    if (cb) {
      cb(project);
    }
  };

  public editProject = (project: any) => {
    this.ctrl.edittingProject = project;
    this.ctrl.showEditProjectPanel = true;
  };

  public closeEditProjectPanel = () => {
    this.ctrl.showEditProjectPanel = false;
  };

  public onEditProject = (projectName: string) => {
    this.ctrl.showEditProjectPanel = false;
  };

  public handleGettingStartedClick() {
    var cb: any = this.ctrl.startGettingStartedTour();
    if (cb) {
      cb();
    }
  }

  public handleProjectClick(project: any) {
    var cb: any = this.ctrl.projectSelect();
    if (cb) {
      cb(project);
    }
  }

  public openOrderingPanel() {
    this.ctrl.orderingPanelVisible = true;
  };

  public closeOrderingPanel = () => {
    this.ctrl.orderingPanelVisible = false;
  };

  public orderService(item: any) {
    let kind = _.get(item, 'resource.kind');
    if (kind === 'ImageStream') {
      this.ctrl.selectedImageStream = item;
      this.ctrl.selectedServiceClass = null;
    } else {
      this.ctrl.selectedImageStream = null;
      this.ctrl.selectedServiceClass = item;
    }
    this.ctrl.openOrderingPanel();
  }

  public showAllProjects() {
    var cb: any = this.ctrl.showProjects();
    if (cb) {
      cb();
    }
  }

  private getRecentlyViewedItems(recentlyViewed: any) {
    recentlyViewed = recentlyViewed ? JSON.parse(recentlyViewed) : [];
    recentlyViewed = _.map(recentlyViewed, (item: any) => {
      return JSON.parse(item);
    });

    return recentlyViewed;
  }

  private getgetRecentlyViewedItemsFromStorage() {
    return localStorage.getItem('catalog-recently-viewed-services');
  }
}
