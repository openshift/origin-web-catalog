import {MockDataService} from '../mockServices/mockData.service';
import IPromise = angular.IPromise;

export class DataManager {
  static $inject = ['MockDataService', 'DataService', '$window', '$q'];

  private mockDataService: MockDataService;
  private dataService: any;
  private $window: any;
  private $q : any;

  constructor(mockDataService: any, DataService: any, $window: any, $q: any) {
    this.mockDataService = mockDataService;
    this.dataService = DataService;
    this.$window = $window;
    this.$q = $q;
  };

  public getResource(resource: string) : IPromise<any> {
    let deferred = this.$q.defer();

    switch (resource) {
      case 'service-categories':
        // simulate async
        setTimeout(() => {
          deferred.resolve(this.mockDataService.getServiceCategories());
          console.log('Loaded Mock service-categories');
        }, 300);
        break;
      case 'services':
        if (this.$window.MOCK_SERVICES_DATA) {
          // simulate async
          setTimeout(() => {
            deferred.resolve(this.mockDataService.getServices());
            console.log('Loaded Mock Service Classes');
          }, 300);
        } else {
          this.dataService.list({
            group: 'servicecatalog.k8s.io',
            resource: 'serviceclasses'
          }, {}, (serviceclasses: any) => {
            deferred.resolve(serviceclasses.by("metadata.name"));
            console.log('DataServices loaded Service Classes');
          });
        }
        break;
      case 'rh-apps':
        // simulate async
        setTimeout(() => {
          deferred.resolve(this.mockDataService.getRedHatApplications());
          console.log('Loaded Mock RH Apps');
        }, 300);
        break;
    }

    return deferred.promise;
  }
}
