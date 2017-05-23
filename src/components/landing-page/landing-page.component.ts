import {LandingPageController} from './landing-page.controller';

export const landingPage: angular.IComponentOptions = {
  bindings: {
    baseProjectUrl: '@',
    onTemplateSelected: '&'
  },
  controller: LandingPageController,
  template: require('./landing-page.html'),
  transclude: {
    'landingsearch': 'landingsearch',
    'landingheader': 'landingheader',
    'landingbody': 'landingbody',
    'landingside': 'landingside'
  }
};
