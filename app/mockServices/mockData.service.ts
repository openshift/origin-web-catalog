import * as angular from 'angular';
import {servicesData} from './mockData/services';
import {imagesData} from './mockData/openshift-images';

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

    if (resource.resource === 'serviceclasses') {
      setTimeout(() => {
        deferred.resolve(new Data(angular.copy(servicesData)));
      }, 300);
    } else if (resource === 'imagestreams' && context.namespace === 'openshift') {
      setTimeout(() => {
        deferred.resolve(new Data(angular.copy(imagesData)));
      }, 300);
    }

    return deferred.promise;
  }
}
