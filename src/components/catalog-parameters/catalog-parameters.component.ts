import {CatalogParametersController} from './catalog-parameters.controller';

export const catalogParameters: angular.IComponentOptions = {
  bindings: {
    parameterSchema: '<',
    parameterFormDefinition: '<',
    model: '='
  },
  controller: CatalogParametersController,
  template: require('./catalog-parameters.html')
};
