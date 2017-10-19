import {UpdateServiceController} from './update-service.controller';

export const updateService: angular.IComponentOptions = {
  bindings: {
    displayName: '<',
    project: '<',
    baseProjectUrl: '@',
    serviceInstance: '<',
    serviceClass: '<',
    servicePlans: '<',
    handleClose: '<'
  },
  controller: UpdateServiceController,
  template: require('./update-service.html')
};
