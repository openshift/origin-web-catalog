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
    skipCanAddValidation: '<?',
    hideCreateProject: '<?',
    hideLabel: '<?',
    isRequired: '<?'
  },
  controller: SelectProjectController,
  template: require('./selectProject.html')
};
