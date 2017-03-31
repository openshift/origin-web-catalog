import * as angular from 'angular';
import * as _ from 'lodash';
import * as URI from 'urijs';

export class CreateFromBuilderController implements angular.IController {
  static $inject = ['$scope', '$filter', '$location', '$q', 'BuilderAppService', 'DataService', 'Logger'];

  public ctrl: any = this;

  private $scope: ng.IScope;
  private $filter: any;
  private $location: ng.ILocationService;
  private $q: ng.IQService;
  private BuilderAppService: any;
  private DataService: any;
  private Logger: any;

  constructor($scope: ng.IScope,
              $filter: any,
              $location: ng.ILocationService,
              $q: ng.IQService,
              BuilderAppService: any,
              DataService: any,
              Logger: any) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.$location = $location;
    this.$q = $q;
    this.BuilderAppService = BuilderAppService;
    this.DataService = DataService;
    this.Logger = Logger;
  }

  public $onInit() {
    this.ctrl.steps = [{
      label: 'Configuration',
      id: 'configure',
      view: 'create-from-builder/create-from-builder-configure.html',
      selected: true
    }, {
      label: 'Results',
      id: 'results',
      view: 'create-from-builder/create-from-builder-results.html'
    }];
    this.ctrl.currentStep = this.ctrl.steps[0];
    this.ctrl.versions = this.getVersions();
    this.ctrl.istag = _.first(this.ctrl.versions);
    this.ctrl.nameMaxLength = 24;
    this.ctrl.namePattern = /[a-z]([-a-z0-9]*[a-z0-9])?/;
    this.ctrl.repositoryPattern = /^[a-z][a-z0-9+.-@]*:(\/\/)?[0-9a-z_-]+/;
  }

  public stepClick(step: any) {
    // Don't let users return to previous steps if we've already completed the wizard.
    if (this.ctrl.currentStep.id === 'results') {
      return;
    }

    if (!step.visited) {
      return;
    }

    this.gotoStep(step);
  }

  public gotoStep(step: any) {
    this.ctrl.steps.forEach((step) => step.selected = false);
    if (this.ctrl.currentStep) {
      this.ctrl.currentStep.visited = true;
    }
    this.ctrl.currentStep = step;
    this.ctrl.currentStep.selected = true;
  }

  public closePanel() {
    if (angular.isFunction(this.ctrl.handleClose)) {
      this.ctrl.handleClose();
    }
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
      name = _.trunc(name, this.ctrl.nameMaxLength);
      name = _.kebabCase(name);

      // Make sure it's a valid name before setting it.
      if (this.ctrl.namePattern.test(name)) {
        this.ctrl.name = name;
      }
    }
  }

  public createApp() {
    this.createProjectIfNecessary().then(() => {
      this.gotoStep(_.last(this.ctrl.steps));
      // Get the image stream tag so we know what ports are exposed by the image.
      this.getImageStreamTag().then((imageStreamTag: any) => {
        let apiObjects = this.BuilderAppService.makeAPIObjects({
          name: this.ctrl.name,
          repository: this.ctrl.repository,
          namespace: this.ctrl.selectedProject.metadata.name,
          imageStreamTag: imageStreamTag
        });
        this.createAPIObjects(apiObjects);
      }, (e: any) => {
        this.ctrl.error = e;
      });
    }, (result) => {
      let data = result.data || {};
      if (data.reason === 'AlreadyExists') {
        this.ctrl.projectNameTaken = true;
      } else {
        this.ctrl.error = data.message || 'An error occurred creating the project.';
      }
    });
  };

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

  private createProjectIfNecessary() {
    if (_.has(this.ctrl.selectedProject, 'metadata.uid')) {
      return this.$q.when();
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
}
