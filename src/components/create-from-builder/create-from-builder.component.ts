import {CreateFromBuilderController} from './create-from-builder.controller';

export const createFromBuilder: angular.IComponentOptions = {
  bindings: {
    imageStream: '<',
    handleClose: '<'
  },
  controller: CreateFromBuilderController,
  template: require('./create-from-builder.html')
};

