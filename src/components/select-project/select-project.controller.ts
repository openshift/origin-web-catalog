import * as angular from 'angular';
import * as _ from 'lodash';

export class SelectProjectController implements angular.IController {
  static $inject = ['$scope', '$filter', 'DataService', 'ProjectsService', 'Logger', 'AuthService'];

  public ctrl: any = this;
  public $scope: any;

  private $filter: any;
  private DataService: any;
  private ProjectsService: any;
  private Logger: any;
  private AuthService: any;

  constructor($scope: any, $filter: any, DataService: any, ProjectsService: any, Logger: any, AuthService: any) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.DataService = DataService;
    this.AuthService = AuthService;
    this.ProjectsService = ProjectsService;
    this.Logger = Logger;
  }

  public $onInit() {
    this.ctrl.nameTaken = false;

    this.ProjectsService.canCreate().then(() => {
      this.ctrl.canCreate = true;
    }, (result) => {
      this.ctrl.canCreate = false;
      // 403 Forbidden indicates the user doesn't have authority.
      // Any other failure status is an unexpected error.
      if (result.status !== 403) {
        var msg = 'Failed to determine create project permission';
        if (result.status !== 0) {
          msg += " (" + result.status + ")";
        }
        this.Logger.warn(msg);
      }
    }).finally(() => {
      this.listProjects();
    });
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.nameTaken && !onChangesObj.nameTaken.isFirstChange()) {
      this.ctrl.forms.createProjectForm.name.$setValidity('nameTaken', !this.ctrl.nameTaken);
    }
  }

  public onNewProjectNameChange() {
    this.ctrl.nameTaken = false;
    this.ctrl.forms.createProjectForm.name.$setValidity('nameTaken', !this.ctrl.nameTaken);
  }

  public isNewProject(): boolean {
    return this.ctrl.projects && this.ctrl.selectedProject && !_.has(this.ctrl.selectedProject, 'metadata.uid');
  }

  private listProjects() {
    this.DataService.list('projects', this.$scope).then((response: any) => {
      // 'Create Project' placeholder obj in the dropdown
      let createProject = {
        "metadata": {
          "annotations": {
            "openshift.io/display-name": "Create Project",
            "new-display-name": ""
          }
        }
      };
      this.ctrl.projects = _.sortBy(response.by('metadata.name'), this.$filter('displayName'));

      // get most recently created
      this.ctrl.selectedProject = this.$filter('mostRecent')(this.ctrl.projects);

      if (this.ctrl.canCreate) {
        this.ctrl.projects.unshift(createProject);
      }
    });
  }
}
