import * as angular from 'angular';
import * as _ from 'lodash';
import * as URI from 'urijs';

export class CreateFromBuilderController implements angular.IController {
  static $inject = [
    '$filter',
    '$location',
    '$q',
    '$scope',
    'APIService',
    'BindingService',
    'BuilderAppService',
    'Constants',
    'DataService',
    'Logger',
    'ProjectsService',
    'VersionsService'];
  public ctrl: any = this;

  private $filter: any;
  private $location: ng.ILocationService;
  private $q: ng.IQService;
  private $scope: ng.IScope;
  private APIService: any;
  private BindingService: any;
  private BuilderAppService: any;
  private DataService: any;
  private Logger: any;
  private ProjectsService: any;
  private VersionsService: any;
  private watches: any[] = [];
  private infoStep: any;
  private configStep: any;
  private bindStep: any;
  private instancesSupported: boolean;
  private reviewStep: any;
  private selectedProjectWatch: any;
  private noProjectsCantCreateWatch: any;
  private validityWatcher: any;
  private gitRef: string;
  private contextDir: string;

  constructor($filter: any,
              $location: ng.ILocationService,
              $q: ng.IQService,
              $scope: ng.IScope,
              APIService: any,
              BindingService: any,
              BuilderAppService: any,
              Constants: any,
              DataService: any,
              Logger: any,
              ProjectsService: any,
              VersionsService: any) {
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
    this.VersionsService = VersionsService;
    this.ctrl.serviceToBind = null;
    this.ctrl.showPodPresets = _.get(Constants, ['ENABLE_TECH_PREVIEW_FEATURE', 'pod_presets'], false);
    this.gitRef = '';
    this.contextDir = '';
  }

