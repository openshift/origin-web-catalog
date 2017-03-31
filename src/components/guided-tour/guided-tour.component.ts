import {GuidedTourController} from './guided-tour.controller';

export const guidedTour: angular.IComponentOptions = {
  bindings: {
    showTour: '<',
    tourConfig: '<',
    onTourEnd: '&'
  },
  controller: GuidedTourController,
  template: require('./guided-tour.html')
};
