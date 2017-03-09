import {RHListController} from './rh-apps-list.controller.ts';

export const rhAppsList: angular.IComponentOptions = {
  bindings: {
    applications: '<'
  },
  controller: RHListController,
  template: require('./rh-apps-list.html')
};
