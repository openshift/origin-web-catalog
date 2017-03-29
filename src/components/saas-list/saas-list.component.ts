import {SaasListController} from './saas-list.controller';

export const saasList: angular.IComponentOptions = {
  bindings: {
    saasTitle: '<?',
    saasOfferings: '<'
  },
  controller: SaasListController,
  template: require('./saas-list.html')
};
