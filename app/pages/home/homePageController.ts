import {DataManager} from '../../services/dataManager.service';

export class HomePageController {
  static $inject = ['AuthService', 'DataManager', '$q'];

  public ctrl: any = this;
  private authService: any;
  private dataManager: DataManager;
  private $q : any;

  constructor(AuthService: any, dataManager: any, $q: any) {
    this.authService = AuthService;
    this.dataManager = dataManager;
    this.$q = $q;
    this.ctrl.loading = true;
    this.ctrl.applications = [];
    this.ctrl.services = [];
    this.ctrl.categories = [];
  };

  public $onInit() {
    this.authService.withUser().then(() => {
      this.update();
    });
  };

  public update() {
    this.$q.all([
      this.dataManager.getResource('rh-apps'),
      this.dataManager.getResource('service-categories'),
      this.dataManager.getResource('services')]
    ).then(data => {
      this.ctrl.applications = data[0];
      this.ctrl.categories = data[1];
      this.ctrl.services =  data[2];
      this.ctrl.loading = false;
    });
  };

}
