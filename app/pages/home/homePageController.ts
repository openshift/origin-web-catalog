import {MockDataService} from '../../services/mockData.service';

export class HomePageController {
  static $inject = ['AuthService', 'MockDataService', 'DataService'];

  public authService: any;
  public service: MockDataService;
  public applications: any;
  public services: any;
  public ctrl: any = this;
  private dataService: any;

  constructor(AuthService: any, mockDataService: any, DataService: any) {
    this.authService = AuthService;
    this.service = mockDataService;
    this.ctrl.loading = false;
    this.ctrl.applications = [];
    this.ctrl.services = [];
    this.ctrl.categories = [];
    this.dataService = DataService;
  };

  public $onInit() {
    var _this: any = this;
    this.authService.withUser().then(function () {
      _this.update();
    });

    this.dataService.list({
      group: 'servicecatalog.k8s.io',
      resource: 'serviceclasses'
      }, {}, function(serviceclasses: any) {
        console.log('Service Classes: ' + JSON.stringify(serviceclasses));
      });
  };

  public update() {
    this.ctrl.applications = this.service.getRedHatApplications();
    this.ctrl.services = this.service.getServices();
    this.ctrl.categories = this.service.getServiceCategories();
    this.ctrl.loading = false;
  };

}
