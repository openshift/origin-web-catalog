import * as angular from 'angular';
import * as _ from 'lodash';

export class ProjectsSummaryController implements angular.IController {
  // alphabetically please
  static $inject = [
    '$filter',
    '$rootScope',
    '$scope',
    '$window',
    'AuthService',
    'Constants',
    'DataService',
    'Logger',
    'ProjectsService',
    'RecentlyViewedProjectsService',
    'RecentlyViewedServiceItems'
  ];

  static readonly MAX_PROJETS_TO_WATCH: number = 250;

  public ctrl: any = this;
  public newProjectPanelShown: boolean = false;
  public editProjectPanelShown: boolean = false;
  private $filter: any;
  private $rootScope: any;
  private $scope: any;
  private $window: any;
  private ProjectsService: any;
  private Logger: any;
  private AuthService: any;
  private DataService: any;
  private Constants: any;
  private RecentlyViewedItems: any;
  private RecentlyViewedProjectsService: any;
  private watches: any = [];
  private maxDisplayProjects: number = 5;
  private allItems: any;
  private watchingProjects: boolean = false;

  // alphabetically please
  constructor (
      $filter: any,
      $rootScope: any,
      $scope: any,
      $window: any,
      AuthService: any,
      Constants: any,
      DataService: any,
      Logger: any,
      ProjectsService: any,
      RecentlyViewedProjectsService: any,
      RecentlyViewedServiceItems: any
    ) {
    this.$filter = $filter;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$window = $window;
    this.AuthService = AuthService;
    this.Constants = Constants;
    this.DataService = DataService;
    this.Logger = Logger;
    this.ProjectsService = ProjectsService;
    this.RecentlyViewedProjectsService = RecentlyViewedProjectsService;
    this.RecentlyViewedItems = RecentlyViewedServiceItems;
  }

  public $onInit () {
    this.ctrl.loading = true;

    this.AuthService
      .withUser()
      .then((resp: any) => {
        this.ctrl.user = resp;
      });

    this.ProjectsService.canCreate().then(() => {
      this.ctrl.canCreate = true;
    }, (result) => {
      this.ctrl.canCreate = false;
      this.ctrl.loading = false;

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

  public $onDestroy() {
    this.DataService.unwatchAll(this.watches);
  }

  public init = () => {
    this.ProjectsService.list().then((projects: any) => {
      this.onProjectsUpdate(projects);
      this.ctrl.isProjectListIncomplete = this.ProjectsService.isProjectListIncomplete();
      // Only watch if the list successfully completed and we are below the
      // maximum number of projects to watch. Otherwise the list is likely too
      // large to reliably watch.
      if (!this.ctrl.isProjectListIncomplete && this.ctrl.totalProjects <= ProjectsSummaryController.MAX_PROJETS_TO_WATCH) {
        this.watches.push(this.ProjectsService.watch(this.$scope, this.onProjectsUpdate));
        // If we're not watching projects, we can manually update the list
        // on changes.
        this.watchingProjects = true;
      }
    }, () => {
      this.ctrl.isProjectListIncomplete = true;
    });
    this.ctrl.resourceLinks = _.clone(this.Constants.CATALOG_HELP_RESOURCES.links);

    _.forEach(this.ctrl.resourceLinks, (nextResource: any) => {
      if (angular.isDefined(nextResource.help)) {
        nextResource.href = this.Constants.HELP_BASE_URL + (nextResource.help ? this.Constants.HELP[nextResource.help] : '');
      }
    });

    this.$rootScope.$on('recently-viewed-updated', () => {
      this.ctrl.recentlyViewedItems = this.getRecentlyViewedItems();
    });
  };

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if (onChangesObj.catalogItems && this.ctrl.catalogItems) {
      this.allItems = _.keyBy(this.ctrl.catalogItems, 'resource.metadata.uid');
      this.ctrl.recentlyViewedItems = this.getRecentlyViewedItems();
    }
  }

  public onProjectsUpdate = (projectData: any) => {
    var projects: any = _.toArray(projectData.by('metadata.name'));
    this.ctrl.projects = this.RecentlyViewedProjectsService.orderByMostRecentlyViewed(projects);

    this.ctrl.totalProjects = this.ctrl.projects.length;
    this.ctrl.projects = _.take(this.ctrl.projects, this.maxDisplayProjects);
    this.ctrl.loading = false;
    this.ctrl.showGetStarted = !this.ctrl.projects || this.ctrl.projects.length < 2;
  };

  public openNewProjectPanel(event: any) {
    this.ctrl.newProjectPanelShown = true;
    this.ctrl.modalPopupElement = event.currentTarget;
  }

  public goToProject = (projectName: string) => {
    let url = this.$filter('projectUrl')(projectName, this.ctrl.baseProjectUrl);
    this.$window.location.href = url;
  };

  public closeNewProjectPanel = () => {
    this.ctrl.newProjectPanelShown = false;
  };

  public onNewProject = (projectName: string) => {
    this.ctrl.newProjectPanelShown = false;
    if (!this.watchingProjects) {
      // This is not expensive since it returns the cached list. The list will include the new project, however.
      this.ProjectsService.list().then(this.onProjectsUpdate);
    }
  };

  public onViewMemebership = (project: any) => {
    var cb: any = this.ctrl.viewEditMembership();
    if (cb) {
      cb(project);
    }
  };

  public editProject = (project: any) => {
    this.ctrl.edittingProject = project;
    this.ctrl.editProjectPanelShown = true;
  };

  public closeEditProjectPanel = () => {
    this.ctrl.editProjectPanelShown = false;
  };

  public onEditProject = (projectName: string) => {
    this.ctrl.editProjectPanelShown = false;
    if (!this.watchingProjects) {
      // This is not expensive since it returns the cached list. The list will include the updated project, however.
      this.ProjectsService.list().then(this.onProjectsUpdate);
    }
  };

  public onDeleteProject = () => {
    if (!this.watchingProjects) {
      // This is not expensive since it returns the cached list. The list will include the updated project, however.
      this.ProjectsService.list().then(this.onProjectsUpdate);
    }
  };

  public handleGettingStartedClick() {
    var cb: any = this.ctrl.startTour();
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

  public orderService(item: any) {
    this.$scope.$emit('open-overlay-panel', item);
  }

  public showAllProjects() {
    var cb: any = this.ctrl.showProjects();
    if (cb) {
      cb();
    }
  }

  private getRecentlyViewedItems() {
    if (!this.allItems) {
      return;
    }

    // recentItems is an array of uids
    let recentItems: any = this.RecentlyViewedItems.getItems();

    // replace uids with IServiceItems
    let items: any = _.map(recentItems, (uid: any) => {
      return this.allItems[uid];
    });

    // Remove null items
    items = _.reject(items, (item) => {
      return !item;
    });

    return items;
  }
}
