import {CatalogParametersController} from './catalog-parameters.controller';

export const catalogParameters: angular.IComponentOptions = {
  bindings: {
    parameterSchema: '<',
    parameterFormDefinition: '<',
    isHorizontal: '<?',
    readOnly: '<?',
    hideValues: '<?',
    model: '='
  },
  controller: CatalogParametersController,
  template: require('./catalog-parameters.html')
};
