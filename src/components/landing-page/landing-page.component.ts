import {LandingPageController} from './landing-page.controller';

export const landingPage: angular.IComponentOptions = {
  bindings: {
    searchPlaceholder: '@',
    doSearchFn: '<',
    searchButtonLabel: '@'
  },
  controller: LandingPageController,
  template: require('./landing-page.html'),
  transclude: {
    headerarea: 'headerarea',
    bodyarea: 'bodyarea',
    sidebar: 'sidebar',
  }
};
