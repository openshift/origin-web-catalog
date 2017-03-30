import {OverlayPanelController} from './overlay-panel.controller';

export const overlayPanel: angular.IComponentOptions = {
  bindings: {
    showClose: '<',
    showPanel: '<',
    handleClose: '<',
    fullHeight: '<'
  },
  controller: OverlayPanelController,
  template: require('./overlay-panel.html'),
  transclude: true
};
