import * as _ from 'lodash';

interface IApplicationsService {
  getApplications(context: any): Promise<any>;
}

/** Backend service communications. */
export class ApplicationsService implements IApplicationsService {
  public static $inject = ['$filter', '$q', 'DataService'];

  private $filter: any;
  private $q: any;
  private DataService: any;

  constructor ($filter: any, $q: any, DataService: any) {
    this.$filter = $filter;
    this.$q = $q;
    this.DataService = DataService;
  }

  public getApplications(context: any): Promise<any> {
    var deferred: any = this.$q.defer();
    var promises: any = [];

    // Load all the "application" types
    promises.push(this.DataService.list('deploymentconfigs', context));
    promises.push(this.DataService.list('replicationcontrollers', context));
    promises.push(this.DataService.list({group: 'apps', resource: 'deployments'}, context));
    promises.push(this.DataService.list({group: 'extensions', resource: 'replicasets'}, context));
    promises.push(this.DataService.list({group: 'apps', resource: 'statefulsets'}, context));

    this.$q.all(promises).then(_.spread((deploymentConfigData: any, replicationControllerData: any, deploymentData: any, replicaSetData: any, statefulSetData: any) => {
      var deploymentConfigs: any = _.toArray(deploymentConfigData.by('metadata.name'));
      var replicationControllers: any = _.reject(replicationControllerData.by('metadata.name'), this.$filter('hasDeploymentConfig'));
      var deployments: any = _.toArray(deploymentData.by('metadata.name'));
      var replicaSets: any = _.reject(replicaSetData.by('metadata.name'), this.$filter('hasDeployment'));
      var statefulSets: any = _.toArray(statefulSetData.by('metadata.name'));

      var apiObjects: any = deploymentConfigs.concat(deployments)
        .concat(replicationControllers)
        .concat(replicaSets)
        .concat(statefulSets);
      deferred.resolve(_.sortBy(apiObjects, ['metadata.name', 'kind']));
    }), function(e: any) {
      deferred.reject(e);
    });

    return deferred.promise;
  }
}
