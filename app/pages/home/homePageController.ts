export class HomePageController {
  static $inject = ['$state', 'AuthService', 'Logger', 'Constants', 'DataService'];

  public ctrl: any = this;
  private $state: any;
  private authService: any;
  private logger: any;
  private constants: any;
  private dataService: any;
  private Logger: any;

  constructor($state: any, AuthService: any, Logger: any, Constants: any, DataService: any) {
    this.$state = $state;
    this.authService = AuthService;
    this.logger = Logger;
    this.constants = Constants;
    this.dataService = DataService;
    this.Logger = Logger;
    this.ctrl.applications = [];
    this.ctrl.categories = [];
    this.ctrl.serviceClasses = {};
    this.ctrl.imageStreams = {};
  };

  public $onInit() {
    this.authService.withUser().then(() => {
      this.update();
    });
  };

  public update() {
    this.dataService.list({
      group: 'servicecatalog.k8s.io',
      resource: 'serviceclasses'
    }, {}).then( (resources: any) => {
      this.ctrl.serviceClasses = resources.by("metadata.name");
    }, () => {
      this.logger.log("Error Loading serviceclasses from servicecatalog.k8s.io: ");
      this.ctrl.serviceClasses = {};
    });

    this.dataService.list("imagestreams", {namespace: "openshift"}).then( (resources: any) => {
      this.ctrl.imageStreams = resources.by("metadata.name");
    }, () => {
      this.logger.log("Error Loading openshift imagestreams: ");
      this.ctrl.imageStreams = {};
    });

    this.ctrl.saasOfferings = this.constants.SAAS_OFFERINGS;
  };

  public navToProject = (project: any) => {
    this.$state.go('projects/' + project.metadata.name);
  };

  public navToProjects = () => {
    this.$state.go('projects');
  };
}
