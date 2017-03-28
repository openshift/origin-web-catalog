import {OrderServiceController} from './order-service.controller';

export const orderService: angular.IComponentOptions = {
  bindings: {
    serviceClass: '<',
    handleClose: '<'
  },
  controller: OrderServiceController,
  template: require('./order-service.html')
};
