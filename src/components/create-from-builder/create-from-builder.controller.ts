import * as angular from 'angular';
import * as _ from 'lodash';
import * as URI from 'urijs';

export class CreateFromBuilderController implements angular.IController {
  static $inject = [
    '$scope',
    '$filter',
    '$location',
    '$q',
    'BuilderAppService',
    'ProjectsService',
    'DataService',
    'APIService',
    'BindingService',
    'Logger',
    'Constants'];

  public ctrl: any = this;

  private $scope: ng.IScope;
  private $filter: any;
  private $location: ng.ILocationService;
  private $q: ng.IQService;
  private BuilderAppService: any;
  private ProjectsService: any;
  private DataService: any;
  private APIService: any;
  private BindingService: any;
  private Logger: any;
  private watches: any[] = [];
  private configStep: any;
  private bindStep: any;
  private instancesSupported: boolean;
  private reviewStep: any;
  private selectedProjectWatch: any;
  private validityWatcher: any;

  constructor($scope: ng.IScope,
              $filter: any,
              $location: ng.ILocationService,
              $q: ng.IQService,
              BuilderAppService: any,
              ProjectsService: any,
              DataService: any,
              APIService: any,
              BindingService: any,
              Logger: any,
              Constants: any) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.$location = $location;
    this.$q = $q;
    this.BuilderAppService = BuilderAppService;
    this.ProjectsService = ProjectsService;
    this.DataService = DataService;
    this.APIService = APIService;
    this.BindingService = BindingService;
    this.Logger = Logger;
    this.ctrl.serviceToBind = null;
    this.ctrl.showPodPresets = _.get(Constants, ['ENABLE_TECH_PREVIEW_FEATURE', 'pod_presets'], false);
  }

  public $onInit() {
    this.configStep = {
      label: 'Configuration',
      id: 'configure',
      view: 'create-from-builder/create-from-builder-configure.html',
      valid: false,
      allowed: true,
      hidden: false,
      onShow: this.showConfig
    };
    this.bindStep = {
      label: 'Binding',
      id: 'bind',
      view: 'create-from-builder/create-from-builder-bind.html',
      valid: true,
      allowed: false,
      hidden: false,
      onShow: this.showBind
    };
    this.reviewStep = {
      label: 'Results',
      id: 'results',
      view: 'create-from-builder/create-from-builder-results.html',
      valid: true,
      allowed: false,
      hidden: false,
      prevEnabled: false,
      onShow: this.showResults
    };
    this.ctrl.steps = [this.configStep, this.bindStep, this.reviewStep];
    this.ctrl.versions = this.getVersions();
    this.ctrl.istag = _.head(this.ctrl.versions);
    this.ctrl.nameMaxLength = 24;
    this.ctrl.namePattern = /^[a-z]([-a-z0-9]*[a-z0-9])?$/;
    this.ctrl.repositoryPattern = /^[a-z][a-z0-9+.-@]*:(\/\/)?[0-9a-z_-]+/;
    this.ctrl.wizardDone = false;
    this.ctrl.serviceToBind = null;
    this.ctrl.updating = false;

    this.ctrl.serviceInstances = [];
    this.selectedProjectWatch = this.$scope.$watch(
      () => {
        return this.ctrl.selectedProject;
      },
      this.onProjectUpdate
    );
    this.getServiceClasses();
    this.instancesSupported = !!this.APIService.apiInfo({
      group: 'servicecatalog.k8s.io',
      resource: 'instances'
    });
  }

  public closePanel() {
    if (angular.isFunction(this.ctrl.handleClose)) {
      this.ctrl.handleClose();
    }
  }

  public $onDestroy() {
    this.DataService.unwatchAll(this.watches);
    this.selectedProjectWatch();
    this.clearValidityWatcher();
  }

  // TODO: Handle sample context dir and git ref
  public fillSampleRepo() {
    this.ctrl.repository = _.get(this, 'ctrl.istag.annotations.sampleRepo');
    // If there's no name already set, try to fill in a name from the last
    // segment of the repository.
    // TODO: Generalize name prefill to work for any git repo?
    if (!this.ctrl.name && this.ctrl.repository) {
      let name = this.ctrl.repository.substr(this.ctrl.repository.lastIndexOf('/') + 1);
      name = name.replace(/\.git$/, '');
      name = _.truncate(name, this.ctrl.nameMaxLength);
      name = _.kebabCase(name);

      // Make sure it's a valid name before setting it.
      if (this.ctrl.namePattern.test(name)) {
        this.ctrl.name = name;
      }
    }
  }

  public navigateToAdvancedForm() {
    let template = 'project/{project}/create/fromimage?' +
      'imageStream={imageStream}&' +
      'imageTag={imageTag}&' +
      'namespace={namespace}&' +
      'displayName={displayName}&' +
      'name={name}&' +
      'sourceURI={sourceURI}&' +
      'advanced=true';
    let target = URI.expand(template, {
      project: this.ctrl.selectedProject.metadata.name,
      imageStream: this.ctrl.imageStream.resource.metadata.name,
      imageTag: this.ctrl.istag.name,
      namespace: this.ctrl.imageStream.resource.metadata.namespace,
      displayName: this.ctrl.imageStream.name,
      name: this.ctrl.name || '',
      sourceURI: this.ctrl.repository || ''
    }).toString();

    // TODO: Handle configurable base URLs.
    // let base = 'https://localhost:9000/dev-console/';
    // if (base) {
    //   window.location.href = base + target;
    //   return;
    // }

    this.$location.url(target);
  }

  private clearValidityWatcher = () => {
    if (this.validityWatcher) {
      this.validityWatcher();
      this.validityWatcher = undefined;
    }
  };

  private showConfig = () => {
    this.clearValidityWatcher();
    this.ctrl.nextTitle = 'Next >';
    this.reviewStep.allowed = this.bindStep.hidden && this.configStep.valid;

    this.validityWatcher = this.$scope.$watch("$ctrl.builderForm.$valid", (isValid: any, lastValue: any) => {
      this.configStep.valid = isValid;
    });
  };

  private showBind = () => {
    this.clearValidityWatcher();
    this.ctrl.nextTitle = 'Create';
    this.reviewStep.allowed = true;
  };

  private showResults = () => {
    this.clearValidityWatcher();
    this.ctrl.nextTitle = 'Close';
    this.ctrl.wizardDone = true;

    this.createApp();
  };

  private referencesSameImageStream(specTag: any) {
    return specTag.from &&
      specTag.from.kind === 'ImageStreamTag' &&
      specTag.from.name.indexOf(':') === -1 &&
      !specTag.from.namespace;
  }

  private getVersions() {
    this.ctrl.referencedBy = {};

    let references = {};
    let builderTagsByName = {};
    let specTags = _.get(this, 'ctrl.imageStream.resource.spec.tags', []);
    _.each(specTags, (specTag: any) => {
      if (this.referencesSameImageStream(specTag)) {
        references[specTag.name] = specTag.from.name;
        this.ctrl.referencedBy[specTag.from.name] = this.ctrl.referencedBy[specTag.from.name] || [];
        this.ctrl.referencedBy[specTag.from.name].push(specTag.name);
        return;
      }

      // Check for `builder` and `hidden` tags.
      let tagString = _.get(specTag, 'annotations.tags', '');
      let tags = tagString.split(/\s*,\s*/);
      if (_.includes(tags, 'builder') && !_.includes(tags, 'hidden')) {
        builderTagsByName[specTag.name] = specTag;
      }
    });

    // Make sure status tags exist for the versions we show. Keep the status
    // tag ordering from the server, which uses semver.
    let versions = [];
    let statusTags = _.get(this, 'ctrl.imageStream.resource.status.tags', []);
    _.each(statusTags, (statusTag: any) => {
      let builder = builderTagsByName[statusTag.tag];
      if (builder) {
        versions.push(builder);
      }
    });

    return versions;
  }

  private getImageStreamTag() {
    let name = this.ctrl.imageStream.resource.metadata.name + ":" + this.ctrl.istag.name;
    return this.DataService.get("imagestreamtags", name, { namespace: 'openshift' });
  }

  private sortServiceInstances() {
    if (this.ctrl.serviceInstances) {
      var instances = _.toArray(this.ctrl.serviceInstances);
      var statusCondition: any = this.$filter('statusCondition');

      instances.sort(function(left: any, right: any) {
        var leftReady: boolean = _.get(statusCondition(left, 'Ready'), 'status') === 'True';
        var rightReady: boolean = _.get(statusCondition(right, 'Ready'), 'status') === 'True';

        if (leftReady === rightReady) {
          var leftCreated: any = _.get(left, 'metadata.creationTimestamp');
          var rightCreated: any = _.get(right, 'metadata.creationTimestamp');
          return  rightCreated.localeCompare(leftCreated);
        } else {
          return leftReady ? -1 : 1;
        }
      });
      this.ctrl.serviceInstances = instances;
    }
  };

  private updateBindability() {
    if (this.ctrl.wizardDone) {
      return;
    }
    this.bindStep.hidden = _.size(this.ctrl.serviceInstances) < 1;
    this.ctrl.serviceToBind = null;
    if (this.bindStep.hidden) {
      this.ctrl.nextTitle = "Create";
    } else {
      this.ctrl.nextTitle = "Next >";
    }
  }

  private onProjectUpdate = () => {
    if (!this.instancesSupported || this.isNewProject()) {
      this.ctrl.serviceInstances = [];
      this.updateBindability();
    } else {
      this.ctrl.updating = true;
      this.DataService.list({
        group: 'servicecatalog.k8s.io',
        resource: 'instances'
      }, {
        namespace: this.ctrl.selectedProject.metadata.name
      }, null, {
        errorNotification: false
      }).then((serviceInstances: any) => {
        this.ctrl.serviceInstances = _.filter(_.toArray(serviceInstances.by('metadata.name')), this.isServiceBindable);
        this.sortServiceInstances();
        this.ctrl.updating = false;
        this.updateBindability();
      }, (result) => {
        this.Logger.warn('Failed to list instances in namespace ' + this.ctrl.selectedProject.metadata.name, result);
        this.ctrl.updating = false;
        this.ctrl.serviceInstances = [];
        this.updateBindability();
      });
    }
  };

  private isNewProject() {
    return !_.has(this.ctrl.selectedProject, 'metadata.uid');
  }

  private isServiceBindable = (serviceInstance: any) => {
    return this.BindingService.isServiceBindable(serviceInstance, this.ctrl.serviceClasses);
  };

  private createApp() {
    this.createProjectIfNecessary().then((project: any) => {
      this.ctrl.selectedProject = project;
      // Get the image stream tag so we know what ports are exposed by the image.
      this.getImageStreamTag().then((imageStreamTag: any) => {
        let apiObjects = this.BuilderAppService.makeAPIObjects({
          name: this.ctrl.name,
          repository: this.ctrl.repository,
          namespace: this.ctrl.selectedProject.metadata.name,
          imageStreamTag: imageStreamTag
        });
        this.createAPIObjects(apiObjects);
        if (this.ctrl.serviceToBind) {
          this.bindService(_.find(apiObjects, {kind: "DeploymentConfig"}));
        }
      }, (e: any) => {
        this.ctrl.error = e;
      });
    }, (result) => {
      this.ctrl.error = result;
    });
  };

  private createProjectIfNecessary() {
    if (!this.isNewProject()) {
      return this.$q.when(this.ctrl.selectedProject);
    }

    // TODO: Common code from this controller and order service.
    let newProjName = this.ctrl.selectedProject.metadata.name;
    let newProjDisplayName = this.ctrl.selectedProject.metadata.annotations['new-display-name'];
    let newProjDesc = this.$filter('description')(this.ctrl.selectedProject);
    let projReqObj: any = {
      apiVersion: "v1",
      kind: "ProjectRequest",
      metadata: {
        name: newProjName
      },
      displayName: newProjDisplayName,
      description: newProjDesc
    };
    return this.DataService.create('projectrequests', null, projReqObj, this.$scope);
  }

  private createAPIObjects(apiObjects: any[]) {
    this.DataService.batch(apiObjects, {
      namespace: this.ctrl.selectedProject.metadata.name
    }).then((result) => {
      if (result.failure.length) {
        this.ctrl.error = result;
      } else {
        this.ctrl.success = true;
      }
    }, (e) => {
      this.ctrl.error = e;
    });
  }

  private bindService(application: any) {
    this.ctrl.bindInProgress = true;
    this.ctrl.bindError = false;
    let context = {
      namespace: _.get(this.ctrl.selectedProject, 'metadata.name')
    };
    let serviceClass = this.BindingService.getServiceClassForInstance(this.ctrl.serviceToBind, this.ctrl.serviceClasses);
    this.BindingService.bindService(this.ctrl.serviceToBind, application, serviceClass).then((binding: any) => {
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

  private getServiceClasses() {
    // Only request service classes if the kind is available.
    let serviceClassResourceGroup = {
      group: 'servicecatalog.k8s.io',
      resource: 'serviceclasses'
    };
    if (this.APIService.apiInfo(serviceClassResourceGroup)) {
      this.ctrl.updating = false;
      this.DataService.list(serviceClassResourceGroup, {}).then( (resources: any) => {
        this.ctrl.serviceClasses = resources.by("metadata.name");
      }).finally(() => {
        this.ctrl.updating = false;
      });
    }
  }

}
