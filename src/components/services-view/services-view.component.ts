import {ServicesViewController} from './services-view.controller';

export const servicesView: angular.IComponentOptions = {
  bindings: {
    sectionTitle: '@?',
    baseProjectUrl: '@',
    catalogItems: '<',
    servicePlans: '<',
    keywordFilter: '<?',
    onDeployImageSelected: '<',
    onFromFileSelected: '<',
    onCreateFromProject: '<',
  },
  controller: ServicesViewController,
  template: require('./services-view.html')
};
