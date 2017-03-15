import * as angular from 'angular';
import {servicesData} from './mockData/services';

interface IDataService {
  list(resource: any, context: any, callback: any, opts: any) : angular.IPromise < any >;
}

class Data {
  private _data: any;

  constructor (array: any) {
    this._data = array;
  }

  public by (attr: string) {
    return this._data;
  }
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
            deferred.resolve(new Data(servicesData));
          }, 300);
        break;
    }

    return deferred.promise;
  }
}
