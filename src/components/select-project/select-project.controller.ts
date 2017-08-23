import * as angular from 'angular';
import * as _ from 'lodash';

export class SelectProjectController implements angular.IController {
  static $inject = ['$scope', '$filter', 'ProjectsService', 'Logger', 'AuthService', 'AuthorizationService'];

  public ctrl: any = this;
  public $scope: any;

  private $filter: any;
  private ProjectsService: any;
  private Logger: any;
  private AuthService: any;
  private AuthorizationService: any;

  constructor($scope: any, $filter: any, ProjectsService: any, Logger: any, AuthService: any, AuthorizationService: any) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.AuthService = AuthService;
    this.AuthorizationService = AuthorizationService;
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
    if (onChangesObj.availableProjects && !onChangesObj.availableProjects.isFirstChange()) {
      this.filterProjects(this.ctrl.availableProjects);
    }
  }

  public onSelectProjectChange () {
    this.canIAddToProject();
    if (angular.isFunction(this.ctrl.onProjectSelected)) {
      this.ctrl.onProjectSelected(this.ctrl.selectedProject);
    }
  }

  public onNewProjectNameChange() {
    this.ctrl.nameTaken = false;
    this.ctrl.forms.createProjectForm.name.$setValidity('nameTaken', !this.ctrl.nameTaken);
  }

  public isNewProject(): boolean {
    return this.ctrl.projects && this.ctrl.selectedProject && !_.has(this.ctrl.selectedProject, 'metadata.uid');
  }

  private canIAddToProject(): boolean {
    let canIAddToProject: boolean = true;

    // TODO AuthorizationService.canIAddToProject assumes that the ProjectsService.get has already completed performed
    // but currently this happens after project change events fire and it happens in the various dialog controllers, not
    // as part of this component.  For now always return true until we can resolve this.
    //
    // if (!this.isNewProject()) {
    //   canIAddToProject = this.AuthorizationService.canIAddToProject(_.get(this.ctrl.selectedProject, 'metadata.name'));
    // }

    return this.ctrl.forms.selectProjectForm.selectProject.$setValidity('cannotAddToProject', canIAddToProject);
  }

  private filterProjects(projects: any) {
    // 'Create Project' placeholder obj in the dropdown
    let createProject = {
      "metadata": {
        "annotations": {
          "openshift.io/display-name": "Create Project",
          "new-display-name": ""
        }
      }
    };

    var filteredProjects = _.reject(projects, 'metadata.deletionTimestamp');
    this.ctrl.projects = _.sortBy(filteredProjects, this.$filter('displayName'));
    this.ctrl.searchEnabled = !_.isEmpty(filteredProjects);

    // Don't let users create a project with an existing name. Make sure we
    // use the unfiltered list or we don't show the error for projects that
    // exist, but are being deleted.
    this.ctrl.existingProjectNames = _.map(projects, 'metadata.name');

    // if one project, default to it, else no default selected project
    if (!this.ctrl.selectedProject && _.size(this.ctrl.projects) > 0) {
      if (_.size(this.ctrl.projects) === 1) {
        this.ctrl.selectedProject = this.ctrl.projects[0];
        this.onSelectProjectChange ();
      }
    }

    if (this.ctrl.canCreate) {
      this.ctrl.projects.unshift(createProject);
      if (_.size(this.ctrl.projects) === 1) {
        this.ctrl.selectedProject = createProject;
        this.onSelectProjectChange ();
      }
    }

    this.canIAddToProject();
  }

  private listProjects() {
    if (this.ctrl.availableProjects) {
      this.filterProjects(this.ctrl.availableProjects);
    } else {
      this.ProjectsService.list().then((response: any) => {
        this.filterProjects(response.by('metadata.name'));
      });
    }
  }
}
