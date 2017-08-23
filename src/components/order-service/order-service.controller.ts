import * as angular from 'angular';
import * as _ from 'lodash';

export class OrderServiceController implements angular.IController {

  static $inject = ['$scope', '$filter', 'AuthService', 'ProjectsService', 'DataService', 'BindingService', 'Logger', 'Constants'];

  static readonly REQUESTER_USERNAME_PARAM_NAME: string = 'template.openshift.io/requester-username';

  public ctrl: any = this;
  public $scope: any;

  private $filter: any;
  private ProjectsService: any;
  private AuthService: any;
  private DataService: any;
  private BindingService: any;
  private Logger: any;
  private watches: any[] = [];
  private planStep: any;
  private configStep: any;
  private bindStep: any;
  private reviewStep: any;
  private selectedProjectWatch: any;
  private deploymentConfigs: any;
  private deployments: any;
  private replicationControllers: any;
  private replicaSets: any;
  private statefulSets: any;
  private hasDeploymentFilter: any;
  private hasDeploymentConfigFilter: any;
  private validityWatcher: any;
  private user: any;

  // Special case for the template broker. We need to send the send the current
  // user as the requester-username parameter value, but hide it in the UI.
  // This parameter will eventually be removed when the service catalog sends
  // the current OpenShift user as part of the provision request.
  private sendRequesterUsername: boolean;

