import {CatalogParametersController} from './catalog-parameters.controller';

export const catalogParameters: angular.IComponentOptions = {
  bindings: {
    parameterSchema: '<',
    model: '='
  },
  controller: CatalogParametersController,
  template: require('./catalog-parameters.html')
};
