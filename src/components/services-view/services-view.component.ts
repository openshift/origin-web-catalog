import {ServicesViewController} from './services-view.controller';

export const servicesView: angular.IComponentOptions = {
  bindings: {
    services: '<'
  },
  controller: ServicesViewController,
  template: require('./services-view.html')
};
