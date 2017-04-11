import {ProjectsSummaryController} from './projects-summary.controller';

export const projectsSummary: angular.IComponentOptions = {
  bindings: {
    baseProjectUrl: '@',
    catalogItems: '<',
    projectsUrl: '@',
    viewEditMembership: '&',
    startTour: '&'
  },
  controller: ProjectsSummaryController,
  template: require('./projects-summary.html')
};
