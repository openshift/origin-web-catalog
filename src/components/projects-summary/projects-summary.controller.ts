import * as angular from 'angular';
import * as $ from 'jquery';
import * as _ from 'lodash';

export class ProjectsSummaryController implements angular.IController {
  // alphabetically please
  static $inject = [
    '$element',
    '$filter',
    '$rootScope',
    '$scope',
    'AlertMessageService',
    'AuthService',
    'Catalog',
    'Constants',
    'DataService',
    'Logger',
    'ProjectsService',
    'RecentlyViewedServiceItems'
  ];

  public ctrl: any = this;
  public showNewProjectPanel: boolean = false;
  public showEditProjectPanel: boolean = false;
  public alerts: any = [];
  public projects: any = [];
  private $element: any;
  private $rootScope: any;
  private $scope: any;
  private $filter: any;
  private ProjectsService: any;
  private Logger: any;
  private AuthService: any;
  private DataService: any;
  private Constants: any;
  private RecentlyViewed: any;
  private Catalog: any;
  private AlertMessageService: any;
  private watches: any = [];
  private maxDisplayProjects: number = 5;
  private allItems: any;

  // alphabetically please
  constructor (
      $element: any,
      $filter: any,
      $rootScope: any,
      $scope: any,
      AlertMessageService: any,
      AuthService: any,
      Catalog: any,
      Constants: any,
      DataService: any,
      Logger: any,
      ProjectsService: any,
      RecentlyViewedServiceItems: any
    ) {
    this.$element = $element;
    this.$filter = $filter;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.AlertMessageService = AlertMessageService;
    this.AuthService = AuthService;
    this.Catalog = Catalog;
    this.Constants = Constants;
    this.DataService = DataService;
    this.Logger = Logger;
    this.ProjectsService = ProjectsService;
    this.RecentlyViewed = RecentlyViewedServiceItems;
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
    this.AlertMessageService.getAlerts().forEach(function(alert: any) {
      this.ctrl.alerts[alert.name] = alert.data;
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
      this.allItems = _.indexBy(this.ctrl.catalogItems, 'resource.metadata.uid');
      this.ctrl.recentlyViewedItems = this.getRecentlyViewedItems();
    }
  }

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
    this.showModalBackdrop();
  }

  public closeNewProjectPanel = () => {
    this.ctrl.showNewProjectPanel = false;
    this.hideModalBackdrop();
  };

  public onNewProject = (projectName: string) => {
    this.ctrl.showNewProjectPanel = false;
    this.hideModalBackdrop();
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
    this.showModalBackdrop();
  };

  public closeEditProjectPanel = () => {
    this.ctrl.showEditProjectPanel = false;
    this.hideModalBackdrop();
  };

  public onEditProject = (projectName: string) => {
    this.ctrl.showEditProjectPanel = false;
    this.hideModalBackdrop();
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

  private showModalBackdrop() {
    var backdropElement = '<div class="catalog-projects-summary-modal-backrop modal-backdrop fade in"></div>';
    this.$element.append(backdropElement);
  }

  private hideModalBackdrop() {
    $('.catalog-projects-summary-modal-backrop').remove();
  }

  private getRecentlyViewedItems() {
    if (!this.allItems) {
      return;
    }

    // recentItems is an array of uids
    let recentItems: any = this.RecentlyViewed.getItems();

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
