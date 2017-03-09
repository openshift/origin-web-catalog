import {OverlayPanelController} from './overlay-panel.controller';

export const overlayPanel: angular.IComponentOptions = {
  bindings: {
    showClose: '<',
    closeOnEmit: '@',
    handleClose: '<'
  },
  controller: OverlayPanelController,
  template: require('./overlay-panel.html'),
  transclude: true
};
