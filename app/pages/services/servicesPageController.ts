import {MockDataService} from '../../services/mockData.service';

export class ServicesPageController {

  static $inject = ['MockDataService'];

  public service: MockDataService;
  public services: any;
  public ctrl: any = this;


  constructor(mockDataService: any) {
    this.ctrl.services = mockDataService.getServices();
    this.ctrl.categories = mockDataService.getServiceCategories();
  }
}
