import * as _ from 'lodash';

export class CatalogParametersController implements angular.IController {

  private static ALLOWED_FORM_INPUT_TYPES = {
    'fieldset': true,
    'text': true,
    'textarea': true,
    'password': true,
    'checkbox': true,
    'select': true
  };

  public ctrl: any = this;

  public $onInit() {
    // https://github.com/json-schema-form/angular-schema-form/blob/development/docs/index.md
    // If no form definition is supplied, show all fields in the schema using '*'.
    this.ctrl.parameterForm = this.cloneParameterForm(this.ctrl.parameterFormDefinition) || ['*'];
    this.ctrl.parameterFormDefaults = {
      formDefaults: {
        // Add Bootstrap horizontal form styles.
        // Commented out for now since we aren't using the horizontal forms currently.
        // labelHtmlClass: 'col-sm-4',
        // fieldWrapperHtmlClass: 'col-sm-8',
        // checkboxLabelHtmlClass: 'col-sm-8 col-sm-offset-4',
        // checkboxHelpHtmlClass: 'col-sm-8 col-sm-offset-4',

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
  }

  // clones a form definition with only the accepted keys (key, type, items)
  // and type values (fieldset, text, textarea, password, checkbox, select)
  private cloneParameterForm(original: any) {

    if (_.isString(original)) {
      return original;
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
      }

      //if empty/invalid, pass back null, not a truthy object
      if (!newObject.key && !newObject.type) {
        return null;
      }

      return newObject;
    }
  };
}
