import * as angular from 'angular';

interface IBindingService {
  bindingResource: any;
  bindService(context: any, serviceToBind: String, appToBind: String) : angular.IPromise < any >;
}

export class BindingService implements IBindingService {
  public static $inject = ['$q', '$timeout'];

  public bindingResource = {
    group: 'servicecatalog.k8s.io',
    resource: 'bindings'
  };

  private $q: any;
  private $timeout: any;

  constructor ($q: angular.IQService, $timeout: any) {
    this.$q = $q;
    this.$timeout = $timeout;
  }

  public bindService (context: any, serviceToBind: string, appToBind: String): angular.IPromise < any > {
    let deferred = this.$q.defer();

    var data: any = {};

    this.$timeout(() => {
      deferred.resolve(data);
    }, 300);

    return deferred.promise;
  }
}
