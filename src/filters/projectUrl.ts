export function projectUrlFilter () {

  return function(project: any, base: any) {
    var baseUrl: string = base || '';
    var projectName : string =  (project && project.metadata) ? project.metadata.name : '';

    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }

    return baseUrl + projectName;
  };
}
