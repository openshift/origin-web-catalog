import {ServicesViewController} from './services-view.controller';

export const servicesView: angular.IComponentOptions = {
  bindings: {
    services: '<',
    categories: '<'
  },
  controller: ServicesViewController,
  template: require('./services-view.html')
};
