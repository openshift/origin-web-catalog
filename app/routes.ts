import {StateProvider, UrlRouterProvider} from '@uirouter/angularjs';
export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider, $locationProvider: angular.ILocationProvider) {
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
    .state('logout', {
      url: '/logout',
      component: 'logoutpage'
    })
    .state('error', {
      url: '/error',
      component: 'errorpage'
    });
}
