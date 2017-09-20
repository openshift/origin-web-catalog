import {OrderServiceController} from './order-service.controller';

export const orderService: angular.IComponentOptions = {
  bindings: {
    baseProjectUrl: '@',
    serviceClass: '<',
    servicePlans: '<',
    handleClose: '<'
  },
  controller: OrderServiceController,
  template: require('./order-service.html')
};
