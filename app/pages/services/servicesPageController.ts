export class ServicesPageController {

  static $inject = ['AuthService', 'Logger', 'Constants', 'DataService', '$q'];

  public ctrl: any = this;
  private authService: any;
  private logger: any;
  private constants: any;
  private dataService: any;
  private $q : any;

  constructor(AuthService: any, Logger: any, Constants: any, DataService: any, $q: any) {
    this.authService = AuthService;
    this.logger = Logger;
    this.constants = Constants;
    this.dataService = DataService;
    this.$q = $q;
    this.ctrl.loading = false;
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
    }, {}).then((resources: any) => {
      this.ctrl.serviceClasses = resources.by("metadata.name");
    }, () => {
      this.logger.log("Error Loading serviceclasses from servicecatalog.k8s.io: ");
      this.ctrl.serviceClasses = {};
    });

    this.dataService.list("imagestreams", {namespace: "openshift"}).then((resources: any) => {
      this.ctrl.imageStreams = resources.by("metadata.name");
    }, () => {
      this.logger.log("Error Loading openshift imagestreams: ");
      this.ctrl.imageStreams = {};
    });
  }
}
