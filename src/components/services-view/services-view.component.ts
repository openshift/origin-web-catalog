import {ServicesViewController} from './services-view.controller';

export const servicesView: angular.IComponentOptions = {
  bindings: {
    serviceClasses: '<',
    imageStreams: '<',
    selectedCatagory: '<',
    selectedSubCategory: '<'
  },
  controller: ServicesViewController,
  template: require('./services-view.html')
};
