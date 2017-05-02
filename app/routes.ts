export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('oauth', {
      url: '/oauth',
      component: 'oauth'
    })
    .state('home', {
      url: '/home',
      component: 'homepage'
    })
    .state('services', {
      url: '/services',
      component: 'servicespage'
    })
    .state('logout', {
      url: '/logout',
      component: 'logoutpage'
    })
    .state('error', {
      url: '/error',
      component: 'errorpage'
    });
}
