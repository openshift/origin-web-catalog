
export class HomePageController {
  static $inject = ['$state', '$element', '$timeout', 'AuthService', 'Logger', 'Constants', 'DataService', 'LandingPageTourService'];

  public ctrl: any = this;
  private $state: any;
  private $element: any;
  private $timeout: any;
  private authService: any;
  private LandingPageTourService: any;
  private logger: any;
  private constants: any;
  private dataService: any;
  private Logger: any;

  constructor($state: any, $element: any, $timeout: any, AuthService: any, Logger: any, Constants: any, DataService: any, LandingPageTourService: any) {
    this.$state = $state;
    this.$element = $element;
    this.$timeout = $timeout;
    this.authService = AuthService;
    this.logger = Logger;
    this.LandingPageTourService = LandingPageTourService;
    this.constants = Constants;
    this.dataService = DataService;
    this.Logger = Logger;
    this.ctrl.applications = [];
    this.ctrl.categories = [];
    this.ctrl.serviceClasses = {};
    this.ctrl.imageStreams = {};
  };

  public $onInit() {
    // Assume a development environment for the console. Remove the trailing slash if set.
    let consoleBaseUrl = _.get(window, 'OPENSHIFT_CONSOLE_BASE_URL', 'https://localhost:9000/dev-console').replace(/\/$/, '');
    this.ctrl.baseProjectUrl = consoleBaseUrl + "/project";
    this.ctrl.projectsUrl = consoleBaseUrl + "/projects";
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

  public startGuidedTour = () => {
    this.LandingPageTourService.startTour();
  };
}