  public $onInit() {
    this.ctrl.selectedProject = this.ctrl.addToProject;

    this.infoStep = {
      label: 'Information',
      id: 'info',
      view: 'create-from-builder/create-from-builder-info.html',
      valid: true,
      allowed: true,
      hidden: false,
      allowClickNav: true,
      onShow: this.showInfo
    };
    this.configStep = {
      label: 'Configuration',
      id: 'configure',
      view: 'create-from-builder/create-from-builder-configure.html',
      valid: false,
      allowed: true,
      hidden: false,
      allowClickNav: true,
      onShow: this.showConfig,
      focusSelectors: ['#builderSelectProject .ui-select-focusser', '#builderSelectProject #name.form-control', '#builderSelectVersion']
    };
    this.bindStep = {
      label: 'Binding',
      id: 'bind',
      view: 'create-from-builder/create-from-builder-bind.html',
      valid: true,
      allowed: false,
      hidden: !this.ctrl.showPodPresets,
      allowClickNav: true,
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
      allowClickNav: false,
      onShow: this.showResults
    };
    this.ctrl.steps = [this.infoStep, this.configStep, this.bindStep, this.reviewStep];
    this.ctrl.currentStep = "Information";
    this.ctrl.versions = this.getVersions();
    this.ctrl.istag = _.head(this.ctrl.versions);
    this.ctrl.nameMaxLength = 24;
    this.ctrl.namePattern = /^[a-z]([-a-z0-9]*[a-z0-9])?$/;
    this.ctrl.repositoryPattern = /^[a-z][a-z0-9+.-@]*:(\/\/)?[0-9a-z_-]+/;
    this.ctrl.wizardDone = false;
    this.ctrl.serviceToBind = null;
    this.ctrl.updating = false;
    this.ctrl.noProjectsCantCreate = false;

    let annotation = this.$filter('annotation');
    this.ctrl.documentationUrl = annotation(this.ctrl.imageStream.resource, 'openshift.io/documentation-url');
    this.ctrl.supportUrl = annotation(this.ctrl.imageStream.resource, 'openshift.io/support-url');

    this.ctrl.serviceInstances = [];
    this.selectedProjectWatch = this.$scope.$watch(
      () => {
        return this.ctrl.selectedProject;
      },
      this.onProjectUpdate
    );

    this.$scope.$watch('$ctrl.selectedProject.metadata.name', () => {
      this.ctrl.projectNameTaken = false;
    });

    if (this.ctrl.showPodPresets) {
      // FIXME: We should not need to request these again.
      this.getServiceClassesAndPlans();
      this.instancesSupported = !!this.APIService.apiInfo(this.APIService.getPreferredVersion('serviceinstances'));
    } else {
      this.instancesSupported = false;
    }

    this.noProjectsCantCreateWatch = this.$scope.$on('no-projects-cannot-create', () => {
      this.ctrl.noProjectsCantCreate = true;
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
    this.noProjectsCantCreateWatch();
    this.clearValidityWatcher();
  }

  // TODO: Handle sample context dir and git ref
  public fillSampleRepo() {
    this.ctrl.repository = _.get(this, 'ctrl.istag.annotations.sampleRepo');

    // Even though we only let you specify these fields when using advanced
    // options, sample repositories can have a git reference and context dir.
    // Preserve these values when the user clicks the link.
    this.gitRef = _.get(this, 'ctrl.istag.annotations.sampleRef', '') as string;
    this.contextDir = _.get(this, 'ctrl.istag.annotations.sampleContextDir', '') as string;

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

  public onRepositoryChanged() {
    // Clear any git ref or context dir filled for the sample repo when the
    // repository input is changed.
    this.gitRef = '';
    this.contextDir = '';
  }

  public navigateToAdvancedForm() {
    let template = 'project/{project}/create/fromimage?' +
      'imageStream={imageStream}&' +
      'imageTag={imageTag}&' +
      'namespace={namespace}&' +
      'displayName={displayName}&' +
      'name={name}&' +
      'sourceURI={sourceURI}&' +
      'sourceRef={sourceRef}&' +
      'contextDir={contextDir}&' +
      'advanced=true';
    let target = URI.expand(template, {
      project: this.ctrl.selectedProject.metadata.name,
      imageStream: this.ctrl.imageStream.resource.metadata.name,
      imageTag: this.ctrl.istag.name,
      namespace: this.ctrl.imageStream.resource.metadata.namespace,
      displayName: this.ctrl.imageStream.name,
      name: this.ctrl.name || '',
      sourceURI: this.ctrl.repository || '',
      sourceRef: this.gitRef || '',
      contextDir: this.contextDir || ''
    }).toString();

    // TODO: Handle configurable base URLs.
    // let base = 'https://localhost:9000/dev-console/';
    // if (base) {
    //   window.location.href = base + target;
    //   return;
    // }

    this.$location.url(target);
    this.closePanel();
  }

  private clearValidityWatcher = () => {
    if (this.validityWatcher) {
      this.validityWatcher();
      this.validityWatcher = undefined;
    }
  };

  private showInfo = () => {
    this.clearValidityWatcher();
    this.ctrl.nextTitle = 'Next >';
  };

  private showConfig = () => {
    this.ctrl.currentStep = "Configuration";
    this.clearValidityWatcher();
    this.ctrl.nextTitle = this.bindStep.hidden ? 'Create' : 'Next >';
    this.reviewStep.allowed = this.bindStep.hidden && this.configStep.valid;

    this.validityWatcher = this.$scope.$watch("$ctrl.builderForm.$valid", (isValid: any, lastValue: any) => {
      this.configStep.valid = isValid;
      if (this.ctrl.noProjectsCantCreate === true) {
        this.configStep.valid = false;
      }
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
    this.ctrl.currentStep = "Results";

    this.createApp();
  };

  // If this spec tag references another tag in the same image stream, get the reference.
  private getTagReference(specTag: any) {
    // Is this an image stream tag reference?
    if (!specTag.from || specTag.from.kind !== 'ImageStreamTag') {
      return null;
    }

    // Is it referencing an image stream in the same namespace?
    let ns = _.get(this, 'ctrl.imageStream.resource.metadata.namespace');
    if (specTag.from.namespace && specTag.from.namespace !== ns) {
      return null;
    }

    // If the name doesn't have a `:`, it references the same image stream.
    if (specTag.from.name.indexOf(':') === -1) {
      return specTag.from.name;
    }

    // Or it can be in the form of "name:tag" where the name is the same image stream.
    let name = _.get(this, 'ctrl.imageStream.resource.metadata.name');
    let parts = specTag.from.name.split(':');
    if (parts[0] !== name) {
      return null;
    }

    return parts[1];
  }

  private getVersions() {
    this.ctrl.referencedBy = {};

    let references = {};
    let builderTagsByName = {};
    let specTags = _.get(this, 'ctrl.imageStream.resource.spec.tags', []);
    _.each(specTags, (specTag: any) => {
      let fromTag = this.getTagReference(specTag);
      if (fromTag) {
        references[specTag.name] = fromTag;
        this.ctrl.referencedBy[fromTag] = this.ctrl.referencedBy[fromTag] || [];
        this.ctrl.referencedBy[fromTag].push(specTag.name);
        return;
      }

      // Check for `builder` and `hidden` tags.
      let tagString = _.get(specTag, 'annotations.tags', '');
      let tags = tagString.split(/\s*,\s*/);
      if (_.includes(tags, 'builder') && !_.includes(tags, 'hidden')) {
        builderTagsByName[specTag.name] = specTag;
      }
    });

    // Make sure status tags exist for the versions we show.
    let versions = [];
    let statusTags = _.get(this, 'ctrl.imageStream.resource.status.tags', []);
    _.each(statusTags, (statusTag: any) => {
      let builder = builderTagsByName[statusTag.tag];
      if (builder) {
        versions.push(builder);
      }
    });

    // Sort the tags by semver with the newest first.
    versions.sort((tag1: any, tag2: any): number => {
      return this.VersionsService.rcompare(tag1.name, tag2.name);
    });

    return versions;
  }

  private getImageStreamTag() {
    let imageStreamTagsVersion = this.APIService.getPreferredVersion('imagestreamtags');
    let name = this.ctrl.imageStream.resource.metadata.name + ":" + this.ctrl.istag.name;
    let namespace = this.ctrl.imageStream.resource.metadata.namespace;
    return this.DataService.get(imageStreamTagsVersion, name, {
      namespace: namespace
    });
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
    if (this.ctrl.wizardDone || !this.ctrl.showPodPresets) {
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
    } else if (this.ctrl.showPodPresets) {
      this.ctrl.updating = true;
      let serviceInstancesVersion = this.APIService.getPreferredVersion('serviceinstances');
      this.DataService.list(serviceInstancesVersion, {
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
    let servicePlan;
    let serviceClass = this.BindingService.getServiceClassForInstance(serviceInstance, this.ctrl.serviceClasses);
    let servicePlanName = _.get(serviceInstance, 'spec.clusterServicePlanRef.name') as string;
    if (servicePlanName) {
      servicePlan = this.ctrl.servicePlans[servicePlanName];
    }
    return this.BindingService.isServiceBindable(serviceInstance, serviceClass, servicePlan);
  };

  private createApp() {
    this.createProjectIfNecessary().then((project: any) => {
      this.ctrl.selectedProject = project;
      // Get the image stream tag so we know what ports are exposed by the image.
      this.getImageStreamTag().then((imageStreamTag: any) => {
        let apiObjects = this.BuilderAppService.makeAPIObjects({
          name: this.ctrl.name,
          repository: this.ctrl.repository,
          gitRef: this.gitRef,
          contextDir: this.contextDir,
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
    }, (e) => {
      if (e.data.reason === 'AlreadyExists') {
        this.ctrl.projectNameTaken = true;
        this.ctrl.wizardDone = false;
        this.ctrl.currentStep = "Configuration";
      } else {
        this.ctrl.error = e;
      }
    });
  };

  private createProjectIfNecessary() {
    if (!this.isNewProject()) {
      return this.$q.when(this.ctrl.selectedProject);
    }
    let newProjName = this.ctrl.selectedProject.metadata.name;
    let newProjDisplayName = this.ctrl.selectedProject.metadata.annotations['new-display-name'];
    let newProjDesc = this.$filter('description')(this.ctrl.selectedProject);
    return this.ProjectsService.create(newProjName, newProjDisplayName, newProjDesc);
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
    this.ctrl.bindError = false;
    let context = {
      namespace: _.get(this.ctrl.selectedProject, 'metadata.name')
    };
    let serviceClass = this.BindingService.getServiceClassForInstance(this.ctrl.serviceToBind, this.ctrl.serviceClasses);
    this.BindingService.bindService(this.ctrl.serviceToBind, application, serviceClass).then((binding: any) => {
      this.ctrl.binding = binding;
      this.watches.push(this.DataService.watchObject(this.BindingService.bindingResource, _.get(this.ctrl.binding, 'metadata.name'), context, (binding: any) => {
        this.ctrl.binding = binding;
      }));
    }, (e: any) => {
      this.ctrl.bindComplete = true;
      this.ctrl.bindError = e;
    });
  }

  private getServiceClassesAndPlans() {
    let serviceClassesVersion = this.APIService.getPreferredVersion('clusterserviceclasses');
    let servicePlansVersion = this.APIService.getPreferredVersion('clusterserviceplans');

    // Only request service classes if the resource is available.
    if (this.APIService.apiInfo(serviceClassesVersion) && this.APIService.apiInfo(servicePlansVersion)) {
      this.ctrl.updating = true;

      let promises = [];
      promises.push(this.DataService.list(serviceClassesVersion, {}).then( (resources: any) => {
        this.ctrl.serviceClasses = resources.by("metadata.name");
      }));

      promises.push(this.DataService.list(servicePlansVersion, {}).then( (resources: any) => {
        this.ctrl.servicePlans = resources.by("metadata.name");
      }));

      this.$q.all(promises).finally(() => {
        this.ctrl.updating = false;
      });
    }
  }

}
