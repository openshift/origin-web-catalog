export class HomePageController {
  static $inject = ['$state', 'AuthService', 'Catalog', 'Constants'];

  public ctrl: any = this;
  private $state: any;
  private authService: any;
  private Catalog: any;
  private constants: any;

  constructor($state: any, AuthService: any, Catalog: any, Constants: any) {
    this.$state = $state;
    this.authService = AuthService;
    this.Catalog = Catalog;
    this.constants = Constants;
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
    this.Catalog.getCatalogItems(false).then( (catalogServiceItems: any) => {
      this.ctrl.catalogItems = catalogServiceItems;
    }, () => {
      this.ctrl.catalogItems = {};
    });

    this.ctrl.saasOfferings = this.constants.SAAS_OFFERINGS;
  };
}
