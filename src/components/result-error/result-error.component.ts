
export const resultError: angular.IComponentOptions = {
  bindings: {
    error: '=',
    actionType: '@',
    serviceName: '=',
    projectName: '='
  },
  template: require('./result-error.html'),
};
