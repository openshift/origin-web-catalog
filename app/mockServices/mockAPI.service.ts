interface IAPIService {
  apiInfo(rgv: any): any;
  kindToResource(kind: string, humanize: boolean): string;
  getPreferredVersion(resource: string): any;
}

/** Backend service communications. */
export class APIService implements IAPIService {
  public static $inject = ['$filter'];

  private $filter : any;

  constructor ($filter: any) {
    this.$filter = $filter;
  }

  public apiInfo(rgv: any) {
    return {};
  }

  public kindToResource(kind: string, humanize: boolean) {
    if (!kind) {
      return "";
    }

    var resource = kind;
    if (humanize) {
      var humanizeKind = this.$filter("humanizeKind");
      resource = humanizeKind(resource);
    }

    resource = String(resource).toLowerCase();
    if (resource === 'endpoints' || resource === 'securitycontextconstraints') {
      // no-op, plural is the singular
    } else if (resource[resource.length - 1] === 's') {
      resource = resource + 'es';
    } else if (resource[resource.length - 1] === 'y') {
      resource = resource.substring(0, resource.length - 1) + 'ies';
    } else {
      resource = resource + 's';
    }

    return resource;
  }

  public getPreferredVersion(resource: string): any {
    let preferredVersions = {
        // Using the anticipated name for the resources, even though they aren't yet prefixed with `cluster`.
        // https://github.com/kubernetes-incubator/service-catalog/issues/1288
        clusterserviceclasses:            {group: 'servicecatalog.k8s.io',      resource: 'serviceclasses' },
        clusterserviceplans:              {group: 'servicecatalog.k8s.io',      resource: 'serviceplans' },
        imagestreams:                     {group: 'image.openshift.io',         version: 'v1',      resource: 'imagestreams' },
        // Using the anticipated name for this resource, even though it's not currently called servicebindings.
        servicebindings:                  {group: 'servicecatalog.k8s.io',      resource: 'serviceinstancecredentials' },
        serviceinstances:                 {group: 'servicecatalog.k8s.io',      resource: 'serviceinstances' },
        templates:                        {group: 'template.openshift.io',      verison: 'v1',      resource: 'templates' }
    };

    return preferredVersions[resource] || resource;
  }
}
