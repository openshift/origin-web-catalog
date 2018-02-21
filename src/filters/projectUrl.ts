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

    // Make sure to use `/overview` so that the wizard doesn't trigger a route
    // change after "Continue to overview" is clicked when already on the
    // overview. This causes flicker and a page reload.
    return baseUrl + projectName + '/overview';
  };
}
