export class CatalogParametersController implements angular.IController {

  public ctrl: any = this;

  public $onInit() {
    // https://github.com/json-schema-form/angular-schema-form/blob/development/docs/index.md
    // Show all fields in the schema.
    this.ctrl.parameterForm = ['*'];
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
}
