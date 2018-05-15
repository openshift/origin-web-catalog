import * as angular from 'angular';
import * as _ from 'lodash';

export class UpdateServiceController implements angular.IController {

  static $inject = [
    '$scope',
    '$filter',
    '$q',
    'APIService',
    'BindingService',
    'DataService',
    'Logger',
    'SecretsService'
  ];

  public ctrl: any = this;
  public $scope: any;

  private $filter: any;
  private $q: any;
  private APIService: any;
  private BindingService: any;
  private DataService: any;
  private SecretsService: any;
  private Logger: any;
  private planStep: any;
  private configStep: any;
  private reviewStep: any;
  private validityWatcher: any;
  private dataWatcher: any;
  private progressWatcher: any;
  private origParameterData: any;
  private originalParameters: any;
  private configChanged: boolean = true;
  private originalPlan: any;
  private context: any;
  private secrets: any = [];

  constructor($scope: any,
              $filter: any,
              $q: any,
              APIService: any,
              BindingService: any,
              DataService: any,
              Logger: any,
              SecretsService: any) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.$q = $q;
    this.APIService = APIService;
    this.BindingService = BindingService;
    this.DataService = DataService;
    this.Logger = Logger;
    this.SecretsService = SecretsService;
  }

  public $onInit() {
    this.ctrl.parameterData = {};
    this.ctrl.forms = {};
    this.ctrl.configStepValid = true;
    this.ctrl.wizardDone = false;
    this.ctrl.orderComplete = false;
    this.ctrl.error = null;

    this.planStep = {
      id: 'plans',
      label: 'Plan',
      view: 'update-service/update-service-plans.html',
      hidden: !_.get(this.ctrl.serviceClass, 'spec.planUpdatable', false) || _.size(this.ctrl.servicePlans) < 2,
      allowed: true,
      valid: true,
      allowClickNav: true,
      onShow: this.showPlan
    };
    this.configStep = {
      label: 'Configuration',
      id: 'configure',
      view: 'update-service/update-service-configure.html',
      hidden: false,
      allowed: true,
      valid: false,
      allowClickNav: true,
      onShow: this.showConfig
    };
    this.reviewStep = {
      label: 'Results',
      id: 'results',
      view: 'update-service/update-service-results.html',
      hidden: false,
      allowed: false,
      valid: true,
      prevEnabled: false,
      allowClickNav: false,
      onShow: this.showResults
    };

    this.ctrl.steps = [this.planStep, this.configStep, this.reviewStep];

    this.ctrl.orderedPlans = _.orderBy(this.ctrl.servicePlans, ['spec.externalMetadata.displayName', 'metadata.name']);

    this.configChanged = false;
    this.ctrl.displayName = this.$filter('serviceInstanceDisplayName')(this.ctrl.serviceInstance, this.ctrl.serviceClass);
    this.ctrl.serviceName = _.get(this.ctrl.serviceInstance, 'metadata.name');

    if (this.planStep.hidden) {
      this.ctrl.hideBackButton = true;
    }

    this.context = {
      namespace: _.get(this.ctrl.serviceInstance, 'metadata.namespace')
    };

    this.origParameterData = angular.copy(_.get(this.ctrl.serviceInstance, 'spec.parameters', {}));

    var promises: any = [];

    _.each(_.get(this.ctrl.serviceInstance, 'spec.parametersFrom'), (parametersSource) => {
      let secretsVersion = this.APIService.getPreferredVersion('secrets');
      var secretName = _.get(parametersSource, 'secretKeyRef.name');
      var secret = _.find(this.secrets, function(nextSecret: any) {
        return _.get(nextSecret, 'metadata.name') === secretName;
      });

      if (secret) {
        this.addParametersFromSecret(secret, parametersSource);
      } else {
        promises.push(this.DataService.get(secretsVersion, secretName, this.context).then((secret: any) => {
          this.addParametersFromSecret(secret, parametersSource);
          this.secrets.push(secret);
        }));
      }
    });

    this.$q.all(promises).then(() => {
      this.originalPlan = _.find(this.ctrl.orderedPlans, (orderedPlan: any) => {
        return _.get(orderedPlan, 'metadata.name') === _.get(this.ctrl.serviceInstance, 'spec.clusterServicePlanRef.name');
      });

      this.selectPlan(this.originalPlan);
    });
  };

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

    if (this.configStep.hidden) {
      this.ctrl.nextTitle = 'Update';
    } else {
      this.ctrl.nextTitle = "Next >";
    }
    this.planStep.valid =  (this.ctrl.selectedPlan !== this.originalPlan) || !this.configStep.hidden;
  };

  public showConfig = () => {
    this.clearValidityWatcher();
    this.ctrl.configPageShown = true;
    this.configStep.valid = _.get(this.ctrl, 'forms.orderConfigureForm.$valid') && this.configChanged;
    this.reviewStep.allowed = this.configStep.valid;

    this.validityWatcher = this.$scope.$watch("$ctrl.forms.orderConfigureForm.$valid", (isValid: any, lastValue: any) => {
      this.configStep.valid = isValid && this.configChanged;
      this.reviewStep.allowed = this.configStep.valid;
    });

    if (this.dataWatcher) {
      this.dataWatcher();
    }

    this.dataWatcher = this.$scope.$watch(() => {
      return this.ctrl.parameterData;
    }, () => {
      this.configChanged = !angular.equals(this.getParameters(this.ctrl.parameterData), this.origParameterData) || (this.ctrl.selectedPlan !== this.originalPlan);
      this.configStep.valid = _.get(this.ctrl, 'forms.orderConfigureForm.$valid') && this.configChanged;
    }, true);

    this.ctrl.nextTitle = 'Update';
  };

  public showResults = () => {
    this.clearValidityWatcher();
    this.ctrl.configPageShown = false;
    this.ctrl.nextTitle = "Close";
    this.ctrl.wizardDone = true;
    this.updateServiceConfig();
  };

  public selectPlan = (plan: any) => {
    this.ctrl.selectedPlan = plan;

    if (_.get(plan, 'metadata.name') === _.get(this.ctrl.serviceInstance, 'spec.clusterServicePlanRef.name')) {
      this.ctrl.parameterData = angular.copy(this.origParameterData);
    } else {
      // Clear any previous parameter data since each plan has its own parameter schema.
      this.ctrl.parameterData = {};
    }
    this.updateParameterSchema(plan);

    this.configChanged = !angular.equals(this.ctrl.parameterData, this.origParameterData) || (this.ctrl.selectedPlan !== this.originalPlan);
    this.configStep.valid = _.get(this.ctrl, 'forms.orderConfigureForm.$valid') && this.configChanged;
  };

  public updateServiceConfig = () => {
    this.ctrl.orderComplete = false;
    this.ctrl.error = null;

    let parameterData: any = this.getParameters(this.ctrl.parameterData);

    // Update the instance parameters
    let originalParameters: object = _.get(this.ctrl.serviceInstance, 'spec.parameters');
    // NOTE: should be string[][], but compiler doesn't handle this
    let originalKeys: any[] = _.map(originalParameters, (value: any, key: string) => {
      return [key];
    });
    let updateParameters: object = _.pick(parameterData, originalKeys);
    let newParameters: object = _.omit(parameterData, originalKeys);
    let updateInstance: object = angular.copy(this.ctrl.serviceInstance);

    this.updateServicePlanName(updateInstance);
    this.updateSpecParameters(updateInstance, updateParameters, originalParameters);

    let updatedSecretParameters: object = this.updateSecretParameters(updateInstance, newParameters);

    this.updateSecret(updateInstance, updatedSecretParameters).then(() => {
      this.updateServiceInstance(updateInstance);
    }, (e: any) => {
      this.ctrl.error = _.get(e, 'data');
    });
  };

  public $onDestroy() {
    this.clearValidityWatcher();
    if (this.dataWatcher) {
      this.dataWatcher();
    }
    if (this.progressWatcher) {
      this.DataService.unwatch(this.progressWatcher);
    }
  }

  public closePanel() {
    if (angular.isFunction(this.ctrl.handleClose)) {
      this.ctrl.handleClose();
    }
  }


  private updateServicePlanName(instance: object) {
    if (_.get(instance, 'spec.clusterServicePlanExternalName') !== _.get(this.ctrl.selectedPlan, 'spec.externalName')) {
      _.unset(instance, 'spec.clusterServicePlanRef');
      _.set(instance, 'spec.clusterServicePlanExternalName', _.get(this.ctrl.selectedPlan, 'spec.externalName'));
    }
  };

  private updateSpecParameters(instance: object, updateParameters: object, originalParameters: object) {
    if (!angular.equals(updateParameters, originalParameters)) {
      _.set(instance, 'spec.parameters', updateParameters);
    }
  };

  private updateSecretParameters(instance: object, newParameters: object) {
    let secretParams: any = {};
    // NOTE: this (and the original version) make the assumption we will have an array of one secret.
    _.each(this.secrets, (secret: any) => {
      var originalSecretParameters: object = JSON.parse(this.SecretsService.decodeSecretData(secret.data).parameters);
      _.assign(secretParams, originalSecretParameters, newParameters);
     });
    return secretParams;
  };

  private updateSecret(instance: any, updatedSecretParameters: object) {
    let secretName: string = _.get(_.head(instance.spec.parametersFrom), 'secretKeyRef.name');
    let secret: object = this.BindingService.makeParametersSecret(secretName, updatedSecretParameters, instance);
    let secretsVersion: object = this.APIService.getPreferredVersion('secrets');
    return this.DataService.update(secretsVersion, secretName, secret, this.context);
  };

  private updateParameterSchema(plan: any) {
    this.ctrl.parameterSchema = _.get(plan, 'spec.instanceUpdateParameterSchema');
    this.ctrl.parameterFormDefinition = _.get(plan, 'spec.externalMetadata.schemas.service_instance.update.openshift_form_definition');

    var updateProperties: any = _.get(this.ctrl.parameterSchema, 'properties');
    this.configStep.hidden = _.size(updateProperties) < 1;

    if (this.configStep.hidden) {
      this.ctrl.nextTitle = 'Update';
    } else {
      this.ctrl.nextTitle = "Next >";
    }
    this.planStep.valid =  (this.ctrl.selectedPlan !== this.originalPlan) || !this.configStep.hidden;
  }

  private getParameters(parameterData: any): any {
    // Omit parameters values that are the empty string. These are always
    // optional parameters since you can't submit the form when it's missing
    // required values. The template broker will not generate values for
    // "generated" parameters that are there, even if the value is empty
    // string, which breaks many templates.
    //
    // Check specifically for the empty string rather than truthiness so that
    // we don't omit other values like `false` for boolean parameters.
    return _.omitBy(parameterData, (parameterValue) => {
      return parameterValue === '';
    });
  }

  private addParametersFromSecret(secret: any, parametersSource: any) {
    try {
      var parametersKey: any = _.get(parametersSource, 'secretKeyRef.key');
      var secretParameters: any = JSON.parse(this.SecretsService.decodeSecretData(secret.data)[parametersKey]);

      angular.extend(this.origParameterData, secretParameters);
      this.originalParameters = this.getParameters(this.origParameterData);
    } catch (e) {
      this.Logger.warn('Unable to load parameters from secret ' + _.get(parametersSource, 'secretKeyRef.name'), e);
    }
  }

  private updateServiceInstance(updateInstance: any) {
    // Update the instance
    var serviceInstancesVersion: any = this.APIService.getPreferredVersion('serviceinstances');
    var isServiceInstanceReady = this.$filter('isServiceInstanceReady');
    var isServiceInstanceFailed = this.$filter('isServiceInstanceFailed');
    var serviceInstanceFailedMessage = this.$filter('serviceInstanceFailedMessage');

    // bump the update requests count to indicate we are updating
    updateInstance.spec.updateRequests = updateInstance.spec.updateRequests ? updateInstance.spec.updateRequests + 1 : 1;

    this.DataService.update(serviceInstancesVersion, _.get(this.ctrl.serviceInstance, 'metadata.name'), updateInstance, this.context).then(() => {
      this.progressWatcher = this.DataService.watchObject(serviceInstancesVersion, _.get(this.ctrl.serviceInstance, 'metadata.name'), this.context, (instance: any) => {
        this.ctrl.orderComplete = isServiceInstanceReady(instance);
        if (isServiceInstanceFailed(instance)) {
          this.ctrl.error = serviceInstanceFailedMessage(instance);
        }
      });
    }, (e: any) => {
      this.ctrl.error = _.get(e, 'data');
    });
  };
}
