import * as angular from 'angular';
import * as _ from 'lodash';

interface IBindingService {
  bindingResource: any;
  bindService(serviceInstance: any, application: any, serviceClass: any, parameters: any) : angular.IPromise < any >;
  getServiceClassForInstance(serviceInstance: any, serviceClasses: any) : any;
  isServiceBindable(serviceInstance: any, serviceClasses: any) : boolean;
}

export class BindingService implements IBindingService {
  public static $inject = ['$q', '$timeout'];

  public bindingResource = {
    group: 'servicecatalog.k8s.io',
    resource: 'serviceinstancecredentials'
  };

  private $q: any;
  private $timeout: any;

  constructor ($q: angular.IQService, $timeout: any) {
    this.$q = $q;
    this.$timeout = $timeout;
  }

  public getServiceClassForInstance (serviceInstance: any, serviceClasses: any) {
    let serviceClassName = _.get(serviceInstance, 'spec.serviceClassName');
    return _.get(serviceClasses, [serviceClassName]);
  }

  public bindService (serviceInstance: any, application: any, serviceClass: any, parameters: any): angular.IPromise < any > {
    let deferred = this.$q.defer();

    var data: any = {};

    this.$timeout(() => {
      deferred.resolve(data);
    }, 300);

    return deferred.promise;
  }

  public isServiceBindable(serviceInstance: any, serviceClasses: any) {
    let serviceClass: any = this.getServiceClassForInstance(serviceInstance, serviceClasses);
    if (!serviceClass) {
      return !!serviceInstance;
    }

    let planName = _.get(serviceInstance, 'spec.planName');
    let plan = _.find(serviceClass.plans, { name: planName });
    let planBindable = _.get(plan, 'bindable');
    if (planBindable === true) {
      return true;
    }

    if (planBindable === false) {
      return false;
    }

    return serviceClass.bindable;
  }
}
