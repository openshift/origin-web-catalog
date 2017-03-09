import {MockDataService} from '../../services/mockData.service';

export class ServicesPageController {

  static $inject = ['AuthService', 'MockDataService'];

  public authService: any;
  public service: MockDataService;
  public services: any;
  public ctrl: any = this;


  constructor(AuthService: any, mockDataService: any) {
    this.authService = AuthService;
    this.service = mockDataService;
    this.ctrl.loading = false;
    this.ctrl.services = [];
    this.ctrl.categories = [];
  };

  public $onInit() {
    var _this: any = this;
    this.authService.withUser().then(function () {
      _this.update();
    });
  };

  public update() {
    this.ctrl.services = this.service.getServices();
    this.ctrl.categories = this.service.getServiceCategories();
    this.ctrl.loading = false;
  };
}
