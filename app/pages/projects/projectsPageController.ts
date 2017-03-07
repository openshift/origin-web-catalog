import * as _ from 'lodash';

export class ProjectsPageController {
  static $inject = ['$scope', 'AuthService', 'DataService'];

  public ctrl: any = this;
  public $scope: any;
  public authService: any;
  public DataService: any;

  private watches: any = [];
  private projects: any;
  private sortedProjects: any;
  private previousSortID: any;

  constructor($scope: any, AuthService: any, DataService: any) {
    this.$scope = $scope;
    this.authService = AuthService;
    this.DataService = DataService;

    this.ctrl.sortConfig = {
      fields: [{
        id: 'metadata.annotations["openshift.io/display-name"]',
        title: 'Display Name',
        sortType: 'alpha'
      }, {
        id: 'metadata.name',
        title: 'Name',
        sortType: 'alpha'
      }, {
        id: 'metadata.annotations["openshift.io/requester"]',
        title: 'Creator',
        sortType: 'alpha'
      }, {
        id: 'metadata.creationTimestamp',
        title: 'Creation Date',
        sortType: 'alpha'
      }],
      isAscending: true,
      onSortChange: this.update
    };

  }

  public $onInit() {
    this.ctrl.showGetStarted = true;
    this.ctrl.loading = true;
    this.ctrl.projects = [];

    this.authService.withUser().then(this.onVerifyUser);
    //function () {
    //  _this.watches.push(_this.DataService.watch('projects', _this.$scope, function (projectData: any) {
    //    _this.projects = _.toArray(projectData.by('metadata.name'));
    //    _this.ctrl.loading = false;
    //    _this.ctrl.showGetStarted = _.isEmpty(_this.ctrl.projects);
    //    console.dir(_this.ctrl.projects);
    //    _this.sortProjects();
    //    _this.ctrl.projects = _this.sortedProjects;
    //
    //  }));
    //});
  }

  public onVerifyUser = () => {
    this.watches.push(this.DataService.watch('projects', this.$scope, this.onProjectsUpdate));
  };

  public onProjectsUpdate = (projectData: any) => {
    this.projects = _.toArray(projectData.by('metadata.name'));
    this.ctrl.loading = false;
    this.ctrl.showGetStarted = _.isEmpty(this.ctrl.projects);
    this.sortProjects();
    this.ctrl.projects = this.sortedProjects;
  };

  public $onDestroy() {
    this. DataService.unwatchAll(this.watches);
  }

  public update = () => {
    console.dir(this);
    this.sortProjects();

    this.ctrl.projects = this.sortedProjects;
  }

  public sortProjects() {
    var sortID = _.get(this.ctrl, 'sortConfig.currentField.id');

    if (this.previousSortID !== sortID) {
      // default to desc for creation timestamp. Otherwise default to asc.
      this.ctrl.sortConfig.isAscending = sortID !== 'metadata.creationTimestamp';
    }

    var displayNameLower = function(project: any) {
      // perform a case insensitive sort.
      return project.displayName.toLowerCase();
    };

    var primarySortOrder = this.ctrl.sortConfig.isAscending ? 'asc' : 'desc';
    switch (sortID) {
    case 'metadata.annotations["openshift.io/display-name"]':
      // Sort by display name. Use `metadata.name` as a secondary sort when
      // projects have the same display name.
      this.sortedProjects = _.sortBy(this.projects, [ displayNameLower, 'metadata.name' ]);
      break;
    case 'metadata.annotations["openshift.io/requester"]':
      // Sort by requester, then display name. Secondary sort is always ascending.
      this.sortedProjects = _.sortBy(this.projects, [ sortID, displayNameLower ]);
      break;
    default:
      this.sortedProjects = _.sortBy(this.projects, [ sortID ]);
    }

    if (primarySortOrder !== 'asc') {
      this.sortedProjects.reverse();
    }
    // Remember the previous sort ID.
    this.previousSortID = sortID;
  };
}

