import {SelectPlanController} from './select-plan.controller.ts';

export const selectPlan: angular.IComponentOptions = {
  bindings: {
    availablePlans: '<',  // array of the available plans
    selectedPlan: '=',
    onPlanSelect: '<'
  },
  controller: SelectPlanController,
  template: require('./selectPlan.html')
};
