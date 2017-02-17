import {OrderServiceController} from './order-service.controller';

export const orderService: angular.IComponentOptions = {
  bindings: {
    service: '<'
  },
  controller: OrderServiceController,
  template: require('./order-service.html')
};
