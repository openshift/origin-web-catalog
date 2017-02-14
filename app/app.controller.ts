import {MockDataService} from '../src/services/mockData.service';

export class AppController {

    static $inject = ['MockDataService'];

    public service: MockDataService;
    public services: any;

    constructor(mockDataService: any) {
      this.services = mockDataService.getServices();
    }
}
