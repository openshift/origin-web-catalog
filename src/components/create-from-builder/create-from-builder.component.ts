import {CreateFromBuilderController} from './create-from-builder.controller';

export const createFromBuilder: angular.IComponentOptions = {
  bindings: {
    baseProjectUrl: '@',
    imageStream: '<',
    handleClose: '<',
    addToProject: '<?'
  },
  controller: CreateFromBuilderController,
  template: require('./create-from-builder.html')
};

