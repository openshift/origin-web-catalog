import {SelectProjectController} from './select-project.controller.ts';

export const selectProject: angular.IComponentOptions = {
  bindings: {
    selectedProject: '=',
    nameTaken: '<'
  },
  controller: SelectProjectController,
  template: require('./selectProject.html')
};
