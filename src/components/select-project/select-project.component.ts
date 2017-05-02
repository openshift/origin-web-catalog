import {SelectProjectController} from './select-project.controller.ts';

export const selectProject: angular.IComponentOptions = {
  bindings: {
    selectedProject: '=',
    nameTaken: '<',
    // Use stacked form styles instead of horizontal form styles (horizontal is default)
    stackedForm: '<'
  },
  controller: SelectProjectController,
  template: require('./selectProject.html')
};
