import * as angular from 'angular';
import * as _ from 'lodash';

export class OrderServiceController implements angular.IController {

  static $inject = [
    '$scope',
    '$filter',
    'ApplicationsService',
    'ProjectsService',
    'DataService',
    'BindingService',
    'Logger',
    'Constants',
    'DNS1123_SUBDOMAIN_VALIDATION'
  ];

  public ctrl: any = this;
  public $scope: any;

  private $filter: any;
  private ProjectsService: any;
  private ApplicationsService: any;
  private DataService: any;
  private BindingService: any;
  private Logger: any;
  private watches: any[] = [];
  private infoStep: any;
  private planStep: any;
  private configStep: any;
  private bindStep: any;
  private bindParametersStep: any;
  private reviewStep: any;
  private selectedProjectWatch: any;
  private bindTypeWatch: any;
  private validityWatcher: any;
  private noProjectsCantCreateWatch: any;
  private DNS1123_SUBDOMAIN_VALIDATION: any;

  constructor($scope: any,
              $filter: any,
              ApplicationsService: any,
              ProjectsService: any,
              DataService: any,
              BindingService: any,
              Logger: any,
              Constants: any,
              DNS1123_SUBDOMAIN_VALIDATION: any) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.ApplicationsService = ApplicationsService;
    this.ProjectsService = ProjectsService;
    this.DataService = DataService;
    this.BindingService = BindingService;
    this.Logger = Logger;
    this.ctrl.showPodPresets = _.get(Constants, ['ENABLE_TECH_PREVIEW_FEATURE', 'pod_presets'], false);
    this.DNS1123_SUBDOMAIN_VALIDATION = DNS1123_SUBDOMAIN_VALIDATION;
  }

  public $onInit() {
    this.ctrl.iconClass = this.ctrl.serviceClass.iconClass || 'fa fa-clone';
    this.ctrl.imageUrl = this.ctrl.serviceClass.imageUrl;
    this.ctrl.serviceName = this.ctrl.serviceClass.name;
    this.ctrl.description = this.ctrl.serviceClass.description;
    this.ctrl.longDescription = this.ctrl.serviceClass.longDescription;
    this.ctrl.docUrl = _.get(this.ctrl.serviceClass, 'resource.spec.externalMetadata.documentationUrl');
    this.ctrl.supportUrl = _.get(this.ctrl.serviceClass, 'resource.spec.externalMetadata.supportUrl');

    // Ansible Service Broker adds a `dependencies` field to external metadata
    // that is an array of images names.
    let dependencies = _.get(this.ctrl.serviceClass, 'resource.spec.externalMetadata.dependencies');
    if (_.isArray(dependencies)) {
      // Take out any duplicates to avoid duplicates in a repeater error.
      this.ctrl.imageDependencies = _.uniq(_.filter(dependencies, _.isString));
    }

    this.ctrl.noProjectsCantCreate = false;
    this.ctrl.applications = [];
    this.ctrl.parameterData = {};
    this.ctrl.bindParameterData = {};
    this.ctrl.forms = {};

    this.ctrl.appToBind = null;
    this.ctrl.configStepValid = true;
    this.ctrl.multipleServicePlans = _.size(this.ctrl.servicePlans) > 1;

    this.infoStep = {
      id: 'info',
      label: 'Information',
      view: 'order-service/order-service-info.html',
      valid: true,
      allowed: true,
      hidden: false,
      allowClickNav: true,
      onShow: this.showInfo
    };
    this.planStep = {
      id: 'plans',
      label: 'Plan',
      view: 'order-service/order-service-plans.html',
      hidden: !this.ctrl.multipleServicePlans,
      allowed: true,
      valid: true,
      allowClickNav: true,
      onShow: this.showPlan
    };
    this.configStep = {
      label: 'Configuration',
      id: 'configure',
      view: 'order-service/order-service-configure.html',
      hidden: false,
      allowed: true,
      valid: false,
      allowClickNav: true,
      onShow: this.showConfig
    };
    this.bindStep = {
      label: 'Binding',
      id: 'bind',
      view: 'order-service/order-service-bind.html',
      hidden: false,
      allowed: false,
      valid: true,
      allowClickNav: true,
      onShow: this.showBind
    };
    this.bindParametersStep = {
      label: 'Parameters',
      id: 'bind-parameters',
      view: 'order-service/order-service-bind-parameters.html',
      hidden: false,
      allowed: false,
      valid: true,
      allowClickNav: true,
      onShow: this.showBindParameters
    };
    this.reviewStep = {
      label: 'Results',
      id: 'results',
      view: 'order-service/order-service-results.html',
      hidden: false,
      allowed: false,
      valid: true,
      prevEnabled: false,
      allowClickNav: false,
      onShow: this.showResults
    };

    this.ctrl.steps = [this.infoStep, this.planStep, this.configStep, this.bindStep, this.bindParametersStep, this.reviewStep];
    this.ctrl.nameTaken = false;
    this.ctrl.wizardDone = false;
    this.ctrl.bindType = "none";

    this.ctrl.orderedPlans = _.orderBy(this.ctrl.servicePlans, ['spec.externalMetadata.displayName', 'metadata.name']);

      // Preselect the first plan. If there's only one plan, skip the wizard step.
    this.selectPlan(_.head(this.ctrl.orderedPlans));

    // Set updating true initially so that the next button doesn't enable,
    // disable, then enable again immediately.  The onProjectUpdate callback
    // will set this back to false.
    this.ctrl.updating = true;
    this.selectedProjectWatch = this.$scope.$watch(
      () => {
        return this.ctrl.selectedProject;
      },
      this.onProjectUpdate
    );

    this.bindTypeWatch = this.$scope.$watch("$ctrl.bindType", (current: any, previous: any) => {
      if (current === previous) {
        return;
      }

      this.updateBindParametersStepVisibility();
      this.ctrl.nextTitle = this.bindParametersStep.hidden ? 'Create' : 'Next >';
      this.reviewStep.allowed = this.bindParametersStep.hidden && this.bindStep.valid;
    });

    this.noProjectsCantCreateWatch = this.$scope.$on('no-projects-cannot-create', () => {
      this.ctrl.noProjectsCantCreate = true;
    });
  }

  public clearValidityWatcher = () => {
    if (this.validityWatcher) {
      this.validityWatcher();
      this.validityWatcher = undefined;
    }
    this.ctrl.reviewStep.allowed = false;
  };

  public showInfo = () => {
    this.clearValidityWatcher();
    this.ctrl.configPageShown = false;
    this.ctrl.nextTitle = "Next >";
  };

  public showPlan = () => {
    this.clearValidityWatcher();
    this.ctrl.configPageShown = false;
    this.ctrl.nextTitle = "Next >";
  };

  public showConfig = () => {
    this.clearValidityWatcher();
    this.ctrl.configPageShown = true;
    this.reviewStep.allowed = this.bindStep.hidden && this.configStep.valid;
    this.updateBindability();

    this.validityWatcher = this.$scope.$watch("$ctrl.forms.orderConfigureForm.$valid", (isValid: any, lastValue: any) => {
      this.configStep.valid = isValid && !this.ctrl.noProjectsCantCreate;
      this.bindStep.allowed = this.configStep.valid;
      this.reviewStep.allowed = this.bindStep.hidden && this.configStep.valid;
    });
  };

  public showBind = () => {
    this.clearValidityWatcher();
    this.ctrl.configPageShown = false;
    this.ctrl.nextTitle = this.bindParametersStep.hidden ? 'Create' : 'Next >';
    this.reviewStep.allowed = this.bindParametersStep.hidden && this.bindStep.valid;

    if (this.isNewProject()) {
      this.ctrl.projectDisplayName = this.ctrl.selectedProject.metadata.annotations['new-display-name'] || this.ctrl.selectedProject.metadata.name;
    } else {
      this.ctrl.projectDisplayName = this.$filter('displayName')(this.ctrl.selectedProject);
    }

    this.validityWatcher = this.$scope.$watch("$ctrl.forms.bindForm.$valid", (isValid: any, lastValue: any) => {
      this.bindStep.valid = isValid;
      this.bindParametersStep.allowed = isValid;
      this.reviewStep.allowed = this.bindParametersStep.hidden && this.bindStep.valid;
    });
  };

  public showBindParameters = () => {
    this.clearValidityWatcher();
    this.ctrl.nextTitle = 'Create';
    this.validityWatcher = this.$scope.$watch("$ctrl.forms.bindParametersForm.$valid", (isValid: any, lastValue: any) => {
      this.bindParametersStep.valid = isValid;
      this.reviewStep.allowed = this.bindParametersStep.valid;
    });
  };

  public showResults = () => {
    this.clearValidityWatcher();
    this.ctrl.configPageShown = false;
    this.ctrl.nextTitle = "Close";
    this.ctrl.wizardDone = true;
    this.provisionService();
  };

  public selectPlan = (plan: any) => {
    this.ctrl.selectedPlan = plan;

    // Clear any previous parameter data since each plan has its own parameter schema.
    this.ctrl.parameterData = {};
    this.updateParameterSchema(plan);
    this.updateBindability();
  };

  public provisionService = () => {
    this.ctrl.inProgress = true;
    this.ctrl.orderComplete = false;
    this.ctrl.error = false;

    if (this.isNewProject()) {
      // the selectedProject is actually a newProject object
      let newProjName = this.ctrl.selectedProject.metadata.name;
      let newProjDisplayName = this.ctrl.selectedProject.metadata.annotations['new-display-name'];
      let newProjDesc = this.$filter('description')(this.ctrl.selectedProject);
      this.ProjectsService
        .create(newProjName, newProjDisplayName, newProjDesc)
        .then( (project: any) => {
          this.ctrl.selectedProject = project;
          this.ctrl.projectDisplayName = this.$filter('displayName')(project);
          this.createService();
        }, (result: any) => {
          this.ctrl.error = result.data;
        });
    } else {
      this.ctrl.projectDisplayName = this.$filter('displayName')(this.ctrl.selectedProject);
      this.createService();
    }
  };

  public createService() {
    let parameters = this.getParameters();
    let secretName: string = _.isEmpty(parameters) ? null : this.BindingService.generateSecretName(this.getExternalClusterServiceClassName() + '-parameters');
    let serviceInstance = this.makeServiceInstance(secretName);
    let resource = {
      group: 'servicecatalog.k8s.io',
      resource: 'serviceinstances'
    };
    let context = {
      namespace: this.ctrl.selectedProject.metadata.name
    };
    this.DataService.create(resource, null, serviceInstance, context).then((serviceInstance: any) => {
      this.ctrl.orderInProgress = true;
      this.watchResults(resource, serviceInstance, context);
      this.ctrl.serviceInstance = serviceInstance;

      // Create the parameters secret if necessary.
      if (secretName) {
        let secret = this.BindingService.makeParametersSecret(secretName, parameters, serviceInstance);
        this.DataService.create('secrets', null, secret, context).then(_.noop, (e: any) => {
          this.ctrl.error = _.get(e, 'data');
        });
      }

      if (this.ctrl.bindType !== 'none') {
        this.bindService();
      }
    }, (e: any) => {
      this.ctrl.error = _.get(e, 'data');
    });
  }

  public bindService() {
    this.ctrl.bindError = false;
    var context = {
      namespace: _.get(this.ctrl.selectedProject, 'metadata.name')
    };
    var application = this.ctrl.bindType === 'application' ? this.ctrl.appToBind : undefined;
    this.BindingService.bindService(this.ctrl.serviceInstance,
                                    application,
                                    this.ctrl.serviceClass.resource,
                                    this.ctrl.bindParameterData).then((binding: any) => {
      this.ctrl.binding = binding;

      this.watches.push(this.DataService.watchObject(this.BindingService.bindingResource, _.get(this.ctrl.binding, 'metadata.name'), context, (binding: any) => {
        this.ctrl.binding = binding;
      }));
    }, (e: any) => {
      this.ctrl.bindError = e;
    });
  }

  public $onDestroy() {
    this.DataService.unwatchAll(this.watches);
    this.selectedProjectWatch();
    this.noProjectsCantCreateWatch();
    this.bindTypeWatch();
    this.clearValidityWatcher();
  }

  public closePanel() {
    if (angular.isFunction(this.ctrl.handleClose)) {
      this.ctrl.handleClose();
    }
  }

  private updateBindability() {
    if (this.ctrl.wizardDone) {
      return;
    }

    // Check the plan's bindable value specifically, if not set, then use the value from the serviceClass
    var planBindable = _.get(this.ctrl.selectedPlan, "spec.bindable");

    if (planBindable === true) {
      this.bindStep.hidden = false;
    } else if (planBindable === false) {
      this.bindStep.hidden = true;
    } else {
      this.bindStep.hidden = !_.get(this.ctrl.serviceClass, "resource.spec.bindable");
    }

    this.updateBindParametersStepVisibility();

    if (this.ctrl.configPageShown) {
      this.reviewStep.allowed = this.bindStep.hidden;

      if (this.bindStep.hidden) {
        this.ctrl.nextTitle = "Create";
      } else {
        this.ctrl.nextTitle = "Next >";
      }
    }
  }

  private updateBindParametersStepVisibility() {
    // Show the bind parameters step if the bind step if not hidden and the plan has a bind parameter schema.
    this.bindParametersStep.hidden = this.bindStep.hidden ||
                                     this.ctrl.bindType === 'none' ||
                                     !_.has(this.ctrl, 'bindParameterSchema.properties');
    this.bindParametersStep.allowed = this.bindStep.valid;
  };

  private updateParameterSchema(plan: any) {
    this.ctrl.parameterSchema = _.get(plan, 'spec.instanceCreateParameterSchema');
    this.ctrl.parameterFormDefinition = _.get(this, 'ctrl.selectedPlan.spec.externalMetadata.schemas.service_instance.create.openshift_form_definition');
    this.ctrl.bindParameterSchema = _.get(plan, 'spec.serviceBindingCreateParameterSchema');
    this.ctrl.bindParameterFormDefinition = _.get(this, 'ctrl.selectedPlan.spec.externalMetadata.schemas.service_binding.create.openshift_form_definition');
  }

  private onProjectUpdate = () => {
    if (this.isNewProject()) {
      this.ctrl.applications = [];
      this.ctrl.updating = false;
      this.updateBindability();
    } else if (this.ctrl.showPodPresets) {
      this.ctrl.updating = true;

      this.ctrl.bindType = "none";
      this.ctrl.serviceToBind = this.ctrl.serviceClass;

      // Load all the "application" types
      var context = {
        namespace: _.get(this.ctrl.selectedProject, 'metadata.name')
      };
      this.ApplicationsService.getApplications(context).then((applications: any) => {
        this.ctrl.applications = applications;
        this.ctrl.updating = false;
        this.updateBindability();
      });
    }
  };

  private getParameters(): any {
    // Omit parameters values that are the empty string. These are always
    // optional parameters since you can't submit the form when it's missing
    // required values. The template broker will not generate values for
    // "generated" parameters that are there, even if the value is empty
    // string, which breaks many templates.
    //
    // Check specifically for the empty string rather than truthiness so that
    // we don't omit other values like `false` for boolean parameters.
    return _.omitBy(this.ctrl.parameterData, (parameterValue) => {
      return parameterValue === '';
    });
  }

  private getExternalClusterServiceClassName(): string {
    return _.get(this, 'ctrl.serviceClass.resource.spec.externalName') as string;
  };

  private makeServiceInstance(secretName: string) {
    let externalClusterServiceClassName = this.getExternalClusterServiceClassName();
    let serviceInstance: any = {
      kind: 'ServiceInstance',
      apiVersion: 'servicecatalog.k8s.io/v1beta1',
      metadata: {
        namespace: this.ctrl.selectedProject.metadata.name,
        generateName: externalClusterServiceClassName + '-'
       },
       spec: {
         externalClusterServiceClassName: externalClusterServiceClassName,
         externalClusterServicePlanName: this.ctrl.selectedPlan.spec.externalName
       }
    };

    if (secretName) {
      serviceInstance.spec.parametersFrom = [{
        secretKeyRef: {
          name: secretName,
          key: 'parameters'
        }
      }];
    }

    return serviceInstance;
  }

  private isNewProject(): boolean {
    return !this.ctrl.selectedProject || !_.has(this.ctrl.selectedProject, 'metadata.uid');
  }

  private watchResults = (resource: any, data: any, context: any) => {
    this.watches.push(this.DataService.watchObject(resource, data.metadata.name, context, (instanceData: any, action: any) => {
      var conditions: any = _.get(instanceData, 'status.conditions');
      var readyCondition: any = _.find(conditions, {type: 'Ready'});

      this.ctrl.orderComplete = readyCondition && readyCondition.status === 'True';
      this.ctrl.error = _.find(conditions, {type: 'Failed', status: 'True'});
    }));
  };
}
