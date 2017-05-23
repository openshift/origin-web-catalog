interface IAPIService {
  apiInfo(rgv: any): any;
  kindToResource(kind: string, humanize: boolean): string;
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
}


