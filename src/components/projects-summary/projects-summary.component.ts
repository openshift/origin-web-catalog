import {ProjectsSummaryController} from './projects-summary.controller';

export const projectsSummary: angular.IComponentOptions = {
  bindings: {
    projectSelect: '&',
    showProjects: '&',
    startGettingStartedTour: '&'
  },
  controller: ProjectsSummaryController,
  template: require('./projects-summary.html')
};
