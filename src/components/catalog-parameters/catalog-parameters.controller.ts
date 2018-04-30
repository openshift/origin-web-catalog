import * as _ from 'lodash';
import * as angular from 'angular';

export class CatalogParametersController implements angular.IController {

  private static ALLOWED_FORM_INPUT_TYPES = {
    'fieldset': true,
    'text': true,
    'textarea': true,
    'password': true,
    'checkbox': true,
    'select': true
  };

  private static CONDITIONS = {
    oneOf: " || ",
    fieldEqual: _.template('model["${key}"] === ${test}'),
    fieldTruthy: _.template('model["${key}"]')
  };

  public ctrl: any = this;

  public $onInit() {
    this.setupFormDefaults();
    this.ctrl.parameterForm = this.cloneParameterForm(this.ctrl.parameterFormDefinition) || ['*'];
    this.setupFormDependencies();
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

  private setupFormDependencies() {
    _.each(_.get(this.ctrl.parameterSchema, 'dependencies'), (dependency: any, key: string) => {
      if (_.isArray(dependency.oneOf)) {
        // Only support 'oneOf' at this time, not 'allOf' or 'anyOf'
        // See https://github.com/mozilla-services/react-jsonschema-form#dynamic for example 'dependencies' object
        _.each(dependency.oneOf, (schema) => {
          this.mapDependencyCondition(schema, key);
        });
      } else {
        // simple nested dependency
        this.mapDependencyCondition(dependency, key);
      }
    });
  }

  private mapDependencyCondition(schema, key) {
    // Get the fields to show if the dependency is valid
    const requiredFields = _.get(schema, 'required');
    if (!_.isArray(requiredFields)) {
      return;
    }
    _.each(requiredFields, (requiredField: any) => {
      let fieldIndex = _.findIndex(this.ctrl.parameterForm, (field: any) => {
        if (_.isObject(field)) {
          return requiredField === field.key;
        } else {
          return requiredField === field;
        }
      });

      // Only continue if the field is in the form defintion
      if (fieldIndex > -1) {
        // Normalise the field object
        let field = this.ctrl.parameterForm[fieldIndex];
        if (_.isString(field)) {
          field = {
            key: field
          };
        }

        // Check if the required field is already in the schema properties.
        // Add it if not.
        if (!_.has(this.ctrl.parameterSchema, ['properties', field.key])) {
          this.ctrl.parameterSchema.properties[field.key] = schema.properties[field.key];
        }

        // Set the angular 'condition'
        const enumMatches = _.get(schema, ['properties', key, 'enum']);
        if (!enumMatches) {
          // Nothing specific to match against, just add a truthy condition
          field.condition = CatalogParametersController.CONDITIONS.fieldTruthy({
            key: key
          });
        } else if (enumMatches.length > 0) {
          field.condition = CatalogParametersController.CONDITIONS.fieldEqual({
            key: key,
            test: JSON.stringify(enumMatches[0])
          });
          // Allow matching with any other strings in the array (if there are multiple)
          for (let oi=1, ol=enumMatches.length; oi<ol; oi++) {
            field.condition += CatalogParametersController.CONDITIONS.oneOf + CatalogParametersController.CONDITIONS.fieldEqual({
              key: key,
              test: JSON.stringify(enumMatches[oi])
            });
          }
        }
        this.ctrl.parameterForm.splice(fieldIndex, 1, field);
      }
    });
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
