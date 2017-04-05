import {ProjectsSummaryController} from './projects-summary.controller';

export const projectsSummary: angular.IComponentOptions = {
  bindings: {
    baseProjectUrl: '@',
    projectsUrl: '@',
    viewEditMembership: '&',
    startGettingStartedTour: '&'
  },
  controller: ProjectsSummaryController,
  template: require('./projects-summary.html')
};
