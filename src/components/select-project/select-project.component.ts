import {SelectProjectController} from './select-project.controller.ts';

export const selectProject: angular.IComponentOptions = {
  bindings: {
    selectedProject: '=?',
    preselectProjectName: '@?',
    nameTaken: '<',
    onProjectSelected: '<?',
    onOpen: '<?',
    availableProjects: '<?',
    showDivider: '<?',
    hideCreateProject: '<?',
    hideLabel: '<?'
  },
  controller: SelectProjectController,
  template: require('./selectProject.html')
};
