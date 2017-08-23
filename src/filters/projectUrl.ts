import * as _ from 'lodash';

export function projectUrlFilter () {

  return function(project: any, base: any) {
    var baseUrl: string = base || 'project/';
    var projectName : string;
    if (_.isString(project)) {
      projectName = project;
    } else {
      projectName = _.get(project, 'metadata.name', '');
    }

    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }

    return baseUrl + projectName;
  };
}
