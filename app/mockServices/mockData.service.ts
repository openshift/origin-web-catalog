import * as angular from 'angular';
import {servicesData} from './mockData/services';

interface IDataService {
  list(resource: any, context: any, callback: any, opts: any) : angular.IPromise < any >;
}

export class DataService implements IDataService {
  public static $inject = ['$q'];

  private $q : any;

  constructor ($q: angular.IQService) {
    this.$q = $q;
  }

  public list (resource: any, context: any, callback: any, opts: any) : angular.IPromise < any > {
    let deferred = this.$q.defer();
    if (callback) {
      deferred.promise.then(callback);
    }

    switch (resource.resource) {
      case 'serviceclasses':
          setTimeout(() => {
            deferred.resolve(servicesData);
          }, 300);
        break;
    }

    return deferred.promise;
  }
}
