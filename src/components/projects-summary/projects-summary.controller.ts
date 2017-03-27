import * as angular from 'angular';
import * as _ from 'lodash';

export class ProjectsSummaryController implements angular.IController {
  static $inject = ['$element', '$scope', '$filter', 'ProjectsService', 'Logger', 'AuthService', 'DataService', 'AlertMessageService'];

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
  private AlertMessageService: any;
  private watches: any = [];
  private maxDisplayProjects: number = 5;

  constructor ($element: any, $scope: any, $filter: any, ProjectsService: any, Logger: any, AuthService: any, DataService: any, AlertMessageService: any) {
    this.$element = $element;
    this.$scope = $scope;
    this.$filter = $filter;
    this.ProjectsService = ProjectsService;
    this.Logger = Logger;
    this.AuthService = AuthService;
    this.DataService = DataService;
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
    });

    this.AuthService.withUser().then(this.onVerifyUser);
  }

  public onVerifyUser = () => {
    this.ctrl.loading = true;
    this.watches.push(this.DataService.watch('projects', this.$scope, this.onProjectsUpdate));
    this.AlertMessageService.getAlerts().forEach(function(alert: any) {
      this.ctrl.alerts[alert.name] = alert.data;
    });
  };

  public onProjectsUpdate = (projectData: any) => {
    var projects: any = _.toArray(projectData.by('metadata.creationTimestamp'));
    var orderByDate: any = this.$filter('orderObjectsByDate');
    this.ctrl.projects = orderByDate(projects, true);

    this.ctrl.totalProjects = this.ctrl.projects.length;
    this.ctrl.projects = _.take(this.ctrl.projects, this.maxDisplayProjects);
    this.ctrl.loading = false;
    this.ctrl.showGetStarted = _.isEmpty(this.ctrl.projects);
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

  public handleProjectClick(project: any) {
    var cb: any = this.ctrl.projectSelect();
    if (cb) {
      cb(project);
    }
  }

  public showAllProjects() {
    var cb: any = this.ctrl.showProjects();
    if (cb) {
      cb();
    }
  }
}
