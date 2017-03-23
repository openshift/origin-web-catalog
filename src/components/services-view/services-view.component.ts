import {ServicesViewController} from './services-view.controller';

export const servicesView: angular.IComponentOptions = {
  bindings: {
    serviceClasses: '<',
    imageStreams: '<'
  },
  controller: ServicesViewController,
  template: require('./services-view.html')
};
