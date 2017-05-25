import * as angular from 'angular';
import {servicesData} from './mockData/services';
import {imagesData} from './mockData/openshift-images';
import {projectsData} from './mockData/projects';
import {deploymentConfigData} from './mockData/deploymentConfig';
import {replicationControllersData} from './mockData/replicationControllers';
import {deploymentsData} from './mockData/deployments';
import {replicaSetsData} from './mockData/replicaSets';
import {statefulSetsData} from './mockData/statefulSets';
import {instanceData} from './mockData/instances';

import * as _ from 'lodash';

interface IDataService {
  list(resource: any, context: any, callback: any, opts: any) : angular.IPromise < any >;
  delete(resource: any, name: any, context: any, opts: any) : angular.IPromise < any >;
  update(resource: any, name: any, object: any, context: any, opts: any) : angular.IPromise < any >;
  create(resource: any, name: any, object: any, context: any, opts: any) : angular.IPromise < any >;
  get(resource: any, name: any, context: any, opts: any) : angular.IPromise < any >;
  watch(resource: any, context: any, callback: any, opts: any) : any;
  unwatch(handle: any): any;
  unwatchAll(handles: any): any;
}

export class DataServiceData {
  private _data: any;

  constructor (array: any) {
    this._data = array;
  }

  public by (attr: string) {
    return this._data;
  }
}

export class DataService implements IDataService {
  public static $inject = ['$q', '$timeout', 'APIService'];

  private $q : any;
  private $timeout: any;
  private APIService: any;
  private watchCallbacksMap: any = {};


  constructor ($q: angular.IQService, $timeout: any, APIService: any) {
    this.$q = $q;
    this.APIService = APIService;
    this.$timeout = $timeout;
  }

  public list(resource: any, context: any, callback: any, opts: any) : angular.IPromise < any > {
    let deferred = this.$q.defer();
    if (callback) {
      deferred.promise.then(callback);
    }

    var data: any = this.getMockData(resource, context);

    this.$timeout(() => {
      deferred.resolve(data);
    }, 300);

    return deferred.promise;
  }

  public delete(resource: any, name: any, context: any, opts: any) : angular.IPromise < any > {
    let deferred = this.$q.defer();
    var data: any = this.getMockData(resource, context);

    _.remove(data.by(), function(nextData: any) {
      return nextData.metadata.name === name;
    });
    this.$timeout(() => {
      this.updateWatchers(resource, context);
      deferred.resolve();
    }, 300);

    return deferred.promise;
  }

  public update(resource: any, name: any, object: any, context: any, opts: any) {
    let deferred = this.$q.defer();

    var data: any = this.getMockData(resource, context);
    var editObject = _.find(data.by(), function(nextData: any) {
      return nextData.metadata.name === name;
    });

    if (angular.isDefined(editObject)) {
      angular.extend(editObject, object);
    }

    this.$timeout(() => {
      this.updateWatchers(resource, context);
      deferred.resolve(editObject);
    }, 300);

    return deferred.promise;
  }

  public create(resource: any, name: any, object: any, context: any, opts: any) {
    let deferred = this.$q.defer();
    var data: any = this.getMockData(resource, context);
    var updateDate: any = {
      "metadata": {
        "name": object.name || object.metadata.name,
        "creationTimestamp": new Date().getTime(),
        "uid": new Date().getTime(),
        "annotations": {
          "openshift.io/description": object.description,
          "openshift.io/display-name": object.displayName,
          "openshift.io/requester": "mock developer",
        },
      },
      "spec": {
        "finalizers": ["openshift.io/origin", "kubernetes"]
      },
      "status": {
       "phase": "Active"
      },
      "apiVersion": "v1"
    };
    angular.extend(object, updateDate);
    if (data) {
      let dupName: boolean = _.some(data._data, (dObj: any) => {
          return dObj.metadata.name === (object.name || object.metadata.name);
        });
      if (!dupName) {
        data.by().push(object);
        this.$timeout(() => {
          deferred.resolve(object);
          this.updateWatchers(resource, context);
        }, 300);
      } else {
        this.$timeout(() => {
          deferred.reject({data: {reason: 'AlreadyExists'}});
        }, 300);
      }
    } else {
      this.$timeout(() => {
        deferred.resolve(object);
        this.updateWatchers(resource, context);
      }, 300);
    }

    return deferred.promise;
  }

  public get(resource: any, name: any, context: any, opts: any) {
    let deferred = this.$q.defer();
    resource = this.normalizeResource(resource);

    this.$timeout(() => {
      deferred.resolve();
    }, 300);

    return deferred.promise;
  }

  public watch(resource: any, context: any, callback: any, opts: any) {
    resource = this.normalizeResource(resource);

    this.list(resource, context, callback, opts);
    if (callback) {
      this.watchCallbacks(resource).push(callback);
    }

    return {
      resource: resource,
      callback: callback
    };
  }

  public unwatch(handle: any) {
    var watchers: any = this.watchCallbacks(handle.resource);
    _.remove(watchers, function(nextWatcher: any) {
      return nextWatcher === handle.callback;
    });

  }

  public unwatchAll(handles: any) {
    angular.forEach(handles, (nextHandle) => {
      this.unwatch(nextHandle);
    });
  }

  private normalizeResource(resource:  any) {
    if (resource.resource) {
      resource = resource.resource;
    }

    if (resource === 'projectrequests') {
      resource = 'projects';
    }

    return resource;
  }

  private getMockData(resource: any, context: any): any {
    var returnData: any;

    resource = this.normalizeResource(resource);

    switch (resource) {
    case 'serviceclasses':
      returnData = new DataServiceData(servicesData);
      break;
    case 'projects':
      returnData = new DataServiceData(projectsData);
      break;
    case 'imagestreams':
      if (context.namespace === 'openshift') {
        returnData = new DataServiceData(angular.copy(imagesData));
      }
      break;
    case 'deploymentconfigs':
      returnData = new DataServiceData(deploymentConfigData);
      break;
    case 'replicationcontrollers':
      returnData = new DataServiceData(replicationControllersData);
      break;
    case 'deployments':
      returnData = new DataServiceData(deploymentsData);
      break;
    case 'replicasets':
      returnData = new DataServiceData(replicaSetsData);
      break;
    case 'statefulsets':
      returnData = new DataServiceData(statefulSetsData);
      break;
    case 'instances':
      returnData = new DataServiceData(instanceData);
      break;
    }

    return returnData;
  }

  private watchCallbacks(key: string) {
    key = this.normalizeResource(key);

    if (!this.watchCallbacksMap[key]) {
      this.watchCallbacksMap[key] = [];
    }
    return this.watchCallbacksMap[key];
  }

  private updateWatchers(resource: any, context: any) {
    resource = this.normalizeResource(resource);

    var data: any = this.getMockData(resource, context);

    angular.forEach(this.watchCallbacks(resource), function(cb: any) {
      cb(data);
    });
  }
}
