export class ServicesPageController {

  static $inject = ['AuthService', 'Constants', 'DataService', '$q'];

  public ctrl: any = this;
  private authService: any;
  private constants: any;
  private dataService: any;
  private $q : any;

  constructor(AuthService: any, Constants: any, DataService: any, $q: any) {
    this.authService = AuthService;
    this.constants = Constants;
    this.dataService = DataService;
    this.$q = $q;
    this.ctrl.loading = false;
    this.ctrl.services = [];
    this.ctrl.categories = [];
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
    }, {}, (resources: any) => {
      this.ctrl.services = resources;
      this.ctrl.categories = this.constants.SERVICE_CATALOG_CATEGORIES;
      this.ctrl.loading = false;
    });
  };
}
