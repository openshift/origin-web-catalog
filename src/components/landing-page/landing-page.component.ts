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
    'landingheader': 'landingheader',
    'landingbody': 'landingbody',
    'landingside': 'landingside',
  }
};
