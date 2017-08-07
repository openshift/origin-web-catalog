import * as angular from 'angular';
import * as _ from 'lodash';

export class ProjectsSummaryController implements angular.IController {
  // alphabetically please
  static $inject = [
    '$rootScope',
    '$scope',
    'AuthService',
    'Constants',
    'DataService',
    'Logger',
    'ProjectsService',
    'RecentlyViewedProjectsService',
    'RecentlyViewedServiceItems'
  ];

  public ctrl: any = this;
  public newProjectPanelShown: boolean = false;
  public editProjectPanelShown: boolean = false;
  public alerts: any = [];
  public projects: any = [];
  private $rootScope: any;
  private $scope: any;
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

  // alphabetically please
  constructor (
      $rootScope: any,
      $scope: any,
      AuthService: any,
      Constants: any,
      DataService: any,
      Logger: any,
      ProjectsService: any,
      RecentlyViewedProjectsService: any,
      RecentlyViewedServiceItems: any
    ) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
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

  public init = () => {
    this.watches.push(this.DataService.watch('projects', this.$scope, this.onProjectsUpdate));
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
    var projects: any = _.toArray(projectData.by('metadata.creationTimestamp'));
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

  public closeNewProjectPanel = () => {
    this.ctrl.newProjectPanelShown = false;
  };

  public onNewProject = (projectName: string) => {
    this.ctrl.newProjectPanelShown = false;
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