  constructor($scope: any, $filter: any, AuthService: any, ProjectsService: any, DataService: any, BindingService: any, Logger: any, Constants: any) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.AuthService = AuthService;
    this.ProjectsService = ProjectsService;
    this.DataService = DataService;
    this.BindingService = BindingService;
    this.Logger = Logger;
    this.hasDeploymentFilter = $filter('hasDeployment');
    this.hasDeploymentConfigFilter = $filter('hasDeploymentConfig');
    // Set to the true when the parameter schema has REQUESTER_USERNAME_PARAM_NAME.
    this.sendRequesterUsername = false;
    this.ctrl.showPodPresets = _.get(Constants, ['ENABLE_TECH_PREVIEW_FEATURE', 'pod_presets'], false);
  }

  public $onInit() {
    this.ctrl.iconClass = this.ctrl.serviceClass.iconClass || 'fa fa-clone';
    this.ctrl.imageUrl = this.ctrl.serviceClass.imageUrl;
    this.ctrl.serviceName = this.ctrl.serviceClass.name;
    this.ctrl.description = this.ctrl.serviceClass.description;
    this.ctrl.longDescription = this.ctrl.serviceClass.longDescription;
    this.ctrl.plans = _.get(this, 'ctrl.serviceClass.resource.plans', []);
    this.ctrl.applications = [];
    this.ctrl.parameterData = {};
    this.ctrl.forms = {};

    this.ctrl.appToBind = null;
    this.ctrl.configStepValid = true;

    this.planStep = {
      id: 'plans',
      label: 'Plan',
      view: 'order-service/order-service-plans.html',
      hidden: this.ctrl.plans.length < 2,
      allowed: true,
      valid: true,
      onShow: this.showPlan
    };
    this.configStep = {
      label: 'Configuration',
      id: 'configure',
      view: 'order-service/order-service-configure.html',
      hidden: false,
      allowed: true,
      valid: false,
      onShow: this.showConfig
    };
    this.bindStep = {
      label: 'Binding',
      id: 'bind',
      view: 'order-service/order-service-bind.html',
      hidden: false,
      allowed: false,
      valid: true,
      onShow: this.showBind
    };
    this.reviewStep = {
      label: 'Results',
      id: 'results',
      view: 'order-service/order-service-review.html',
      hidden: false,
      allowed: false,
      valid: true,
      prevEnabled: false,
      onShow: this.showResults
    };

    this.ctrl.steps = [this.planStep, this.configStep, this.bindStep, this.reviewStep];
    this.ctrl.nameTaken = false;
    this.ctrl.wizardDone = false;
    this.ctrl.bindType = "none";

    // Preselect the first plan. If there's only one plan, skip the wizard step.
    this.selectPlan(_.head(this.ctrl.plans));
    this.ctrl.planIndex = 0;

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

    this.AuthService.withUser().then((user) => {
      this.user = user;
      this.ctrl.wizardReady = true;
    });
  }

  public clearValidityWatcher = () => {
    if (this.validityWatcher) {
      this.validityWatcher();
      this.validityWatcher = undefined;
    }
    this.ctrl.reviewStep.allowed = false;
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
      this.configStep.valid = isValid;
      this.bindStep.allowed = this.configStep.valid;
      this.reviewStep.allowed = this.bindStep.hidden && this.configStep.valid;
    });
  };

  public showBind = () => {
    this.clearValidityWatcher();
    this.ctrl.configPageShown = false;
    this.ctrl.nextTitle = 'Create';
    this.reviewStep.allowed = this.bindStep.valid;

    if (this.isNewProject()) {
      this.ctrl.projectDisplayName = this.ctrl.selectedProject.metadata.annotations['new-display-name'] || this.ctrl.selectedProject.metadata.name;
    } else {
      this.ctrl.projectDisplayName = this.$filter('displayName')(this.ctrl.selectedProject);
    }

    this.validityWatcher = this.$scope.$watch("$ctrl.forms.bindForm.$valid", (isValid: any, lastValue: any) => {
      this.bindStep.valid = isValid;
      this.reviewStep.allowed = this.bindStep.valid;
    });
  };

  public showResults = () => {
    this.clearValidityWatcher();
    this.ctrl.configPageShown = false;
    this.ctrl.nextTitle = "Close";
    this.ctrl.wizardDone = true;
    this.provisionService();
  };

  public selectPlan(plan: any) {
    this.ctrl.selectedPlan = plan;
    // Clear any previous parameter data since each plan has its own parameter schema.
    this.ctrl.parameterData = {};
    this.updateParameterSchema(plan);
    this.updateBindability();
  }

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
    let serviceInstance = this.makeServiceInstance();
    let resource = {
      group: 'servicecatalog.k8s.io',
      resource: 'instances'
    };
    let context = {
      namespace: this.ctrl.selectedProject.metadata.name
    };
    this.DataService.create(resource, null, serviceInstance, context).then((data: any) => {
      this.ctrl.orderInProgress = true;
      this.watchResults(resource, data, context);
      this.ctrl.serviceInstance = data;
      if (this.ctrl.bindType !== 'none') {
        this.bindService();
      }
    }, (e: any) => {
      this.ctrl.error = _.get(e, 'data');
    });
  }

  public bindService() {
    this.ctrl.bindInProgress = true;
    this.ctrl.bindError = false;
    var context = {
      namespace: _.get(this.ctrl.selectedProject, 'metadata.name')
    };
    var application = this.ctrl.bindType === 'application' ? this.ctrl.appToBind : undefined;
    this.BindingService.bindService(this.ctrl.serviceInstance, application, this.ctrl.serviceClass.resource).then((binding: any) => {
      this.ctrl.binding = binding;
      this.ctrl.bindInProgress = false;
      this.ctrl.bindComplete = true;
      this.ctrl.bindError = null;

      this.watches.push(this.DataService.watchObject(this.BindingService.bindingResource, _.get(this.ctrl.binding, 'metadata.name'), context, (binding: any) => {
        this.ctrl.binding = binding;
      }));
    }, (e: any) => {
      this.ctrl.bindInProgress = false;
      this.ctrl.bindComplete = true;
      this.ctrl.bindError = e;
    });
  }

  public $onDestroy() {
    this.DataService.unwatchAll(this.watches);
    this.selectedProjectWatch();
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
    var planBindable = _.get(this.ctrl.selectedPlan, "bindable");

    if (planBindable === true) {
      this.bindStep.hidden = false;
    } else if (planBindable === false) {
      this.bindStep.hidden = true;
    } else {
      this.bindStep.hidden = !_.get(this.ctrl.serviceClass, "resource.bindable");
    }

    if (this.ctrl.configPageShown) {
      this.reviewStep.allowed = this.bindStep.hidden;

      if (this.bindStep.hidden) {
        this.ctrl.nextTitle = "Create";
      } else {
        this.ctrl.nextTitle = "Next >";
      }
    }
  }

  private updateParameterSchema(plan: any) {
    let schema: any = _.get(plan, 'alphaInstanceCreateParameterSchema');
    if (_.has(schema, ['properties', OrderServiceController.REQUESTER_USERNAME_PARAM_NAME])) {
      schema = angular.copy(schema);
      delete schema.properties[OrderServiceController.REQUESTER_USERNAME_PARAM_NAME];
      this.sendRequesterUsername = true;
    } else {
      this.sendRequesterUsername = false;
    }
    this.ctrl.parameterSchema = schema;
  }

  private onProjectUpdate = () => {
    if (this.isNewProject()) {
      this.ctrl.applications = [];
      this.ctrl.updating = false;
      this.updateBindability();
    } else {
      this.ctrl.updating = true;
      this.ProjectsService.get(this.ctrl.selectedProject.metadata.name).then(_.spread((project: any, context: any) => {

        this.ctrl.bindType = "none";
        this.ctrl.serviceToBind = this.ctrl.serviceClass;

        // Load all the "application" types
        this.DataService.list('deploymentconfigs', context).then((deploymentConfigData: any) => {
          this.deploymentConfigs = _.toArray(deploymentConfigData.by('metadata.name'));
          this.sortApplications();
        });
        this.DataService.list('replicationcontrollers', context).then((replicationControllerData: any) => {
          this.replicationControllers = _.reject(replicationControllerData.by('metadata.name'), this.hasDeploymentConfigFilter);
          this.sortApplications();
        });
        this.DataService.list({
          group: 'apps',
          resource: 'deployments'
        }, context).then((deploymentData: any) => {
          this.deployments = _.toArray(deploymentData.by('metadata.name'));
          this.sortApplications();
        });
        this.DataService.list({
          group: 'extensions',
          resource: 'replicasets'
        }, context).then((replicaSetData: any) => {
          this.replicaSets = _.reject(replicaSetData.by('metadata.name'), this.hasDeploymentFilter);
          this.sortApplications();
        });
        this.DataService.list({
          group: 'apps',
          resource: 'statefulsets'
        }, context).then((statefulSetData: any) => {
          this.statefulSets = _.toArray(statefulSetData.by('metadata.name'));
          this.sortApplications();
        });
      }));
    }
  };

  private sortApplications () {
    // Don't waste time sorting on each data load, just sort when we have them all
    if (this.deploymentConfigs && this.deployments && this.replicationControllers && this.replicaSets && this.statefulSets) {
      var apiObjects = this.deploymentConfigs.concat(this.deployments)
        .concat(this.replicationControllers)
        .concat(this.replicaSets)
        .concat(this.statefulSets);
      this.ctrl.applications = _.sortBy(apiObjects, ['metadata.name', 'kind']);
      this.ctrl.updating = false;
      this.updateBindability();
    }
  }

  private makeServiceInstance() {
    let serviceClassName = _.get(this, 'ctrl.serviceClass.resource.metadata.name');

    // Omit parameters values that are the empty string. These are always
    // optional parameters since you can't submit the form when it's missing
    // required values. The template broker will not generate values for
    // "generated" parameters that are there, even if the value is empty
    // string, which breaks many templates.
    //
    // Check specifically for the empty string rather than truthiness so that
    // we don't omit other values like `false` for boolean parameters.
    let parameters: any = _.omitBy(this.ctrl.parameterData, (parameterValue) => {
      return parameterValue === '';
    });

    // Send the requester-username if this is the template broker.
    if (this.sendRequesterUsername) {
      parameters[OrderServiceController.REQUESTER_USERNAME_PARAM_NAME] = this.user.metadata.name;
    }

    let serviceInstance = {
      kind: 'Instance',
      apiVersion: 'servicecatalog.k8s.io/v1alpha1',
      metadata: {
        namespace: this.ctrl.selectedProject.metadata.name,
        generateName: serviceClassName + '-'
       },
       spec: {
         serviceClassName: serviceClassName,
         planName: this.ctrl.selectedPlan.name,
         parameters: parameters
       }
    };

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
  }
}
