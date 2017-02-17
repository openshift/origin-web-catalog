export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/services');

  $stateProvider
    .state('services', {
      url: '/services',
      component: 'servicespage'
    })
    .state('projects', {
      url: '/projects',
      component: 'projectspage'
    });
}
