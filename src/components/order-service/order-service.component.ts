import {OrderServiceController} from './order-service.controller';

export const orderService: angular.IComponentOptions = {
  bindings: {
    baseProjectUrl: '@',
    serviceClass: '<',
    servicePlans: '<',
    handleClose: '<',
    addToProject: '<?'

  },
  controller: OrderServiceController,
  template: require('./order-service.html')
};
