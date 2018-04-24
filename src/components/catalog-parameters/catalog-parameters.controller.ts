import * as _ from 'lodash';
import * as angular from 'angular';

export class CatalogParametersController implements angular.IController {

  private static ALLOWED_FORM_INPUT_TYPES = {
    'fieldset': true,
    'text': true,
    'textarea': true,
    'password': true,
    'checkbox': true,
    'select': true,
    'file': true
  };

  public ctrl: any = this;

  public $onInit() {
    this.setupFileSchema();
    this.setupFormDefaults();
    this.ctrl.parameterForm = this.cloneParameterForm(this.ctrl.parameterFormDefinition) || ['*'];
    this.updateHiddenModel();
    this.setupReadonlySchema();
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    if ((onChangesObj.parameterFormDefinition && !onChangesObj.parameterFormDefinition.isFirstChange()) ||
        (onChangesObj.hideValues && !onChangesObj.hideValues.isFirstChange()) ||
        (onChangesObj.readOnly && !onChangesObj.readOnly.isFirstChange())) {
      // https://github.com/json-schema-form/angular-schema-form/blob/development/docs/index.md
      // If no form definition is supplied, show all fields in the schema using '*'.
      this.ctrl.parameterForm = this.cloneParameterForm(this.ctrl.parameterFormDefinition) || ['*'];
    }

    if (onChangesObj.isHorizontal && !onChangesObj.isHorizontal.isFirstChange()) {
      this.setupFormDefaults();
    }

    // This assumes the model does not change while hidden, or at least the structure doesn't.
    // Avoiding the expense of deep watching the model.
    if ((onChangesObj.hideValues && !onChangesObj.hideValues.isFirstChange()) ||
        (onChangesObj.model && !onChangesObj.model.isFirstChange())) {
      this.updateHiddenModel();
    }

    if ((onChangesObj.parameterSchema && !onChangesObj.parameterSchema.isFirstChange()) ||
      (onChangesObj.readOnly && !onChangesObj.readOnly.isFirstChange())) {
      this.setupReadonlySchema();
    }
  }

  private setupFileSchema() {
    // Find any parameters in the form definition that have a type of 'file'
    _.each(this.ctrl.parameterFormDefinition, (parameter: any) => {
      _.each(_.get(parameter, 'items'), (item: any, index: any) => {
        if (item.type === 'file') {
          // Need to set this to 'string' so the input type is also string (not file)
          // angular-schema-form-base64-file-upload add-on expects this.
          item.type = 'string';

          // angular-schema-form-base64-file-upload add-on expects:
          // * the type to be 'string'
          // * and a format field set to 'base64'
          // * a maxSize
          // https://github.com/Textalk/angular-schema-form-base64-file-upload#usage
          _.assign(_.get(this.ctrl.parameterSchema, ['properties', item.key]), {
            "type": "string",
            "format": "base64",
            "maxSize": '5242880' // 5MB
          });
        }
      });
    });
  }

  private setupFormDefaults() {
    this.ctrl.parameterFormDefaults = {
      formDefaults: {

        // Disable some feedback styles like check marks that we don't use in
        // the catalog.
        disableSuccessState: true,
        feedback: false
      },
      // Don't show errors for pristine fields so that required fields don't
      // show as errors when the form is first displayed.
      pristine: {
        errors: false,
        success: true
      }
    };
    if (this.ctrl.isHorizontal) {
      angular.extend(this.ctrl.parameterFormDefaults.formDefaults, {
        htmlClass: 'row',
        labelHtmlClass: 'col-sm-4',
        fieldWrapperHtmlClass: 'col-sm-8',
        checkboxLabelHtmlClass: 'col-sm-8 col-sm-offset-4',
        checkboxHelpHtmlClass: 'col-sm-8 col-sm-offset-4'
      });
    }
  }

  private setupReadonlySchema() {
    if (!this.ctrl.parameterSchema || !this.ctrl.readOnly) {
      return;
    }

    this.ctrl.readonlyParameterSchema = angular.copy(this.ctrl.parameterSchema);
    _.set(this.ctrl.readonlyParameterSchema, 'readonly', true);
    _.set(this.ctrl.readonlyParameterSchema, 'required', []);

    _.each(_.get(this.ctrl.readonlyParameterSchema, 'properties'), (property: any) => {
      this.updateReadonlyProperty(property);
    });
  }

  private updateReadonlyProperty(property: any) {

    if (property.title) {
      property.title = property.title + ":";
    }
    if (property.type === 'object') {
      _.each(_.get(property, 'properties'), (subProperty: any) => {
        this.updateReadonlyProperty(subProperty);
      });
    } else if (property.type === 'array') {
      this.updateReadonlyProperty(_.get(property, 'items'));
    } else {
      property.description = undefined;
      property.enum = undefined;
      if (property.type === 'array' || property.type === 'number' || property.type === 'integer' || property.type === 'boolean') {
        property.type = 'string';
      }
    }
  }

  private updateValueToHidden(value: any): any {
    if (_.isObject(value) || _.isArray(value)) {
      return _.mapValues(value, (subValue: any, key: any) => {
        if (_.includes(this.ctrl.opaqueKeys, key)) {
          return subValue;
        }
        return this.updateValueToHidden(subValue);
      });
    } else if (_.isArray(value)) {
      return _.map(value, (indexValue: any) => {
        return this.updateValueToHidden(indexValue);
      });
    } else {
      return '*****';
    }
  }

  private updateHiddenModel() {
    if (!this.ctrl.hideValues) {
      return;
    }

    this.ctrl.hiddenModel = _.mapValues(this.ctrl.model, (value: any, key: any) => {
      if (_.includes(this.ctrl.opaqueKeys, key)) {
        return value;
      }
      return this.updateValueToHidden(value);
    });
  }

  // clones a form definition with only the accepted keys (key, type, items)
  // and type values (fieldset, text, textarea, password, checkbox, select)
  private cloneParameterForm(original: any) {
    if (_.isString(original)) {
      if (this.ctrl.readOnly === true) {
        return {
          key: original,
          type: this.ctrl.hideValues ? 'password' : 'string'
        };
      } else {
        return original;
      }
    }

    if (_.isArray(original)) {
      return _.map(original, _.bind(this.cloneParameterForm, this));
    }

    if (_.isObject(original)) {
      let newObject: any = {};

      if (original.key) {
        newObject.key = original.key;
      }

      if (CatalogParametersController.ALLOWED_FORM_INPUT_TYPES[original.type]) {
        newObject.type = original.type;
      }

      if (newObject.type === 'fieldset' && _.isArray(original.items)) {
        if (original.title) {
          newObject.title = original.title;
        }
        newObject.items = this.cloneParameterForm(original.items);
      } else {
        //if empty/invalid, pass back null, not a truthy object
        if (!newObject.key && !newObject.type) {
          return null;
        } else if (this.ctrl.readOnly) {
          newObject.type = this.ctrl.hideValues ? 'password' : 'string';
        }
      }

      return newObject;
    }
  };
}
