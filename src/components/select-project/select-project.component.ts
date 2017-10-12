import {SelectProjectController} from './select-project.controller.ts';

export const selectProject: angular.IComponentOptions = {
  bindings: {
    selectedProject: '=',
    nameTaken: '<',
    onProjectSelected: '<',
    availableProjects: '<',
    showDivider: '<?'
  },
  controller: SelectProjectController,
  template: require('./selectProject.html')
};
