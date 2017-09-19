webpackJsonp([ 0, 1 ], [ function(e, t) {
    e.exports = _;
}, function(e, t) {
    e.exports = angular;
}, function(e, t) {
    e.exports = $;
}, function(e, t) {}, function(e, t) {
    e.exports = '<a href="" class="catalog-search-match" ng-class="{\'no-matches\': match.model.id === \'viewNone\'}">\n  <span class="catalog-search-match-icon" ng-if="match.model.id !== \'viewAll\' && match.model.id !== \'viewNone\'">\n    <span ng-if="match.model.imageUrl"><img ng-src="{{match.model.imageUrl}}"></span>\n    <span ng-if="!match.model.imageUrl && match.model.iconClass" ng-class="match.model.iconClass" class="icon"></span>\n  </span>\n  <div class="catalog-search-match-info" ng-if="match.model.id !== \'viewAll\' && match.model.id !== \'viewNone\'">\n    <div class="catalog-search-match-label">\n      {{match.label}}\n    </div>\n    <div class="catalog-search-match-description">\n      <span ng-repeat="tag in (match.model.tags || match.model.resource.tags)" class="tag small text-muted">\n        {{tag}}\n      </span>\n    </div>\n  </div>\n  <span ng-if="match.model.id === \'viewNone\'" class="catalog-search-show-none">\n    {{match.model.text}}\n  </span>\n  <span ng-if="match.model.id === \'viewAll\'" class="catalog-search-show-all">\n    {{match.model.text}}  <span class="fa fa-angle-right"></span>\n  </span>\n</a>\n';
}, function(e, t) {
    e.exports = '<bind-application-form application-name="$ctrl.name"\n                       form-name="$ctrl.bindForm"\n                       allow-no-binding="true"\n                       service-instances="$ctrl.serviceInstances"\n                       service-classes="$ctrl.serviceClasses"\n                       service-to-bind="$ctrl.serviceToBind">\n</bind-application-form>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <form name="$ctrl.builderForm" class="config-form">\n    <div class="form-group">\n      <label class="control-label" for="version">Version</label>\n      <ui-select ng-model="$ctrl.istag" required search-enabled="false">\n        <ui-select-match>\n          {{$select.selected.name}}\n        </ui-select-match>\n        <ui-select-choices repeat="tag in $ctrl.versions track by tag.name">\n          {{tag.name}}\n          <small ng-repeat="otherTag in $ctrl.referencedBy[tag.name]">\n            <span ng-if="$first"> &mdash; </span>{{otherTag}}<span ng-if="!$last">,</span>\n          </small>\n        </ui-select-choices>\n      </ui-select>\n    </div>\n    <select-project selected-project="$ctrl.selectedProject" name-taken="$ctrl.projectNameTaken"></select-project>\n    <div class="form-group">\n      <label class="control-label required" for="app-name">Application Name</label>\n      <div ng-class="{ \'has-error\': $ctrl.builderForm.name.$touched && $ctrl.builderForm.name.$invalid }">\n        <input\n          class="form-control"\n          type="text"\n          id="app-name"\n          required\n          minlength="2"\n          ng-maxlength="$ctrl.nameMaxLength"\n          ng-pattern="$ctrl.namePattern"\n          ng-model="$ctrl.name"\n          name="name"\n          autocorrect="off"\n          autocapitalize="none"\n          spellcheck="false">\n        \x3c!-- Wait until users leave the field to avoid flashing errors as they type. --\x3e\n        <div ng-if="$ctrl.builderForm.name.$touched">\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.required">\n            <span class="help-block">\n              Application name is required.\n            </span>\n          </div>\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.pattern">\n            <span class="help-block">\n              Application name consists of lower-case letters, numbers, and dashes. It must start with a letter and can\'t end with a <code>-</code>.\n            </span>\n          </div>\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.minlength">\n            <span class="help-block">\n              Application name must be at least 2 characters.\n            </span>\n          </div>\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.maxlength">\n            <span class="help-block">\n              Application name can\'t be more than 24 characters.\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class="form-group">\n      <label class="control-label required" for="repository">Git Repository</label>\n      <div ng-class="{ \'has-error\': $ctrl.builderForm.repository.$touched && $ctrl.builderForm.repository.$error.$required }">\n        <input class="form-control"\n          type="text"\n          id="repository"\n          name="repository"\n          required\n          ng-model="$ctrl.repository"\n          autocorrect="off"\n          autocapitalize="off"\n          spellcheck="false">\n        <div ng-if="$ctrl.istag.annotations.sampleRepo" class="help-block">\n          <a href="" ng-click="$ctrl.fillSampleRepo()">Try Sample Repository\n            <i class="fa fa-level-up" aria-hidden="true"></i></a>\n        </div>\n        <div class="has-error" ng-if="$ctrl.builderForm.repository.$touched && $ctrl.builderForm.repository.$error.$required">\n          <span class="help-block">\n            Git repository is required.\n          </span>\n        </div>\n        <div class="has-warning" ng-if="$ctrl.builderForm.repository.$touched && $ctrl.repository && !$ctrl.repositoryPattern.test($ctrl.repository)">\n          <span class="help-block">\n            This might not be a valid Git URL. Check that it is the correct URL to a remote Git repository.\n          </span>\n        </div>\n      </div>\n    </div>\n\n    \x3c!--\n      Only show the link for existing projects. It will be broken for new\n      projects.  Use class `invisible` when the project list is still loading\n      so the dialog doesn\'t resize.\n    --\x3e\n    <div ng-hide="$ctrl.selectedProject && !$ctrl.selectedProject.metadata.uid"\n         ng-class="{ invisible: !$ctrl.selectedProject || !$ctrl.istag }"\n         class="form-group">\n      If you have a private Git repository or need to change application defaults, view\n      <a href="" ng-click="$ctrl.navigateToAdvancedForm()">advanced options</a>.\n    </div>\n  </form>\n</div>\n';
}, function(e, t) {
    e.exports = '<div ng-if="!$ctrl.success && !$ctrl.error">\n  <h3 class="text-center">\n    <div class="spinner spinner-lg" aria-hidden="true"></div>\n  </h3>\n  <h3 class="text-center">\n    <span>The application is being created</span>\n  </h3>\n</div>\n<div ng-if="$ctrl.success">\n  <div class="review-status">\n    <span class="pficon pficon-ok" aria-hidden="true"></span>\n    <span class="sr-only">Success</span>\n    <h3 class="review-message">\n    <span>\n      <strong>{{$ctrl.name}}</strong> has been created in <strong>{{$ctrl.selectedProject.metadata.name}}</strong> successfully\n    </span>\n    </h3>\n  </div>\n</div>\n<div ng-if="$ctrl.success && $ctrl.binding">\n  <bind-results error="$ctrl.bindError"\n                progress-inline="true"\n                binding="$ctrl.binding"\n                service-to-bind="$ctrl.serviceToBind.metadata.name"\n                bind-type="application"\n                application-to-bind="$ctrl.name"\n                show-pod-presets="$ctrl.showPodPresets">\n  </bind-results>\n</div>\n<div ng-if="$ctrl.success">\n  <p ng-if="!$ctrl.serviceToBind || $ctrl.bindComplete">\n    Continue to your project to check the status of your application as it builds and deploys.\n  </p>\n</div>\n<div class="review-failure" ng-if="$ctrl.error">\n  <div class="review-status">\n    <span class="pficon pficon-error-circle-o text-danger" aria-hidden="true"></span>\n    <h3 class="review-message">\n      Error creating <strong>{{$ctrl.name}}</strong> in\n      <strong>{{$ctrl.selectedProject | displayName}}</strong>\n    </h3>\n  </div>\n  <div class="sub-title">\n    <span ng-if="$ctrl.error.data.message">\n      {{$ctrl.error.data.message | upperFirst}}\n    </span>\n    <span ng-if="!$ctrl.error.data.message">\n      An error occurred creating the application.\n    </span>\n  </div>\n  \x3c!-- TODO: Improve error message presentation --\x3e\n  <ul ng-if="$ctrl.error.failure.length" class="failure-messages">\n    <li ng-repeat="failure in $ctrl.error.failure">\n      {{failure.data.message}}\n    </li>\n  </ul>\n</div>\n<div class="footer-panel">\n  <a class="btn btn-primary" href="{{$ctrl.selectedProject | projectUrl : $ctrl.baseProjectUrl}}">View Project</a>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <form name="$ctrl.forms.bindParametersForm" class="config-form">\n    <catalog-parameters\n      ng-if="$ctrl.bindParameterSchema.properties"\n      model="$ctrl.bindParameterData"\n      parameter-schema="$ctrl.bindParameterSchema">\n    </catalog-parameters>\n  </form>\n</div>\n';
}, function(e, t) {
    e.exports = '<bind-service-form service-class="$ctrl.serviceClass.resource"\n                   service-class-name="$ctrl.serviceClass.name"\n                   show-pod-presets="$ctrl.showPodPresets"\n                   applications="$ctrl.applications"\n                   form-name="$ctrl.forms.bindForm"\n                   allow-no-binding="true"\n                   project-name="$ctrl.projectDisplayName"\n                   bind-type="$ctrl.bindType"\n                   app-to-bind="$ctrl.appToBind">\n</bind-service-form>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <form name="$ctrl.forms.orderConfigureForm" class="config-form">\n    <select-project selected-project="$ctrl.selectedProject" name-taken="$ctrl.nameTaken"></select-project>\n    <catalog-parameters\n      ng-if="$ctrl.parameterSchema.properties"\n      model="$ctrl.parameterData"\n      parameter-schema="$ctrl.parameterSchema"\n      parameter-form-definition="$ctrl.parameterFormDefinition">\n    </catalog-parameters>\n  </form>\n  <div ng-if="$ctrl.error" class="has-error">\n    <span class="help-block">{{$ctrl.error}}</span>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <div class="select-plans">\n    <h3>Select a Plan</h3>\n    <div ng-repeat="plan in $ctrl.serviceClass.resource.plans" class="radio">\n      <label>\n        <input\n          type="radio"\n          ng-model="$ctrl.planIndex"\n          ng-change="$ctrl.selectPlan(plan)"\n          value="{{$index}}">\n        <span class="plan-name">{{plan.externalMetadata.displayName || plan.name}}</span>\n        \x3c!-- TODO: truncate long text --\x3e\n        <div ng-if="plan.description">{{plan.description}}</div>\n        \x3c!-- TODO: show plan bullets --\x3e\n      </label>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div ng-if="!$ctrl.error">\n  <div ng-if="!$ctrl.orderComplete">\n    <h3 class="text-center">\n      <div class="spinner spinner-lg" aria-hidden="true"></div>\n    </h3>\n    <h3 class="text-center">\n      <span>The service is being provisioned</span>\n    </h3>\n  </div>\n</div>\n<div class="review-failure" ng-if="$ctrl.error">\n  <div class="review-status">\n    <span class="pficon pficon-error-circle-o text-danger" aria-hidden="true"></span>\n    <h3 class="review-message">\n      Error provisioning <strong>{{$ctrl.serviceClass.name}}</strong> in\n      <strong>{{$ctrl.projectDisplayName}}</strong>\n    </h3>\n  </div>\n  <div class="sub-title">\n    <span ng-if="$ctrl.error.message">\n      {{$ctrl.error.message}}\n    </span>\n    <span ng-if="!$ctrl.error.message">\n      An error occurred provisioning the service.\n    </span>\n  </div>\n</div>\n<div ng-if="$ctrl.orderComplete">\n  <div class="review-status">\n    <span class="pficon pficon-ok" aria-hidden="true"></span>\n    <span class="sr-only">Success</span>\n    <h3 class="review-message">\n      <span>\n        <strong>{{$ctrl.serviceInstance.metadata.name}}</strong> has been added to <strong>{{$ctrl.projectDisplayName}}</strong> successfully\n      </span>\n    </h3>\n  </div>\n</div>\n<div ng-if="$ctrl.orderComplete && $ctrl.binding">\n  <bind-results error="$ctrl.bindError"\n                progress-inline="true"\n                binding="$ctrl.binding"\n                secret-href="$ctrl.baseProjectUrl + \'/browse/secrets/\' + $ctrl.binding.spec.secretName"\n                service-to-bind="$ctrl.serviceInstance.metadata.name"\n                bind-type="{{$ctrl.bindType}}"\n                application-to-bind="$ctrl.appToBind.metadata.name"\n                show-pod-presets="$ctrl.showPodPresets">\n  </bind-results>\n</div>\n<div class="alert alert-info" ng-if="$ctrl.orderComplete && $ctrl.bindType === \'none\'">\n  <span class="pficon pficon-info" aria-hidden="true"></span>\n  <span class="sr-only">Info</span>\n  Continue to your project to bind this service to your application. Binding this service creates a secret containing the information necessary for your application to use the service.\n</div>\n<div class="footer-panel">\n  <a class="btn btn-primary" href="{{$ctrl.selectedProject | projectUrl : $ctrl.baseProjectUrl}}">View Project</a>\n</div>\n';
}, function(e, t) {
    e.exports = '<div  class="schema-form-array {{form.htmlClass}}"\n      sf-field-model="sf-new-array"\n      sf-new-array>\n  <label class="control-label" ng-show="showTitle()">{{ form.title }}</label>\n  <ol class="list-group" sf-field-model ui-sortable="form.sortOptions">\n    <li class="list-group-item {{form.fieldHtmlClass}}"\n        schema-form-array-items\n        sf-field-model="ng-repeat"\n        ng-repeat="item in $$value$$ track by $index">\n      <button ng-hide="form.readonly || form.remove === null"\n              ng-click="deleteFromArray($index)"\n              ng-disabled="form.schema.minItems >= modelArray.length"\n              style="position: absolute; z-index: 20; right: 0; top: 12px; font-size: 20px;"\n              type="button" class="close">\n              <span aria-hidden="true">&times;</span><span class="sr-only">Close</span>\n      </button>\n    </li>\n  </ol>\n  <div class="clearfix" style="padding: 15px;" ng-model="modelArray" schema-validate="form">\n    <div class="help-block"\n         ng-show="(hasError() && errorMessage(schemaError())) || form.description"\n         ng-bind-html="(hasError() && errorMessage(schemaError())) || form.description"></div>\n\n    <button ng-hide="form.readonly || form.add === null"\n            ng-click="appendToArray()"\n            ng-disabled="form.schema.maxItems <= modelArray.length"\n            type="button"\n            class="btn {{ form.style.add || \'btn-default\' }} pull-right">\n      {{ form.add || \'Add\'}}\n    </button>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="form-group">\n  <div class="checkbox schema-form-checkbox {{form.htmlClass}}"\n       ng-class="{\'has-error\': form.disableErrorState !== true &&  hasError(), \'has-success\': form.disableSuccessState !== true &&  hasSuccess()}">\n    <label class="{{form.checkboxLabelHtmlClass}}">\n      <input type="checkbox"\n             sf-changed="form"\n             ng-disabled="form.readonly"\n             sf-field-model\n             schema-validate="form"\n             class="{{form.fieldHtmlClass}}"\n             name="{{form.key.slice(-1)[0]}}">\n      <span ng-bind-html="form.title"></span>\n    </label>\n    <div class="help-block {{form.checkboxHelpHtmlClass}}" sf-message="form.description"></div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div sf-field-model="sf-new-array"\n     sf-new-array\n     class="form-group schema-form-checkboxes {{form.htmlClass}}"\n     ng-class="{\'has-error\': form.disableErrorState !== true &&  hasError(), \'has-success\': form.disableSuccessState !== true &&  hasSuccess()}">\n  <label class="control-label {{form.labelHtmlClass}}"\n         sf-field-model\n         schema-validate="form"\n         ng-show="showTitle()">{{form.title}}</label>\n\n  <div class="{{form.fieldWrapperHtmlClass}}">\n    <div class="checkbox" ng-repeat="val in titleMapValues track by $index" >\n      <label>\n        <input type="checkbox"\n               ng-disabled="form.readonly"\n               sf-changed="form"\n               class="{{form.fieldHtmlClass}}"\n               ng-model="titleMapValues[$index]"\n               name="{{form.key.slice(-1)[0]}}">\n        <span ng-bind-html="form.titleMap[$index].name"></span>\n      </label>\n    </div>\n  </div>\n  <div class="help-block" sf-message="form.description"></div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="form-group schema-form-{{form.type}} {{form.htmlClass}}"\n     ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }">\n  <label class="control-label {{form.labelHtmlClass}}" ng-class="{required: form.required, \'sr-only\': !showTitle()}" for="{{form.key.slice(-1)[0]}}">{{form.title}}</label>\n\n  <div class="{{form.fieldWrapperHtmlClass}}">\n    <input ng-if="!form.fieldAddonLeft && !form.fieldAddonRight"\n           ng-show="form.key"\n           type="{{form.type}}"\n           step="any"\n           sf-changed="form"\n           placeholder="{{form.placeholder}}"\n           class="form-control {{form.fieldHtmlClass}}"\n           id="{{form.key.slice(-1)[0]}}"\n           sf-field-model\n           ng-disabled="form.readonly"\n           ng-required="form.required"\n           schema-validate="form"\n           name="{{form.key.slice(-1)[0]}}"\n           aria-describedby="{{form.key.slice(-1)[0] + \'Status\'}}">\n\n    <div ng-if="form.fieldAddonLeft || form.fieldAddonRight"\n         ng-class="{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}">\n      <span ng-if="form.fieldAddonLeft"\n            class="input-group-addon"\n            ng-bind-html="form.fieldAddonLeft"></span>\n      <input ng-show="form.key"\n             type="{{form.type}}"\n             step="any"\n             sf-changed="form"\n             placeholder="{{form.placeholder}}"\n             class="form-control {{form.fieldHtmlClass}}"\n             id="{{form.key.slice(-1)[0]}}"\n             sf-field-model\n             ng-disabled="form.readonly"\n             schema-validate="form"\n             name="{{form.key.slice(-1)[0]}}"\n             aria-describedby="{{form.key.slice(-1)[0] + \'Status\'}}">\n\n      <span ng-if="form.fieldAddonRight"\n            class="input-group-addon"\n            ng-bind-html="form.fieldAddonRight"></span>\n    </div>\n\n    <span ng-if="form.feedback !== false"\n          class="form-control-feedback"\n          ng-class="evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }"\n          aria-hidden="true"></span>\n\n    <span ng-if="hasError() || hasSuccess()"\n          id="{{form.key.slice(-1)[0] + \'Status\'}}"\n          class="sr-only">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span>\n\n    <div class="help-block" sf-message="form.description"></div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="form-group {{form.htmlClass}} schema-form-select"\n     ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false}">\n   <label class="control-label {{form.labelHtmlClass}}" ng-class="{ required: form.required }" ng-show="showTitle()">\n    {{form.title}}\n  </label>\n  <div class="{{form.fieldWrapperHtmlClass}}">\n    <ui-select sf-field-model\n            ng-disabled="form.readonly"\n            ng-required="form.required"\n            sf-changed="form"\n            schema-validate="form">\n      <ui-select-match>\n        {{$select.selected.name}}\n      </ui-select-match>\n      <ui-select-choices repeat="item.value as item in form.titleMap | filter : $select.search">\n        <span ng-bind-html="item.name | highlightKeywords : $select.search"></span>\n      </ui-select-choices>\n    </ui-select>\n    <div class="help-block" sf-message="form.description"></div>\n  </div>\n</div>\n';
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(45);
    t.catalogFilter = {
        bindings: {
            config: "<",
            filterOnKeyword: "<",
            applyFilters: "&"
        },
        controller: n.CatalogFilterController,
        template: r(34)
    };
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(46);
    t.catalogParameters = {
        bindings: {
            parameterSchema: "<",
            parameterFormDefinition: "<",
            model: "="
        },
        controller: n.CatalogParametersController,
        template: r(35)
    };
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(47);
    t.catalogSearch = {
        bindings: {
            baseProjectUrl: "@",
            catalogItems: "<"
        },
        controller: n.CatalogSearchController,
        template: r(36)
    };
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(48);
    t.createFromBuilder = {
        bindings: {
            baseProjectUrl: "@",
            imageStream: "<",
            handleClose: "<"
        },
        controller: n.CreateFromBuilderController,
        template: r(37)
    };
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(49);
    t.landingPage = {
        bindings: {
            baseProjectUrl: "@",
            onTemplateSelected: "&"
        },
        controller: n.LandingPageController,
        template: r(38),
        transclude: {
            landingsearch: "landingsearch",
            landingheader: "landingheader",
            landingbody: "landingbody",
            landingside: "landingside"
        }
    };
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(50);
    t.orderService = {
        bindings: {
            baseProjectUrl: "@",
            serviceClass: "<",
            handleClose: "<"
        },
        controller: n.OrderServiceController,
        template: r(39)
    };
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(51);
    t.overlayPanel = {
        bindings: {
            showClose: "<",
            showPanel: "<",
            handleClose: "<",
            singleColumn: "<"
        },
        controller: n.OverlayPanelController,
        template: r(40),
        transclude: !0
    };
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(52);
    t.projectsSummary = {
        bindings: {
            baseProjectUrl: "@",
            catalogItems: "<",
            projectsUrl: "@",
            viewEditMembership: "&",
            startTour: "&"
        },
        controller: n.ProjectsSummaryController,
        template: r(41)
    };
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(53);
    t.saasList = {
        bindings: {
            saasTitle: "<?",
            saasOfferings: "<"
        },
        controller: n.SaasListController,
        template: r(42)
    };
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(54);
    t.selectProject = {
        bindings: {
            selectedProject: "=",
            nameTaken: "<",
            onProjectSelected: "<",
            availableProjects: "<"
        },
        controller: n.SelectProjectController,
        template: r(43)
    };
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(55);
    t.servicesView = {
        bindings: {
            baseProjectUrl: "@",
            catalogItems: "<",
            onDeployImageSelected: "<",
            onFromFileSelected: "<",
            onCreateFromProject: "<"
        },
        controller: n.ServicesViewController,
        template: r(44)
    };
}, function(e, t, r) {
    "use strict";
    (function(e) {
        t.__esModule = !0;
        var n = r(0);
        n.set(window, "OPENSHIFT_CONSTANTS.HELP_BASE_URL", "https://docs.openshift.org/latest/");
        var i = {
            new_app: "dev_guide/application_lifecycle/new_app.html",
            application_health: "dev_guide/application_health.html",
            authorization: "architecture/additional_concepts/authorization.html",
            deployments: "dev_guide/deployments/how_deployments_work.html",
            default: "welcome/index.html"
        };
        n.set(window, "OPENSHIFT_CONSTANTS.HELP", i);
        var s = [ {
            id: 1,
            title: "Microservices Application",
            icon: "fa fa-cubes",
            url: "https://www.redhat.com/en/technologies/virtualization",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
        }, {
            id: 2,
            title: "Mobile Application",
            icon: "fa fa-user",
            url: "https://www.redhat.com/en/technologies/mobile",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
        }, {
            id: 3,
            title: "Integration Application",
            icon: "fa fa-plug",
            url: "https://www.redhat.com/en/technologies/cloud-computing",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
        }, {
            id: 4,
            title: "Business Process Application",
            icon: "fa fa-cubes",
            url: "https://www.redhat.com/en/technologies/management",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.  This is way too long! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
        } ], a = [ {
            id: "languages",
            label: "Languages",
            subCategories: [ {
                id: "java",
                label: "Java",
                tags: [ "java" ],
                icon: "font-icon icon-openjdk"
            }, {
                id: "javascript",
                tags: [ "javascript", "nodejs", "js" ],
                label: "JavaScript",
                icon: "font-icon icon-js"
            }, {
                id: "dotnet",
                label: ".NET",
                tags: [ "dotnet" ],
                icon: "font-icon icon-dotnet"
            }, {
                id: "perl",
                label: "Perl",
                tags: [ "perl" ],
                icon: "font-icon icon-perl"
            }, {
                id: "ruby",
                label: "Ruby",
                tags: [ "ruby" ],
                icon: "font-icon icon-ruby"
            }, {
                id: "php",
                label: "PHP",
                tags: [ "php" ],
                icon: "font-icon icon-php"
            }, {
                id: "python",
                label: "Python",
                tags: [ "python" ],
                icon: "font-icon icon-python"
            }, {
                id: "golang",
                label: "Go",
                tags: [ "golang", "go" ],
                icon: "font-icon icon-go-gopher"
            } ]
        }, {
            id: "databases",
            label: "Databases",
            subCategories: [ {
                id: "mongodb",
                label: "Mongo",
                tags: [ "mongodb" ],
                icon: "font-icon icon-mongodb"
            }, {
                id: "mysql",
                label: "mySQL",
                tags: [ "mysql" ],
                icon: "font-icon icon-mysql-database"
            }, {
                id: "postgresql",
                label: "Postgres",
                tags: [ "postgresql" ],
                icon: "font-icon icon-postgresql"
            }, {
                id: "mariadb",
                label: "MariaDB",
                tags: [ "mariadb" ],
                icon: "font-icon icon-mariadb"
            } ]
        }, {
            id: "middleware",
            label: "Middleware",
            subCategories: [ {
                id: "amq",
                label: "A-MQ",
                tags: [ "amq" ],
                icon: "font-icon icon-jboss"
            }, {
                id: "processserver",
                label: "BPM Suite",
                tags: [ "processserver" ],
                icon: "font-icon icon-jboss"
            }, {
                id: "decisionserver",
                label: "BRMS",
                tags: [ "decisionserver" ],
                icon: "font-icon icon-jboss"
            }, {
                id: "datagrid",
                label: "Data Grid",
                tags: [ "datagrid" ],
                icon: "font-icon icon-jboss"
            }, {
                id: "datavirt",
                label: "Data Virt",
                tags: [ "datavirt" ],
                icon: "font-icon icon-jboss"
            }, {
                id: "eap",
                label: "EAP",
                tags: [ "eap" ],
                icon: "font-icon icon-jboss"
            }, {
                id: "fuse",
                label: "Fuse",
                tags: [ "fuse", "jboss-fuse" ],
                icon: "font-icon icon-jboss"
            }, {
                id: "tomcat",
                label: "Tomcat",
                tags: [ "tomcat" ],
                icon: "font-icon icon-jboss"
            }, {
                id: "sso",
                label: "SSO",
                tags: [ "sso" ],
                icon: "font-icon icon-jboss"
            } ]
        }, {
            id: "cicd",
            label: "CI/CD",
            subCategories: [ {
                id: "jenkins",
                label: "Jenkins",
                tags: [ "jenkins" ],
                icon: "font-icon icon-jenkins"
            }, {
                id: "pipelines",
                label: "Pipelines",
                tags: [ "pipelines" ],
                icon: "fa fa-clone"
            } ]
        } ];
        n.set(window, "OPENSHIFT_CONSTANTS.SERVICE_CATALOG_CATEGORIES", a), n.set(window, "OPENSHIFT_CONSTANTS.SAAS_OFFERINGS", s);
        var o = {
            pod_presets: !1
        };
        n.set(window, "OPENSHIFT_CONSTANTS.ENABLE_TECH_PREVIEW_FEATURE", o);
        var c = {
            links: [ {
                title: "Documentation",
                help: ""
            }, {
                title: "Developer Portal",
                href: "https://developers.openshift.com"
            }, {
                title: "Interactive Learning Portal",
                href: "https://learn.openshift.com"
            }, {
                title: "Local Development ",
                href: "https://www.openshift.org/minishift"
            }, {
                title: "YouTube",
                href: "https://www.youtube.com/user/rhopenshift"
            }, {
                title: "Blog",
                href: "https://blog.openshift.com"
            } ]
        };
        n.set(window, "OPENSHIFT_CONSTANTS.CATALOG_HELP_RESOURCES", c);
        var l = function() {
            e("body").find(".services-view-container .nav-tabs a")[0].click();
        }, d = function() {
            e(e("body").find(".services-view-container .nav-tabs li")[1]).find("a")[0].click(), 
            setTimeout(function() {
                e("body").find(".services-sub-category-tab")[1].click();
            });
        }, p = {
            id: "getting-started-tour",
            steps: [ {
                title: "Create Project",
                content: "Projects allow you to organize and manage your content. Projects require a unique name, and optionally can include a display name, and description",
                target: ".catalog-projects-summary-panel .create-button",
                targetScrollElement: ".landing-side-bar",
                placement: "left"
            }, {
                title: "Search Catalog",
                content: "Search by name, description, keyword, or label to quickly locate items in the catalog that you want to add to your project.",
                target: ".landing-search-area .landing-search-form",
                placement: "bottom",
                fixedElement: !0
            }, {
                title: "Browse Catalog",
                content: "If you don’t know exactly what you are looking for, you can browse all available catalog items under the first tab in the catalog.",
                target: ".services-view-container h1",
                placement: "bottom",
                xOffset: 20,
                delay: 300,
                preShow: l
            }, {
                title: "Browse by Category",
                content: "A secondary level of categorization is available to further narrow your search.",
                target: ".services-view-container .nav-tabs li:nth-child(2)",
                placement: "right",
                delay: 200,
                preShow: d
            }, {
                title: "Configure a Resource",
                content: "Clicking on a catalog item will open a panel allowing you to configure and create within a project.",
                target: ".services-sub-category.active .services-items .services-item",
                placement: "right"
            }, {
                title: "Additional Help",
                content: "Additional resources can be found here or you can always access the help icon in the top banner for more information.",
                target: ".resources-panel",
                targetScrollElement: ".landing-side-bar",
                placement: "left"
            } ]
        }, h = {
            landing_page_tour: {
                enabled: !0,
                auto_launch: !1,
                steps: p
            }
        };
        n.set(window, "OPENSHIFT_CONSTANTS.GUIDED_TOURS", h), n.set(window, "OPENSHIFT_CONSTANTS.PUBLISHER_SYNONYMS", {});
    }).call(t, r(2));
}, function(e, t, r) {
    "use strict";
    function n() {
        return function(e, t) {
            var r, n = t || "project/";
            return r = i.isString(e) ? e : i.get(e, "metadata.name", ""), n.endsWith("/") || (n += "/"), 
            n + r;
        };
    }
    t.__esModule = !0;
    var i = r(0);
    t.projectUrlFilter = n;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(0), i = function() {
        function e() {}
        return e.prototype.makeAPIObjects = function(e) {
            var t = this.getPorts(e.imageStreamTag), r = n.head(t), i = [ this.makeImageStream(e), this.makeBuildConfig(e), this.makeDeploymentConfig(e, t) ];
            return r && (i = i.concat(this.makeService(e, r), this.makeRoute(e, r))), i;
        }, e.prototype.getPorts = function(e) {
            var t = e.image, r = n.get(t, "dockerImageMetadata.Config.ExposedPorts") || n.get(t, "dockerImageMetadata.ContainerConfig.ExposedPorts", []);
            return this.parsePortsFromSpec(r);
        }, e.prototype.parsePortsFromSpec = function(e) {
            var t = [];
            return n.each(e, function(e, r) {
                var n = r.split("/");
                1 === n.length && n.push("tcp");
                var i = parseInt(n[0], 10);
                isNaN(i) ? this.Logger.warn("Container port " + n[0] + " is not a number") : t.push({
                    containerPort: i,
                    protocol: n[1].toUpperCase()
                });
            }), t;
        }, e.prototype.getAnnotations = function() {
            return {
                "openshift.io/generated-by": "OpenShiftWebConsole"
            };
        }, e.prototype.getLabels = function(e) {
            return {
                app: e.name
            };
        }, e.prototype.getPortName = function(e) {
            return (e.containerPort + "-" + e.protocol).toLowerCase();
        }, e.prototype.makeRoute = function(e, t) {
            return {
                kind: "Route",
                apiVersion: "v1",
                metadata: {
                    name: e.name,
                    labels: this.getLabels(e),
                    annotations: this.getAnnotations()
                },
                spec: {
                    to: {
                        kind: "Service",
                        name: e.name
                    },
                    port: {
                        targetPort: this.getPortName(t)
                    },
                    wildcardPolicy: "None"
                }
            };
        }, e.prototype.makeService = function(e, t) {
            return {
                kind: "Service",
                apiVersion: "v1",
                metadata: {
                    name: e.name,
                    labels: this.getLabels(e),
                    annotations: this.getAnnotations()
                },
                spec: {
                    selector: {
                        deploymentconfig: e.name
                    },
                    ports: [ {
                        port: t.containerPort,
                        targetPort: t.containerPort,
                        protocol: t.protocol,
                        name: this.getPortName(t)
                    } ]
                }
            };
        }, e.prototype.makeDeploymentConfig = function(e, t) {
            return {
                apiVersion: "v1",
                kind: "DeploymentConfig",
                metadata: {
                    name: e.name,
                    labels: this.getLabels(e),
                    annotations: this.getAnnotations()
                },
                spec: {
                    replicas: 1,
                    selector: {
                        deploymentconfig: e.name
                    },
                    triggers: [ {
                        type: "ImageChange",
                        imageChangeParams: {
                            automatic: !0,
                            containerNames: [ e.name ],
                            from: {
                                kind: "ImageStreamTag",
                                name: e.name + ":latest"
                            }
                        }
                    }, {
                        type: "ConfigChange"
                    } ],
                    template: {
                        metadata: {
                            labels: n.assignWith({
                                deploymentconfig: e.name
                            }, this.getLabels(e))
                        },
                        spec: {
                            containers: [ {
                                name: e.name,
                                image: e.name + ":latest",
                                ports: t,
                                env: []
                            } ]
                        }
                    }
                }
            };
        }, e.prototype.makeBuildConfig = function(e) {
            return {
                apiVersion: "v1",
                kind: "BuildConfig",
                metadata: {
                    name: e.name,
                    labels: this.getLabels(e),
                    annotations: this.getAnnotations()
                },
                spec: {
                    output: {
                        to: {
                            kind: "ImageStreamTag",
                            name: e.name + ":latest"
                        }
                    },
                    source: {
                        git: {
                            ref: "master",
                            uri: e.repository
                        },
                        type: "Git"
                    },
                    strategy: {
                        type: "Source",
                        sourceStrategy: {
                            from: {
                                kind: "ImageStreamTag",
                                name: e.imageStreamTag.metadata.name,
                                namespace: e.imageStreamTag.metadata.namespace
                            },
                            env: []
                        }
                    },
                    triggers: [ {
                        type: "ImageChange",
                        imageChange: {}
                    }, {
                        type: "ConfigChange"
                    } ]
                }
            };
        }, e.prototype.makeImageStream = function(e) {
            return {
                apiVersion: "v1",
                kind: "ImageStream",
                metadata: {
                    name: e.name,
                    labels: this.getLabels(e),
                    annotations: this.getAnnotations()
                }
            };
        }, e;
    }();
    t.BuilderAppService = i;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(1), i = r(0), s = function() {
        function e(e, t, r, n, i, s) {
            this.vendors = [], this.$filter = e, this.$q = t, this.constants = r, this.apiService = n, 
            this.dataService = i, this.logger = s;
        }
        return e.prototype.getCatalogItems = function(e) {
            var t = this, r = this.$q.defer(), n = {}, i = 0, s = 0, a = [], o = {
                group: "servicecatalog.k8s.io",
                resource: "serviceclasses"
            };
            return this.apiService.apiInfo(o) && (++i, this.dataService.list(o, {}).then(function(e) {
                n.serviceClasses = e.by("metadata.name");
            }, function() {
                a.push("service classes");
            }).finally(function() {
                t.returnCatalogItems(r, n, ++s, i, a);
            })), ++i, this.dataService.list("imagestreams", {
                namespace: "openshift"
            }).then(function(e) {
                n.imageStreams = e.by("metadata.name");
            }, function() {
                a.push("builder images");
            }).finally(function() {
                t.returnCatalogItems(r, n, ++s, i, a);
            }), e && (++i, this.dataService.list("templates", {
                namespace: "openshift"
            }, null, {
                partialObjectMetadataList: !0
            }).then(function(e) {
                n.templates = e.by("metadata.name");
            }, function() {
                a.push("templates");
            }).finally(function() {
                t.returnCatalogItems(r, n, ++s, i, a);
            })), r.promise;
        }, e.prototype.getProjectCatalogItems = function(e, t, r, n) {
            var i = this;
            void 0 === t && (t = !0), void 0 === r && (r = !0), void 0 === n && (n = !1);
            var s = this.$q.defer(), a = {
                imageStreams: [],
                templates: []
            }, o = 0, c = 0, l = [];
            return t && (o++, this.dataService.list("imagestreams", {
                namespace: e
            }).then(function(e) {
                a.imageStreams = e.by("metadata.name");
            }, function() {
                l.push("builder images");
            }).finally(function() {
                i.returnCatalogItems(s, a, ++c, o, l);
            })), r && (o++, this.dataService.list("templates", {
                namespace: e
            }, null, {
                partialObjectMetadataList: n
            }).then(function(e) {
                a.templates = e.by("metadata.name");
            }, function() {
                l.push("templates");
            }).finally(function() {
                i.returnCatalogItems(s, a, ++c, o, l);
            })), s.promise;
        }, e.prototype.convertToServiceItems = function(e, t, r) {
            var n = this, s = i.map(e, function(e) {
                return n.getServiceItem(e);
            });
            return s = s.concat(i.map(t, function(e) {
                return n.getImageItem(e);
            })), s = s.concat(i.map(r, function(e) {
                return n.getTemplateItem(e);
            })), s = i.reject(s, function(e) {
                return !e;
            }), s = s.sort(function(e, t) {
                var r = i.get(e, "name", "").localeCompare(i.get(t, "name", ""), void 0, {
                    sensitivity: "base"
                });
                return 0 === r && (r = i.get(e, "resource.kind", "").localeCompare(i.get(t, "resource.kind", ""), void 0, {
                    sensitivity: "base"
                })), 0 === r && (r = i.get(e, "resource.metadata.name", "").localeCompare(i.get(t, "resource.metadata.name", ""), void 0, {
                    sensitivity: "base"
                })), r;
            }), this.categorizeItems(s), s;
        }, e.prototype.getServiceItem = function(e) {
            return new a(e, this);
        }, e.prototype.getImageItem = function(e) {
            var t = new o(e, this);
            return t.builderSpecTagName ? t : null;
        }, e.prototype.getTemplateItem = function(e) {
            return new c(e, this);
        }, e.prototype.getPublisherSynonym = function(e) {
            return i.get(this.constants, [ "PUBLISHER_SYNONYMS", e ]) || e;
        }, e.prototype.categorizeItems = function(e) {
            var t, r, s = this;
            this.categories = n.copy(this.constants.SERVICE_CATALOG_CATEGORIES), this.createAllAndOtherMainCategories();
            var a = i.head(this.categories), o = i.get(a, "subCategories[0]"), c = i.last(this.categories), l = i.get(c, "subCategories[0]"), d = {};
            i.each(e, function(e) {
                e.vendor && (d[e.vendor] = !0), r = !1, i.each(s.categories, function(n) {
                    n.tags ? s.hasMatchingTags(n.tags, e.tags) && (r = s.categorizeItem(e, n, "all"), 
                    t = s.filterSubCatsByTags(n.subCategories, e.tags), i.isEmpty(t) ? s.categorizeItem(e, n, "other") : i.each(t, function(t) {
                        s.categorizeItem(e, n, t);
                    })) : (t = s.filterSubCatsByTags(n.subCategories, e.tags), i.isEmpty(t) || (r = s.categorizeItem(e, n, "all"), 
                    i.each(t, function(t) {
                        s.categorizeItem(e, n, t);
                    })));
                }), r || s.categorizeItem(e, c, l), s.categorizeItem(e, a, o);
            }), this.vendors = i.keys(d).sort();
        }, e.prototype.categorizeItem = function(e, t, r) {
            return i.isString(r) && (r = this.getAllOrOtherSubCategory(t, r)), r.items = i.isArray(r.items) ? r.items.concat([ e ]) : [ e ], 
            t.hasItems = r.hasItems = !0;
        }, e.prototype.createAllAndOtherMainCategories = function() {
            this.categories.unshift({
                id: "all",
                label: "All",
                subCategories: [ {
                    id: "all",
                    label: "All"
                } ]
            }), this.categories.push({
                id: "other",
                label: "Other",
                subCategories: [ {
                    id: "all",
                    label: "all"
                } ]
            });
        }, e.prototype.getAllOrOtherSubCategory = function(e, t) {
            var r = i.find(e.subCategories, {
                id: t
            });
            return r || ("other" === t ? (r = {
                id: "other",
                label: "Other"
            }, e.subCategories.push(r)) : (r = {
                id: "all",
                label: "All"
            }, e.subCategories.unshift(r))), r;
        }, e.prototype.hasMatchingTags = function(e, t) {
            return i.some(e, function(e) {
                var r = e.toLowerCase();
                return i.some(t, function(e) {
                    return r === e.toLowerCase();
                });
            });
        }, e.prototype.filterSubCatsByTags = function(e, t) {
            var r = this;
            return i.filter(e, function(e) {
                return r.hasMatchingTags(e.tags, t);
            });
        }, e.prototype.returnCatalogItems = function(e, t, r, n, s) {
            if (!(r < n)) {
                s = i.size(s) ? "Unable to load all content for the catalog. Error loading " + this.formatArray(s) : null;
                var a = this.convertToServiceItems(t.serviceClasses, t.imageStreams, t.templates);
                e.resolve([ a, s ]);
            }
        }, e.prototype.formatArray = function(e) {
            var t = "";
            return 1 === e.length ? t = e[0] : 2 === e.length ? t = e.join(" and ") : e.length > 2 && (t = e.slice(0, -1).join(", ") + ", and " + e.slice(-1)), 
            t + ".";
        }, e;
    }();
    s.$inject = [ "$filter", "$q", "Constants", "APIService", "DataService", "Logger" ], 
    t.CatalogService = s;
    var a = function() {
        function e(e, t) {
            this.resource = e, this.catalogSrv = t, this.imageUrl = this.getImage(), this.iconClass = this.getIcon(), 
            this.name = this.getName(), this.description = this.getDescription(), this.longDescription = this.getLongDescription(), 
            this.tags = this.getTags(), this.kind = "ServiceClass", this.vendor = this.getVendor();
        }
        return e.prototype.getImage = function() {
            return i.get(this.resource, "externalMetadata.imageUrl") || "";
        }, e.prototype.getIcon = function() {
            var e = i.get(this.resource, [ "externalMetadata", "console.openshift.io/iconClass" ]) || "fa fa-clone";
            return e = -1 !== e.indexOf("icon-") ? "font-icon " + e : e;
        }, e.prototype.getName = function() {
            return i.get(this.resource, "externalMetadata.displayName") || this.resource.metadata.name;
        }, e.prototype.getDescription = function() {
            return i.get(this.resource, "description") || "";
        }, e.prototype.getLongDescription = function() {
            return i.get(this.resource, "externalMetadata.longDescription") || "";
        }, e.prototype.getTags = function() {
            return i.get(this.resource, "tags") || [];
        }, e.prototype.getVendor = function() {
            var e = i.get(this.resource, "externalMetadata.providerDisplayName");
            return this.catalogSrv.getPublisherSynonym(e);
        }, e;
    }();
    t.ServiceItem = a;
    var o = function() {
        function e(e, t) {
            this.resource = e, this.catalogSrv = t, this.builderSpecTagName = this.getBuilderSpecTagName(), 
            this.builderSpecTagName && (this.tags = this.getTags(), this.iconClass = this.getIcon(), 
            this.name = this.getName(), this.description = this.getDescription(), this.longDescription = this.getLongDescription(), 
            this.kind = "ImageStream", this.vendor = this.getVendor());
        }
        return e.prototype.getBuilderSpecTagName = function() {
            var e, t = this;
            return this.resource.status ? (this.resource.spec && this.resource.spec.tags && (e = i.find(this.resource.spec.tags, function(e) {
                var r = i.get(e, "annotations.tags");
                if (r && (r = r.split(/\s*,\s*/), i.includes(r, "builder") && !i.includes(r, "hidden"))) return i.some(t.resource.status.tags, function(t) {
                    return t.tag === e.name;
                });
            })), e ? e.name : null) : null;
        }, e.prototype.getTags = function() {
            return this.catalogSrv.$filter("imageStreamTagTags")(this.resource, this.builderSpecTagName);
        }, e.prototype.getIcon = function() {
            var e = this.catalogSrv.$filter("imageStreamTagIconClass")(this.resource, this.builderSpecTagName);
            return e = -1 !== e.indexOf("icon-") ? "font-icon " + e : e;
        }, e.prototype.getName = function() {
            var e = this.catalogSrv.$filter("displayName")(this.resource);
            return e || (e = this.resource.metadata.name), e;
        }, e.prototype.getVendor = function() {
            return "";
        }, e.prototype.getDescription = function() {
            return null;
        }, e.prototype.getLongDescription = function() {
            return null;
        }, e;
    }();
    t.ImageItem = o;
    var c = function() {
        function e(e, t) {
            this.resource = e, this.catalogSrv = t, this.imageUrl = this.getImage(), this.iconClass = this.getIcon(), 
            this.name = this.getName(), this.description = this.getDescription(), this.longDescription = this.getLongDescription(), 
            this.tags = this.getTags(), this.kind = "Template", this.vendor = this.getVendor();
        }
        return e.prototype.getImage = function() {
            return "";
        }, e.prototype.getIcon = function() {
            var e = i.get(this.resource, "metadata.annotations.iconClass", "fa fa-clone");
            return e = -1 !== e.indexOf("icon-") ? "font-icon " + e : e;
        }, e.prototype.getName = function() {
            return this.catalogSrv.$filter("displayName")(this.resource);
        }, e.prototype.getDescription = function() {
            return i.get(this.resource, "metadata.annotations.description", "");
        }, e.prototype.getLongDescription = function() {
            return i.get(this.resource, [ "metadata", "annotations", "template.openshift.io/long-description" ], "");
        }, e.prototype.getTags = function() {
            return i.get(this.resource, "metadata.annotations.tags", "").split(/\s*,\s*/);
        }, e.prototype.getVendor = function() {
            var e = i.get(this.resource, [ "metadata", "annotations", "template.openshift.io/provider-display-name" ]) || "";
            return this.catalogSrv.getPublisherSynonym(e);
        }, e;
    }();
    t.TemplateItem = c;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(0), i = function() {
        function e(e) {
            this.$rootScope = e;
        }
        return e.prototype.getItems = function() {
            var e = localStorage.getItem("catalog-recently-viewed-services");
            return e ? JSON.parse(e) : [];
        }, e.prototype.addItem = function(e) {
            var t = this.getItems();
            n.remove(t, function(t) {
                return t === e;
            }), t.unshift(e), t = n.take(t, 4), this.setRecentlyViewedItems(t);
        }, e.prototype.setRecentlyViewedItems = function(e) {
            localStorage.setItem("catalog-recently-viewed-services", JSON.stringify(e)), this.$rootScope.$emit("recently-viewed-updated");
        }, e;
    }();
    i.$inject = [ "$rootScope" ], t.RecentlyViewedServiceItems = i;
}, function(e, t) {
    e.exports = '<pf-filter-panel config="$ctrl.config">\n  <div class="filter-panel-container">\n    <input type="text" ng-model="$ctrl.keywordFilter.value"\n           class="keyword-filter"\n           placeholder="{{$ctrl.keywordFilter.placeholder}}"\n           ng-keypress="$ctrl.onKeywordKeyPress($event)"\n           ng-disabled="$ctrl.config.totalCount <= 1"\n           autocorrect="off"\n           autocapitalize="none"\n           spellcheck="false">\n    <div class="category" ng-repeat="filter in $ctrl.filterPanelModel" ng-if="!$first">\n      {{filter.title}}\n      <span\n        class="pficon pficon-info vendor-info-icon"\n        data-toggle="tooltip"\n        aria-hidden="true"\n        data-original-title="This filter will only apply to items which contain publisher information. Items that do not have a publisher will not be shown in the filter results.">\n      </span>\n      <ul>\n        <li ng-repeat="value in filter.values">\n          <label>\n            <input type="checkbox"\n                   ng-disabled="$ctrl.config.totalCount <= 1"\n                   ng-model="value.selected"\n                   ng-change="$ctrl.filterChanged()">\n            <span class="category-option-label">{{value.title}}</span>\n          </label>\n        </li>\n      </ul>\n    </div>\n  </div>\n</pf-filter-panel>\n';
}, function(e, t) {
    e.exports = '\x3c!-- Use angular-schema-form to show a form based on the parameter JSON schema. --\x3e\n<ng-form\n  sf-model="$ctrl.model"\n  sf-form="$ctrl.parameterForm"\n  sf-schema="$ctrl.parameterSchema"\n  sf-options="$ctrl.parameterFormDefaults">\n</ng-form>\n';
}, function(e, t) {
    e.exports = '<div class="catalog-search">\n  <form role="form" class="landing-search-form search-pf has-button">\n    <div class="form-group has-clear">\n      <div class="search-pf-input-group">\n        <label for="search-input" class="sr-only">Search Catalog</label>\n        <span class="fa fa-search catalog-search-icon" aria-hidden="true"></span>\n        <input\n            id="search-input"\n            type="search"\n            autocomplete="off"\n            ng-keypress="$ctrl.onKeyPress($event)"\n            class="form-control catalog-search-input"\n            placeholder="Search Catalog"\n            ng-model="$ctrl.searchText"\n            uib-typeahead="item.name for item in $ctrl.search($viewValue)"\n            typeahead-on-select="$ctrl.itemSelected($item)"\n            typeahead-focus-first="false"\n            typeahead-template-url="catalog-search/catalog-search-result.html"\n            autocorrect="off"\n            autocapitalize="off"\n            spellcheck="false">\n        <button\n            type="button"\n            ng-if="$ctrl.searchText"\n            ng-click="$ctrl.searchText = \'\'"\n            class="clear">\n          <span class="sr-only">Clear Search Input</span>\n          <span class="pficon pficon-close" aria-hidden="true"></span>\n        </button>\n      </div>\n    </div>\n  </form>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="order-service">\n  <pf-wizard\n       hide-header="true"\n       hide-sidebar="true"\n       step-class="order-service-wizard-step"\n       wizard-ready="$ctrl.wizardReady"\n       next-title="$ctrl.nextTitle"\n       on-finish="$ctrl.closePanel()"\n       on-cancel="$ctrl.closePanel()"\n       wizard-done="$ctrl.wizardDone">\n    <pf-wizard-step ng-repeat="step in $ctrl.steps track by $index"\n         step-title="{{step.label}}"\n         wz-disabled="{{step.hidden}}"\n         allow-click-nav="step.allowClickNav"\n         next-enabled="step.valid && !$ctrl.updating"\n         prev-enabled="step.prevEnabled"\n         on-show="step.onShow"\n         step-id="{{step.id}}"\n         step-priority="{{$index}}">\n      <div class="wizard-pf-main-inner-shadow-covers">\n        <div class="order-service-details">\n          <div class="order-service-details-top">\n            <div class="service-icon">\n              <span class="icon {{$ctrl.imageStream.iconClass}}"></span>\n            </div>\n            <div class="service-title-area">\n              <div class="service-title">\n                {{$ctrl.imageStream.name}}\n                {{$ctrl.istag.name}}\n              </div>\n              <div class="order-service-tags">\n                <span ng-repeat="tag in $ctrl.istag.annotations.tags.split(\',\')" class="tag">\n                  {{tag}}\n                </span>\n              </div>\n            </div>\n          </div>\n          <div class="order-service-description-block">\n            <p ng-bind-html="$ctrl.istag.annotations.description | linky : \'_blank\'" class="description"></p>\n            <p ng-if="$ctrl.istag.annotations.sampleRepo">\n              Sample Repository:\n              \x3c!-- TODO: Use Git link filter, needs to be added to origin-web-common --\x3e\n              <span ng-bind-html="$ctrl.istag.annotations.sampleRepo | linky : \'_blank\'">\n            </p>\n          </div>\n        </div>\n        <div class="order-service-config">\n          <div ng-include="step.view" class="wizard-pf-main-form-contents"></div>\n        </div>\n      </div>\n    </>\n  </>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="landing-search-area" ng-transclude="landingsearch"></div>\n<div class="landing">\n  <overlay-panel show-panel="$ctrl.orderingPanelVisible" show-close="true" handle-close="$ctrl.closeOrderingPanel">\n    <order-service\n        ng-if="$ctrl.selectedItem.resource.kind === \'ServiceClass\'"\n        base-project-url="{{$ctrl.baseProjectUrl}}"\n        service-class="$ctrl.selectedItem"\n        handle-close="$ctrl.closeOrderingPanel">\n    </order-service>\n    <create-from-builder\n        ng-if="$ctrl.selectedItem.resource.kind === \'ImageStream\'"\n        base-project-url="{{$ctrl.baseProjectUrl}}"\n        image-stream="$ctrl.selectedItem"\n        handle-close="$ctrl.closeOrderingPanel">\n    </create-from-builder>\n  </overlay-panel>\n  <div class="landing-main-area">\n    <div class="landing-header-area" ng-transclude="landingheader"></div>\n    <div class="landing-body-area">\n      <div class="landing-body" ng-transclude="landingbody"></div>\n    </div>\n  </div>\n  <div class="landing-side-bar" ng-transclude="landingside"></div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="order-service">\n  <pf-wizard\n       hide-header="true"\n       hide-sidebar="true"\n       step-class="order-service-wizard-step"\n       wizard-ready="$ctrl.wizardReady"\n       next-title="$ctrl.nextTitle"\n       on-finish="$ctrl.closePanel()"\n       on-cancel="$ctrl.closePanel()"\n       wizard-done="$ctrl.wizardDone">\n    <pf-wizard-step ng-repeat="step in $ctrl.steps track by step.id"\n         step-title="{{step.label}}"\n         wz-disabled="{{step.hidden}}"\n         allow-click-nav="step.allowClickNav"\n         next-enabled="step.valid && !$ctrl.updating"\n         prev-enabled="step.prevEnabled"\n         on-show="step.onShow"\n         step-id="{{step.id}}"\n         step-priority="{{$index}}">\n      <div class="wizard-pf-main-inner-shadow-covers">\n        <div class="order-service-details">\n          <div class="order-service-details-top">\n            <div class="service-icon">\n              <span ng-if="!$ctrl.imageUrl" class="icon {{$ctrl.iconClass}}"></span>\n              <span ng-if="$ctrl.imageUrl" class="image"><img ng-src="{{$ctrl.imageUrl}}" alt=""></span>\n            </div>\n            <div class="service-title-area">\n              <div class="service-title">\n                {{$ctrl.serviceName}}\n              </div>\n              <div ng-if="$ctrl.serviceClass.tags" class="order-service-tags">\n                <span ng-repeat="tag in $ctrl.serviceClass.tags" class="tag">\n                  {{tag}}\n                </span>\n              </div>\n              <div ng-if="$ctrl.serviceClass.resource.externalMetadata.documentationUrl" class="order-service-documentation-url">\n                <a ng-href="{{$ctrl.serviceClass.resource.externalMetadata.documentationUrl}}" target="_blank" class="learn-more-link">Learn More <i class="fa fa-external-link" aria-hidden="true"></i></a>\n              </div>\n            </div>\n          </div>\n          <div class="order-service-description-block">\n            <p ng-if="$ctrl.currentStep.id !== \'plans\' && ($ctrl.selectedPlan.externalMetadata.displayName || $ctrl.selectedPlan.description)">\n              <span ng-if="$ctrl.selectedPlan.externalMetadata.displayName">\n                Plan {{$ctrl.selectedPlan.externalMetadata.displayName}}\n                <span ng-if="$ctrl.selectedPlan.description">&ndash;</span>\n              </span>\n              <span ng-if="$ctrl.selectedPlan.description">{{$ctrl.selectedPlan.description}}</span>\n            </p>\n            <p ng-if="$ctrl.description" ng-bind-html="$ctrl.description | linky : \'_blank\'" class="description"></p>\n            <p ng-if="$ctrl.longDescription" ng-bind-html="$ctrl.longDescription | linky : \'_blank\'" class="description"></p>\n          </div>\n        </div>\n        <div class="order-service-config">\n          <div ng-include="step.view" class="wizard-pf-main-form-contents"></div>\n        </div>\n      </div>\n    </>\n  </>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="catalogs-overlay-modal" role="dialog">\n  <div ng-if="$ctrl.shown" class="modal-backdrop fade in"></div>\n  <div ng-if="$ctrl.shown" class="catalogs-overlay-panel-wrapper">\n    <div class="catalogs-overlay-panel-grow-height">\n      <div class="catalogs-overlay-panel" ng-class="{\'catalogs-overlay-panel-single-column\' : $ctrl.singleColumn}">\n        <a ng-if="$ctrl.showClose" ng-click="$ctrl.closePanel()">\n          <span class="catalogs-overlay-panel-close pficon pficon-close"></span>\n        </a>\n        <div class="catalogs-overlay-panel-body" ng-transclude>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div ng-if="$ctrl.loading" class="catalog-projects-spinner-container">\n  <div class="spinner spinner-inverse spinner-xl"></div>\n</div>\n<div class="catalog-projects-summary-panel" ng-show="!$ctrl.loading">\n  <button ng-if="$ctrl.canCreate" class="create-button btn btn-primary" ng-click="$ctrl.openNewProjectPanel($event)">\n    <span class="fa fa-plus"></span>\n    <span class="create-button-text">Create Project</span>\n  </button>\n  <origin-modal-popup class="catalog-create-project" modal-title="Create Project" shown="$ctrl.newProjectPanelShown" on-close="$ctrl.closeNewProjectPanel" reference-element="$ctrl.modalPopupElement">\n    <create-project is-dialog="true" redirect-action="$ctrl.onNewProject" on-cancel="$ctrl.closeNewProjectPanel"></create-project>\n  </origin-modal-popup>\n  <h2 class="summary-title secondary" ng-if="!$ctrl.projects || !$ctrl.projects.length">Getting Started</h2>\n  <h2 class="summary-title secondary" ng-if="$ctrl.projects && $ctrl.projects.length">\n    <a href="{{$ctrl.projectsUrl}}">My Projects</a>\n  </h2>\n  <div ng-if="!$ctrl.canCreate">\n    <span ng-if="!$ctrl.newProjectMessage">\n      A cluster admin can create a project for you by running the command:\n      <div class="code-block">\n        <code class="projects-instructions-link">oc adm <span class="command-arg">new-project</span> &lt;projectname&gt; <span class="command-arg">--admin={{$ctrl.user.metadata.name || \'&lt;YourUsername&gt;\'}}</span></code>\n      </div>\n    </span>\n    <span ng-if="$ctrl.newProjectMessage" ng-bind-html="$ctrl.newProjectMessage | linky : \'_blank\'"></span>\n  </div>\n  <div ng-if="$ctrl.isProjectListIncomplete">\n    <p class="text-muted">\n      The complete list of your projects could not be loaded. Type a project name to go to that project.\n    </p>\n    <form>\n      <div class="form-group">\n        <label for="typed-project-name">Project Name</label>\n        <div class="input-group">\n          <input\n            class="form-control"\n            type="text"\n            id="typed-project-name"\n            required\n            minlength="2"\n            ng-model="$ctrl.typedProjectName"\n            autocorrect="off"\n            autocapitalize="none"\n            spellcheck="false">\n          <span class="input-group-btn">\n            <button class="btn btn-default go-to-project-button"\n                    type="submit"\n                    ng-disabled="!$ctrl.typedProjectName"\n                    ng-click="$ctrl.goToProject($ctrl.typedProjectName)">\n              <i class="fa fa-arrow-right" aria-hidden="true"></i>\n              <span class="sr-only">Go to Project</span>\n            </button>\n          </span>\n        </div>\n      </div>\n    </form>\n  </div>\n  <div ng-if="$ctrl.projects && $ctrl.projects.length" class="catalog-project-summary-list">\n    <div class="projects-count">\n      <strong>{{$ctrl.projects.length}}</strong>\n      of\n      <strong>{{$ctrl.totalProjects}}</strong>\n      Projects\n      <a href="{{$ctrl.projectsUrl}}" class="projects-view-all">View All</a>\n    </div>\n    <div id="catalog-projects-summary-list">\n      <div ng-repeat="project in $ctrl.projects track by (project | uid)" class="project-tile tile-click">\n        <div class="dropdown  dropdown-kebab-pf" uib-dropdown="">\n          <button class="btn btn-link uib-dropdown-toggle" type="button" id="dropdownKebab" aria-haspopup="true" aria-expanded="true" uib-dropdown-toggle>\n            <span class="fa fa-ellipsis-v"></span>\n          </button>\n          <ul class="uib-dropdown-menu dropdown-menu-right" aria-labelledby="dropdownKebab">\n            <li><a href="" ng-click="$ctrl.onViewMemebership(project)">View Membership</a></li>\n            <li><a href="" ng-click="$ctrl.editProject(project)">Edit Project</a></li>\n            <li>\n              <delete-project\n                  label="Delete Project"\n                  project="project"\n                  type-name-to-confirm="true"\n                  stay-on-current-page="true"\n                  success="$ctrl.onDeleteProject">\n              </delete-project>\n            </li>\n          </ul>\n        </div>\n        <h3 class="project-tile-header">\n          <a href="{{project | projectUrl : $ctrl.baseProjectUrl}}" class="project-title tile-target">{{project | displayName}}</a>\n          <span ng-if="project.status.phase != \'Active\'"\n            data-toggle="popover"\n            data-trigger="hover"\n            data-content="This project has been marked for deletion."\n            class="pficon pficon-warning-triangle-o"></span>\n        </h3>\n        <p class="project-date">\n          <span ng-if="project | displayName : true"><span class="word-break" ng-bind-html="project.metadata.name"></span> &ndash;</span>\n          created\n          <span ng-if="project | annotation : \'openshift.io/requester\'">by <span class="word-break" ng-bind-html="project | annotation : \'openshift.io/requester\'"></span></span>\n          <span am-time-ago="project.metadata.creationTimestamp"></span>\n        </p>\n        <div class="project-description" ng-if="project | description">\n          <truncate-long-text content="project | description" use-word-boundary="true" limit="120"></truncate-long-text>\n        </div>\n        <origin-modal-popup class="catalog-edit-project" modal-title="Edit Project" shown="$ctrl.editProjectPanelShown && $ctrl.edittingProject === project" on-close="$ctrl.closeEditProjectPanel">\n          <edit-project project="$ctrl.edittingProject" is-dialog="true" redirect-action="$ctrl.onEditProject" on-cancel="$ctrl.closeEditProjectPanel"></edit-project>\n        </origin-modal-popup>\n      </div>\n    </div>\n  </div>\n  <div ng-if="$ctrl.showGetStarted">\n    <div class="getting-started-panel">\n      <h2 class="secondary" ng-if="$ctrl.projects && $ctrl.projects.length > 0">Getting Started</h2>\n      <button ng-if="$ctrl.startTour()" class="getting-started-button btn btn-default hidden-xs" ng-class="{\'with-projects\': $ctrl.projects && $ctrl.projects.length}" ng-click="$ctrl.handleGettingStartedClick()">\n        <span class="fa fa-info-circle fa-2"></span>\n        <span class="getting-started-button-text">Take Home Page Tour</span>\n      </button>\n    </div>\n    <div class="resources-panel">\n      <ul>\n        <li ng-repeat="resource in $ctrl.resourceLinks">\n          <a href="{{resource.href}}" target="_blank" title="{{resource.href}}">{{resource.title}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n  <div ng-if="$ctrl.recentlyViewedItems.length">\n    <h2 class="secondary">Recently Viewed</h2>\n    <div class="services-view">\n      <a href="" class="services-item" ng-repeat="item in $ctrl.recentlyViewedItems track by (item.resource | uid)"\n           ng-click="$ctrl.orderService(item)">\n        <div ng-if="!item.imageUrl" class="services-item-icon">\n          <span class="{{item.iconClass}}"></span>\n        </div>\n        <div ng-if="item.imageUrl" class="services-item-icon services-item-img">\n          <img ng-src="{{item.imageUrl}}">\n        </div>\n        <div class="services-item-name" title="{{item.name}}" aria-hidden="true">{{item.name}}</div>\n      </a>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<span ng-if="$ctrl.hasSaasOfferings()" class="saas-offerings-container">\n  <h1 ng-if="$ctrl.saasTitle">{{$ctrl.saasTitle}}</h1>\n  <div class="saas-list" ng-class="{\'expanded\': $ctrl.sassListExpanded, \'items-overflow\': $ctrl.itemsOverflow}" items="$ctrl.saasOfferings">\n    <div class="card" ng-repeat="item in $ctrl.saasOfferings">\n      <a ng-href="{{item.url}}" target="_blank" class="card-content">\n        <div class="card-icon">\n          <img ng-if="item.image" ng-src="{{item.image}}" alt="">\n          <span ng-if="!item.image" class="icon {{item.icon}}" aria-hidden="true"></span>\n        </div>\n        <div class="card-title">{{item.title}}</div>\n        <truncate-long-text\n                class="card-description hidden-xs"\n                content="item.description"\n                limit="120"\n                use-word-boundary="true">\n        </truncate-long-text>\n      </a>\n    </div>\n  </div>\n  <div ng-if="$ctrl.itemsOverflow" class="sass-list-expander-container">\n    <a href="" class="sass-list-expander" ng-class="{\'expanded\': $ctrl.sassListExpanded}" ng-click="$ctrl.toggleListExpand()">\n      Show <span class="more">More</span><span class="less">Less</span>\n    </a>\n  </div>\n</span>\n';
}, function(e, t) {
    e.exports = '<ng-form name="$ctrl.forms.selectProjectForm">\n  <div class="form-group" ng-class="{\'has-error\' : $ctrl.forms.selectProjectForm.selectProject.$error.cannotAddToProject ||\n                                                   ($ctrl.forms.selectProjectForm.selectProject.$touched &&\n                                                    $ctrl.forms.selectProjectForm.selectProject.$invalid)}">\n    <label class="control-label required">Add to Project</label>\n    <ui-select\n        name="selectProject"\n        ng-model="$ctrl.selectedProject"\n        ng-change="$ctrl.onSelectProjectChange()"\n        ng-required="true"\n        search-enabled="$ctrl.searchEnabled">\n      <ui-select-match placeholder="Select or create a project">\n        {{$select.selected | displayName}}\n      </ui-select-match>\n      <ui-select-choices repeat="project in $ctrl.projects | searchProjects : $select.search track by (project | uid)"\n                         group-by="$ctrl.groupChoicesBy">\n        <span ng-bind-html="project | displayName | highlightKeywords : $select.search"></span>\n        <span ng-if="project | displayName : true" class="small text-muted">\n          <span ng-if="project.metadata.name">&ndash;</span>\n          <span ng-bind-html="project.metadata.name | highlightKeywords : $select.search"></span>\n        </span>\n      </ui-select-choices>\n    </ui-select>\n    <div ng-if="$ctrl.forms.selectProjectForm.selectProject.$error.cannotAddToProject">\n        <span class="help-block">\n          You are not authorized to add to this project\n        </span>\n    </div>\n    <div class="has-error" ng-if="$ctrl.forms.selectProjectForm.selectProject.$error.required &&\n                                  $ctrl.forms.selectProjectForm.selectProject.$touched">\n        <span class="help-block">\n          Please select or create a project\n        </span>\n    </div>\n  </div>\n</ng-form>\n\n<ng-form name="$ctrl.forms.createProjectForm"\n    ng-if="$ctrl.isNewProject()">\n  <div class="form-group">\n    <label for="name" class="control-label required">Project Name</label>\n    <div ng-class="{\'has-error\': ($ctrl.forms.createProjectForm.name.$error.pattern && $ctrl.forms.createProjectForm.name.$touched) || $ctrl.nameTaken}">\n      <input class="form-control"\n          name="name"\n          id="name"\n          placeholder="my-project"\n          type="text"\n          required\n          take-focus\n          minlength="2"\n          maxlength="63"\n          pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?"\n          aria-describedby="nameHelp"\n          ng-model="$ctrl.selectedProject.metadata.name"\n          osc-unique="$ctrl.existingProjectNames"\n          ng-model-options="{ updateOn: \'default blur\' }"\n          ng-change="$ctrl.onNewProjectNameChange()"\n          autocorrect="off"\n          autocapitalize="off"\n          spellcheck="false">\n      <div class="help-block">A unique name for the project.</div>\n      <div class="has-error" ng-if="$ctrl.forms.createProjectForm.name.$error.minlength && $ctrl.forms.createProjectForm.name.$touched">\n        <span id="nameHelp" class="help-block">\n          Name must have at least two characters.\n        </span>\n      </div>\n      <div class="has-error" ng-if="$ctrl.forms.createProjectForm.name.$error.pattern && $ctrl.forms.createProjectForm.name.$touched">\n        <span id="nameHelp" class="help-block">\n          Project names may only contain lower-case letters, numbers, and dashes.\n          They may not start or end with a dash.\n        </span>\n      </div>\n      <div class="has-error" ng-if="$ctrl.nameTaken || $ctrl.forms.createProjectForm.name.$error.oscUnique">\n        <span class="help-block">\n          This name is already in use. Please choose a different name.\n        </span>\n      </div>\n    </div>\n  </div>\n\n  <div class="form-group">\n    <label for="displayName" class="control-label">Project Display Name</label>\n    <input class="form-control"\n      name="displayName"\n      id="displayName"\n      placeholder="My Project"\n      type="text"\n      ng-model="$ctrl.selectedProject.metadata.annotations[\'new-display-name\']">\n  </div>\n\n  <div class="form-group">\n    <label for="description" class="control-label">Project Description</label>\n    <textarea class="form-control"\n      name="description"\n      id="description"\n      placeholder="A short description."\n      ng-model="$ctrl.selectedProject.metadata.annotations[\'openshift.io/description\']"></textarea>\n  </div>\n</ng-form>\n';
}, function(e, t) {
    e.exports = '<div class="services-view" ng-style="$ctrl.viewStyle">\n  <div ng-if="!$ctrl.loaded" class="spinner-container">\n    <div class="spinner spinner-xl"></div>\n  </div>\n  <div ng-if="$ctrl.loaded" class="services-view-container mobile-{{$ctrl.mobileView}}-view">\n    <div class="add-methods">\n      <h1>Browse Catalog</h1>\n      <div ng-if="$ctrl.onDeployImageSelected || $ctrl.onFromFileSelected || $ctrl.onCreateFromProject">\n        <ul class="add-other hidden-md hidden-lg">\n          <li uib-dropdown="" class="dropdown">\n            <a uib-dropdown-toggle="" class="dropdown-toggle" id="add-methods-dropdown" href="" aria-haspopup="true" aria-expanded="false">\n              Custom Add\n              <span class="caret" aria-hidden="true"></span>\n            </a>\n            <ul class="uib-dropdown-menu dropdown-menu pull-right" aria-labelledby="add-methods-dropdown">\n              \x3c!-- note these are duplicated below --\x3e\n              <li ng-if="$ctrl.onDeployImageSelected">\n                <a href="" ng-click="$ctrl.onDeployImageSelected()">Deploy Image</a>\n              </li>\n              <li ng-if="$ctrl.onFromFileSelected">\n                <a href="" ng-click="$ctrl.onFromFileSelected()">Import YAML / JSON</a>\n              </li>\n              <li ng-if="$ctrl.onCreateFromProject">\n                <a href="" ng-click="$ctrl.onCreateFromProject()">Select from Project</a>\n              </li>\n            </ul>\n          </li>\n        </ul>\n        <ul class="add-other hidden-xs hidden-sm">\n          \x3c!-- note these are duplicated above --\x3e\n          <li ng-if="$ctrl.onDeployImageSelected">\n            <a href="" ng-click="$ctrl.onDeployImageSelected()">Deploy Image</a>\n          </li>\n          <li ng-if="$ctrl.onFromFileSelected">\n            <a href="" ng-click="$ctrl.onFromFileSelected()">Import YAML / JSON</a>\n          </li>\n          <li ng-if="$ctrl.onCreateFromProject">\n            <a href="" ng-click="$ctrl.onCreateFromProject()">Select from Project</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <ul class="nav nav-tabs nav-tabs-pf services-categories">\n      <li ng-repeat="category in $ctrl.categories"\n          ng-if="category.hasItems"\n          ng-class="{ active: $ctrl.currentFilter === category.id }">\n        <a href="" id="{{\'category-\'+category.id}}" class="services-category-heading" ng-click="$ctrl.selectCategory(category.id)">{{category.label}}</a>\n        <a ng-click="$ctrl.mobileView = \'categories\'" class="services-back-link" href="">Back</a>\n      </li>\n    </ul>\n\n    <div class="services-inner-container">\n      \x3c!-- Do not show sub-category items for \'All\' or \'Other\' main categories --\x3e\n      <ul class="services-sub-categories"\n          ng-if="$ctrl.currentFilter !== \'other\' && $ctrl.currentFilter !== \'all\'">\n        <li ng-repeat="subCategory in $ctrl.subCategories track by subCategory.id"\n             ng-if="subCategory.hasItems"\n             ng-attr-id="{{subCategory.id}}"\n             class="services-sub-category"\n             ng-class="{ active: $ctrl.currentSubFilter === subCategory.id }">\n          <a href="" id="{{\'services-sub-category-\'+subCategory.id}}"\n             class="services-sub-category-tab" ng-click="$ctrl.selectSubCategory(subCategory.id)">\n            <div class="services-sub-category-tab-image" ng-if="subCategory.imageUrl">\n              <img ng-src="{{subCategory.imageUrl}}" alt="">\n            </div>\n            <div class="services-sub-category-tab-icon {{subCategory.icon}}" ng-if="subCategory.icon && !subCategory.imageUrl"></div>\n            <div class="services-sub-category-tab-name">{{subCategory.label}}</div>\n          </a>\n         <a ng-click="$ctrl.mobileView = \'subcategories\'" class="services-back-link" href="">Back</a>\n          <div ng-if="$ctrl.currentSubFilter === subCategory.id" class="services-items">\n            <catalog-filter class="services-items-filter"\n                            config="$ctrl.filterConfig"\n                            filter-on-keyword="$ctrl.keywordFilterValue"\n                            apply-filters="$ctrl.applyFilters($event)">\n            </catalog-filter>\n            <a href="" class="services-item" ng-repeat="item in $ctrl.filteredItems track by item.resource.metadata.uid" ng-click="$ctrl.serviceViewItemClicked(item)">\n              <div ng-if="!item.imageUrl" class="services-item-icon">\n                <span class="{{item.iconClass}}"></span>\n              </div>\n              <div ng-if="item.imageUrl" class="services-item-icon">\n                <img ng-src="{{item.imageUrl}}" alt="">\n              </div>\n              <div class="services-item-name" title="{{item.name}}">\n                {{item.name}}\n              </div>\n            </a>\n          </div>\n        </li>\n      </ul>\n\n      \x3c!-- Show catalog item for \'All\' and \'Other\' main categories --\x3e\n      <div ng-if="$ctrl.currentFilter === \'other\' || $ctrl.currentFilter === \'all\'" class="services-no-sub-categories">\n        <div class="services-items">\n          <div ng-if="$ctrl.isEmpty">There are no catalog items.</div>\n          <catalog-filter ng-if="!$ctrl.isEmpty"\n                          class="services-items-filter"\n                          config="$ctrl.filterConfig"\n                          filter-on-keyword="$ctrl.keywordFilterValue"\n                          apply-filters="$ctrl.applyFilters($event)">\n          </catalog-filter>\n          <a href="" class="services-item" ng-repeat="item in $ctrl.filteredItems track by item.resource.metadata.uid" ng-click="$ctrl.serviceViewItemClicked(item)">\n            <div ng-if="!item.imageUrl" class="services-item-icon">\n              <span class="{{item.iconClass}}"></span>\n            </div>\n            <div ng-if="item.imageUrl" class="services-item-icon">\n              <img ng-src="{{item.imageUrl}}" alt="">\n            </div>\n            <div class="services-item-name" title="{{item.name}}">\n              {{item.name}}\n            </div>\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(1), i = r(0), s = function() {
        function e(e, t) {
            var r = this;
            this.ctrl = this, this.onKeywordKeyPress = function(e) {
                13 === e.which && r.ctrl.keywordFilter.value.length > 0 && (r.ctrl.keywordFilter.values.push(r.ctrl.keywordFilter.value), 
                delete r.ctrl.keywordFilter.value, r.constructFiltersFromModel());
            }, this.filterChanged = function() {
                r.constructFiltersFromModel();
            }, this.onFilterChange = function(e, t, i) {
                n.isDefined(t) && n.isDefined(i) ? r.updateFilterPanelModel(t, i) : r.resetFilterPanelModel(), 
                r.constructFiltersFromModel();
            }, this.$scope = e, this.Catalog = t;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.filterPanelModel = [], this.ctrl.keywordFilter = {
                id: "keyword",
                title: "Keyword",
                placeholder: "Filter by Keyword",
                filterType: "text",
                values: []
            }, this.ctrl.filterPanelModel.push(this.ctrl.keywordFilter), i.isEmpty(this.Catalog.vendors) || (this.ctrl.VendorFilter = {
                id: "vendors",
                title: "Publisher",
                filterType: "checkbox",
                values: i.map(this.Catalog.vendors, function(e) {
                    return {
                        id: e,
                        title: e,
                        value: e,
                        selected: !1
                    };
                })
            }, this.ctrl.filterPanelModel.push(this.ctrl.VendorFilter)), this.ctrl.filterOnKeyword && (this.ctrl.keywordFilter.values = [ this.ctrl.filterOnKeyword ], 
            this.constructFiltersFromModel()), this.ctrl.config.onFilterChange = this.onFilterChange, 
            this.removeClearFilterListener = this.$scope.$on("clear-filters", function() {
                e.resetFilterPanelModel(), e.constructFiltersFromModel();
            });
        }, e.prototype.$onChanges = function(e) {
            e.filterOnKeyword && e.filterOnKeyword.currentValue && (this.resetFilterPanelModel(), 
            this.ctrl.keywordFilter.values = [ this.ctrl.filterOnKeyword ], this.constructFiltersFromModel());
        }, e.prototype.$onDestroy = function() {
            this.removeClearFilterListener();
        }, e.prototype.createAppliedFilter = function(e, t) {
            return {
                id: e.id,
                title: e.title,
                filterType: e.filterType,
                values: t
            };
        }, e.prototype.constructFiltersFromModel = function() {
            var e = this, t = [];
            i.each(this.ctrl.filterPanelModel, function(r) {
                if (!i.isEmpty(r.values)) if ("checkbox" === r.filterType) {
                    var n = [];
                    i.each(r.values, function(e) {
                        e.selected && n.push(e.value);
                    }), i.isEmpty(n) || t.push(e.createAppliedFilter(r, n));
                } else i.each(r.values, function(n) {
                    t.push(e.createAppliedFilter(r, [ n ]));
                });
            }), this.ctrl.config.appliedFilters = t, this.ctrl.applyFilters && this.ctrl.applyFilters({
                $event: {
                    appliedFilters: this.ctrl.config.appliedFilters
                }
            });
        }, e.prototype.updateFilterPanelModel = function(e, t) {
            var r = i.find(this.ctrl.filterPanelModel, {
                id: e
            });
            switch (r.filterType) {
              case "text":
                i.remove(r.values, function(e) {
                    return e === t;
                });
                break;

              case "checkbox":
                i.find(r.values, {
                    value: t
                }).selected = !1;
            }
        }, e.prototype.resetFilterPanelModel = function() {
            i.each(this.ctrl.filterPanelModel, function(e) {
                if (!i.isEmpty(e.values)) switch (e.filterType) {
                  case "text":
                    e.values = [];
                    break;

                  case "checkbox":
                    i.each(e.values, function(e) {
                        e.selected = !1;
                    });
                }
            });
        }, e;
    }();
    s.$inject = [ "$scope", "Catalog" ], t.CatalogFilterController = s;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(0), i = function() {
        function e() {
            this.ctrl = this;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.parameterFormDefaults = {
                formDefaults: {
                    disableSuccessState: !0,
                    feedback: !1
                },
                pristine: {
                    errors: !1,
                    success: !0
                }
            };
        }, e.prototype.$onChanges = function(e) {
            e.parameterFormDefinition && (this.ctrl.parameterForm = this.cloneParameterForm(this.ctrl.parameterFormDefinition) || [ "*" ]);
        }, e.prototype.cloneParameterForm = function(t) {
            if (n.isString(t)) return t;
            if (n.isArray(t)) return n.map(t, n.bind(this.cloneParameterForm, this));
            if (n.isObject(t)) {
                var r = {};
                return t.key && (r.key = t.key), e.ALLOWED_FORM_INPUT_TYPES[t.type] && (r.type = t.type), 
                "fieldset" === r.type && n.isArray(t.items) && (t.title && (r.title = t.title), 
                r.items = this.cloneParameterForm(t.items)), r.key || r.type ? r : null;
            }
        }, e;
    }();
    i.ALLOWED_FORM_INPUT_TYPES = {
        fieldset: !0,
        text: !0,
        textarea: !0,
        password: !0,
        checkbox: !0,
        select: !0
    }, t.CatalogParametersController = i;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(0), i = function() {
        function e(e, t, r, n, i) {
            var s = this;
            this.ctrl = this, this.loaded = !1, this.maxResultsToShow = 5, this.onKeyPress = function(e) {
                13 === e.which && s.ctrl.searchText && (s.$rootScope.$emit("filter-catalog-items", {
                    searchText: s.ctrl.searchText
                }), s.ctrl.searchText = "");
            }, this.$rootScope = e, this.$scope = t, this.$q = r, this.Catalog = n, this.KeywordService = i;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.searchText = "";
        }, e.prototype.$onChanges = function(e) {
            if (e.catalogItems && this.ctrl.catalogItems && (this.loaded = !0, this.searchDeferred)) {
                var t = this.filterForKeywords(this.ctrl.searchText);
                this.searchDeferred.resolve(t), this.searchDeferred = null;
            }
        }, e.prototype.itemSelected = function(e) {
            "viewAll" === e.id ? this.$rootScope.$emit("filter-catalog-items", {
                searchText: this.ctrl.searchText
            }) : "viewNone" !== e.id && this.$scope.$emit("open-overlay-panel", e), this.ctrl.searchText = "";
        }, e.prototype.search = function(e) {
            return e ? this.loaded ? this.filterForKeywords(e) : (this.searchDeferred = this.$q.defer(), 
            this.searchDeferred.promise) : [];
        }, e.prototype.filterForKeywords = function(e) {
            var t = this.KeywordService.generateKeywords(e), r = this.KeywordService.filterForKeywords(this.ctrl.catalogItems, [ "name", "tags" ], t), i = n.size(r), s = n.take(r, this.maxResultsToShow);
            return 0 === i ? s.push({
                id: "viewNone",
                text: "No results found for Keyword: " + e,
                name: e
            }) : 1 === i ? s.push({
                id: "viewAll",
                text: "View the result for Keyword: " + e,
                name: e
            }) : i > 1 && s.push({
                id: "viewAll",
                text: "View all " + i + " results for Keyword: " + e,
                name: e
            }), s;
        }, e;
    }();
    i.$inject = [ "$rootScope", "$scope", "$q", "Catalog", "KeywordService" ], t.CatalogSearchController = i;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(1), i = r(0), s = r(56), a = function() {
        function e(e, t, r, n, s, a, o, c, l, d, p) {
            var h = this;
            this.ctrl = this, this.watches = [], this.clearValidityWatcher = function() {
                h.validityWatcher && (h.validityWatcher(), h.validityWatcher = void 0);
            }, this.showConfig = function() {
                h.clearValidityWatcher(), h.ctrl.nextTitle = h.bindStep.hidden ? "Create" : "Next >", 
                h.reviewStep.allowed = h.bindStep.hidden && h.configStep.valid, h.validityWatcher = h.$scope.$watch("$ctrl.builderForm.$valid", function(e, t) {
                    h.configStep.valid = e;
                });
            }, this.showBind = function() {
                h.clearValidityWatcher(), h.ctrl.nextTitle = "Create", h.reviewStep.allowed = !0;
            }, this.showResults = function() {
                h.clearValidityWatcher(), h.ctrl.nextTitle = "Close", h.ctrl.wizardDone = !0, h.createApp();
            }, this.onProjectUpdate = function() {
                !h.instancesSupported || h.isNewProject() ? (h.ctrl.serviceInstances = [], h.updateBindability()) : h.ctrl.showPodPresets && (h.ctrl.updating = !0, 
                h.DataService.list({
                    group: "servicecatalog.k8s.io",
                    resource: "serviceinstances"
                }, {
                    namespace: h.ctrl.selectedProject.metadata.name
                }, null, {
                    errorNotification: !1
                }).then(function(e) {
                    h.ctrl.serviceInstances = i.filter(i.toArray(e.by("metadata.name")), h.isServiceBindable), 
                    h.sortServiceInstances(), h.ctrl.updating = !1, h.updateBindability();
                }, function(e) {
                    h.Logger.warn("Failed to list instances in namespace " + h.ctrl.selectedProject.metadata.name, e), 
                    h.ctrl.updating = !1, h.ctrl.serviceInstances = [], h.updateBindability();
                }));
            }, this.isServiceBindable = function(e) {
                return h.BindingService.isServiceBindable(e, h.ctrl.serviceClasses);
            }, this.$scope = e, this.$filter = t, this.$location = r, this.$q = n, this.BuilderAppService = s, 
            this.ProjectsService = a, this.DataService = o, this.APIService = c, this.BindingService = l, 
            this.Logger = d, this.ctrl.serviceToBind = null, this.ctrl.showPodPresets = i.get(p, [ "ENABLE_TECH_PREVIEW_FEATURE", "pod_presets" ], !1);
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.configStep = {
                label: "Configuration",
                id: "configure",
                view: "create-from-builder/create-from-builder-configure.html",
                valid: !1,
                allowed: !0,
                hidden: !1,
                allowClickNav: !0,
                onShow: this.showConfig
            }, this.bindStep = {
                label: "Binding",
                id: "bind",
                view: "create-from-builder/create-from-builder-bind.html",
                valid: !0,
                allowed: !1,
                hidden: !this.ctrl.showPodPresets,
                allowClickNav: !0,
                onShow: this.showBind
            }, this.reviewStep = {
                label: "Results",
                id: "results",
                view: "create-from-builder/create-from-builder-results.html",
                valid: !0,
                allowed: !1,
                hidden: !1,
                prevEnabled: !1,
                allowClickNav: !1,
                onShow: this.showResults
            }, this.ctrl.steps = [ this.configStep, this.bindStep, this.reviewStep ], this.ctrl.versions = this.getVersions(), 
            this.ctrl.istag = i.head(this.ctrl.versions), this.ctrl.nameMaxLength = 24, this.ctrl.namePattern = /^[a-z]([-a-z0-9]*[a-z0-9])?$/, 
            this.ctrl.repositoryPattern = /^[a-z][a-z0-9+.-@]*:(\/\/)?[0-9a-z_-]+/, this.ctrl.wizardDone = !1, 
            this.ctrl.serviceToBind = null, this.ctrl.updating = !1, this.ctrl.serviceInstances = [], 
            this.selectedProjectWatch = this.$scope.$watch(function() {
                return e.ctrl.selectedProject;
            }, this.onProjectUpdate), this.getServiceClasses(), this.instancesSupported = !!this.APIService.apiInfo({
                group: "servicecatalog.k8s.io",
                resource: "serviceinstances"
            });
        }, e.prototype.closePanel = function() {
            n.isFunction(this.ctrl.handleClose) && this.ctrl.handleClose();
        }, e.prototype.$onDestroy = function() {
            this.DataService.unwatchAll(this.watches), this.selectedProjectWatch(), this.clearValidityWatcher();
        }, e.prototype.fillSampleRepo = function() {
            if (this.ctrl.repository = i.get(this, "ctrl.istag.annotations.sampleRepo"), !this.ctrl.name && this.ctrl.repository) {
                var e = this.ctrl.repository.substr(this.ctrl.repository.lastIndexOf("/") + 1);
                e = e.replace(/\.git$/, ""), e = i.truncate(e, this.ctrl.nameMaxLength), e = i.kebabCase(e), 
                this.ctrl.namePattern.test(e) && (this.ctrl.name = e);
            }
        }, e.prototype.navigateToAdvancedForm = function() {
            var e = "project/{project}/create/fromimage?imageStream={imageStream}&imageTag={imageTag}&namespace={namespace}&displayName={displayName}&name={name}&sourceURI={sourceURI}&advanced=true", t = s.expand(e, {
                project: this.ctrl.selectedProject.metadata.name,
                imageStream: this.ctrl.imageStream.resource.metadata.name,
                imageTag: this.ctrl.istag.name,
                namespace: this.ctrl.imageStream.resource.metadata.namespace,
                displayName: this.ctrl.imageStream.name,
                name: this.ctrl.name || "",
                sourceURI: this.ctrl.repository || ""
            }).toString();
            this.$location.url(t);
        }, e.prototype.referencesSameImageStream = function(e) {
            return e.from && "ImageStreamTag" === e.from.kind && -1 === e.from.name.indexOf(":") && !e.from.namespace;
        }, e.prototype.getVersions = function() {
            var e = this;
            this.ctrl.referencedBy = {};
            var t = {}, r = {}, n = i.get(this, "ctrl.imageStream.resource.spec.tags", []);
            i.each(n, function(n) {
                if (e.referencesSameImageStream(n)) return t[n.name] = n.from.name, e.ctrl.referencedBy[n.from.name] = e.ctrl.referencedBy[n.from.name] || [], 
                void e.ctrl.referencedBy[n.from.name].push(n.name);
                var s = i.get(n, "annotations.tags", ""), a = s.split(/\s*,\s*/);
                i.includes(a, "builder") && !i.includes(a, "hidden") && (r[n.name] = n);
            });
            var s = [], a = i.get(this, "ctrl.imageStream.resource.status.tags", []);
            return i.each(a, function(e) {
                var t = r[e.tag];
                t && s.push(t);
            }), s;
        }, e.prototype.getImageStreamTag = function() {
            var e = this.ctrl.imageStream.resource.metadata.name + ":" + this.ctrl.istag.name;
            return this.DataService.get("imagestreamtags", e, {
                namespace: "openshift"
            });
        }, e.prototype.sortServiceInstances = function() {
            if (this.ctrl.serviceInstances) {
                var e = i.toArray(this.ctrl.serviceInstances), t = this.$filter("statusCondition");
                e.sort(function(e, r) {
                    var n = "True" === i.get(t(e, "Ready"), "status");
                    if (n === ("True" === i.get(t(r, "Ready"), "status"))) {
                        var s = i.get(e, "metadata.creationTimestamp");
                        return i.get(r, "metadata.creationTimestamp").localeCompare(s);
                    }
                    return n ? -1 : 1;
                }), this.ctrl.serviceInstances = e;
            }
        }, e.prototype.updateBindability = function() {
            this.ctrl.wizardDone || (this.bindStep.hidden = i.size(this.ctrl.serviceInstances) < 1, 
            this.ctrl.serviceToBind = null, this.bindStep.hidden ? this.ctrl.nextTitle = "Create" : this.ctrl.nextTitle = "Next >");
        }, e.prototype.isNewProject = function() {
            return !i.has(this.ctrl.selectedProject, "metadata.uid");
        }, e.prototype.createApp = function() {
            var e = this;
            this.createProjectIfNecessary().then(function(t) {
                e.ctrl.selectedProject = t, e.getImageStreamTag().then(function(t) {
                    var r = e.BuilderAppService.makeAPIObjects({
                        name: e.ctrl.name,
                        repository: e.ctrl.repository,
                        namespace: e.ctrl.selectedProject.metadata.name,
                        imageStreamTag: t
                    });
                    e.createAPIObjects(r), e.ctrl.serviceToBind && e.bindService(i.find(r, {
                        kind: "DeploymentConfig"
                    }));
                }, function(t) {
                    e.ctrl.error = t;
                });
            }, function(t) {
                e.ctrl.error = t;
            });
        }, e.prototype.createProjectIfNecessary = function() {
            if (!this.isNewProject()) return this.$q.when(this.ctrl.selectedProject);
            var e = this.ctrl.selectedProject.metadata.name, t = this.ctrl.selectedProject.metadata.annotations["new-display-name"], r = this.$filter("description")(this.ctrl.selectedProject);
            return this.ProjectsService.create(e, t, r);
        }, e.prototype.createAPIObjects = function(e) {
            var t = this;
            this.DataService.batch(e, {
                namespace: this.ctrl.selectedProject.metadata.name
            }).then(function(e) {
                e.failure.length ? t.ctrl.error = e : t.ctrl.success = !0;
            }, function(e) {
                t.ctrl.error = e;
            });
        }, e.prototype.bindService = function(e) {
            var t = this;
            this.ctrl.bindError = !1;
            var r = {
                namespace: i.get(this.ctrl.selectedProject, "metadata.name")
            }, n = this.BindingService.getServiceClassForInstance(this.ctrl.serviceToBind, this.ctrl.serviceClasses);
            this.BindingService.bindService(this.ctrl.serviceToBind, e, n).then(function(e) {
                t.ctrl.binding = e, t.watches.push(t.DataService.watchObject(t.BindingService.bindingResource, i.get(t.ctrl.binding, "metadata.name"), r, function(e) {
                    t.ctrl.binding = e;
                }));
            }, function(e) {
                t.ctrl.bindComplete = !0, t.ctrl.bindError = e;
            });
        }, e.prototype.getServiceClasses = function() {
            var e = this, t = {
                group: "servicecatalog.k8s.io",
                resource: "serviceclasses"
            };
            this.APIService.apiInfo(t) && (this.ctrl.updating = !1, this.DataService.list(t, {}).then(function(t) {
                e.ctrl.serviceClasses = t.by("metadata.name");
            }).finally(function() {
                e.ctrl.updating = !1;
            }));
        }, e;
    }();
    a.$inject = [ "$scope", "$filter", "$location", "$q", "BuilderAppService", "ProjectsService", "DataService", "APIService", "BindingService", "Logger", "Constants" ], 
    t.CreateFromBuilderController = a;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = function() {
        function e(e, t) {
            var r = this;
            this.ctrl = this, this.closeOrderingPanel = function() {
                r.RecentlyViewed.addItem(r.ctrl.selectedItem.resource.metadata.uid), r.ctrl.orderingPanelVisible = !1;
            }, this.$scope = e, this.RecentlyViewed = t;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.searchText = "", this.ctrl.orderingPanelVisible = !1, this.$scope.$on("open-overlay-panel", function(t, r) {
                if ("Template" === r.kind) {
                    var n = e.ctrl.onTemplateSelected();
                    return void (n && n(r.resource));
                }
                e.ctrl.selectedItem = r, e.ctrl.orderingPanelVisible = !0;
            });
        }, e.prototype.$onDestroy = function() {
            this.ctrl.orderingPanelVisible && this.closeOrderingPanel();
        }, e;
    }();
    n.$inject = [ "$scope", "RecentlyViewedServiceItems" ], t.LandingPageController = n;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(1), i = r(0), s = function() {
        function e(e, t, r, n, s, a, o, c, l, d) {
            var p = this;
            this.ctrl = this, this.watches = [], this.clearValidityWatcher = function() {
                p.validityWatcher && (p.validityWatcher(), p.validityWatcher = void 0), p.ctrl.reviewStep.allowed = !1;
            }, this.showPlan = function() {
                p.clearValidityWatcher(), p.ctrl.configPageShown = !1, p.ctrl.nextTitle = "Next >";
            }, this.showConfig = function() {
                p.clearValidityWatcher(), p.ctrl.configPageShown = !0, p.reviewStep.allowed = p.bindStep.hidden && p.configStep.valid, 
                p.updateBindability(), p.validityWatcher = p.$scope.$watch("$ctrl.forms.orderConfigureForm.$valid", function(e, t) {
                    p.configStep.valid = e, p.bindStep.allowed = p.configStep.valid, p.reviewStep.allowed = p.bindStep.hidden && p.configStep.valid;
                });
            }, this.showBind = function() {
                p.clearValidityWatcher(), p.ctrl.configPageShown = !1, p.ctrl.nextTitle = p.bindParametersStep.hidden ? "Create" : "Next >", 
                p.reviewStep.allowed = p.bindParametersStep.hidden && p.bindStep.valid, p.isNewProject() ? p.ctrl.projectDisplayName = p.ctrl.selectedProject.metadata.annotations["new-display-name"] || p.ctrl.selectedProject.metadata.name : p.ctrl.projectDisplayName = p.$filter("displayName")(p.ctrl.selectedProject), 
                p.validityWatcher = p.$scope.$watch("$ctrl.forms.bindForm.$valid", function(e, t) {
                    p.bindStep.valid = e, p.bindParametersStep.allowed = e, p.reviewStep.allowed = p.bindParametersStep.hidden && p.bindStep.valid;
                });
            }, this.showBindParameters = function() {
                p.clearValidityWatcher(), p.ctrl.nextTitle = "Create", p.validityWatcher = p.$scope.$watch("$ctrl.forms.bindParametersForm.$valid", function(e, t) {
                    p.bindParametersStep.valid = e, p.reviewStep.allowed = p.bindParametersStep.valid;
                });
            }, this.showResults = function() {
                p.clearValidityWatcher(), p.ctrl.configPageShown = !1, p.ctrl.nextTitle = "Close", 
                p.ctrl.wizardDone = !0, p.provisionService();
            }, this.provisionService = function() {
                if (p.ctrl.inProgress = !0, p.ctrl.orderComplete = !1, p.ctrl.error = !1, p.isNewProject()) {
                    var e = p.ctrl.selectedProject.metadata.name, t = p.ctrl.selectedProject.metadata.annotations["new-display-name"], r = p.$filter("description")(p.ctrl.selectedProject);
                    p.ProjectsService.create(e, t, r).then(function(e) {
                        p.ctrl.selectedProject = e, p.ctrl.projectDisplayName = p.$filter("displayName")(e), 
                        p.createService();
                    }, function(e) {
                        p.ctrl.error = e.data;
                    });
                } else p.ctrl.projectDisplayName = p.$filter("displayName")(p.ctrl.selectedProject), 
                p.createService();
            }, this.onProjectUpdate = function() {
                if (p.isNewProject()) p.ctrl.applications = [], p.ctrl.updating = !1, p.updateBindability(); else if (p.ctrl.showPodPresets) {
                    p.ctrl.updating = !0, p.ctrl.bindType = "none", p.ctrl.serviceToBind = p.ctrl.serviceClass;
                    var e = {
                        namespace: i.get(p.ctrl.selectedProject, "metadata.name")
                    };
                    p.ApplicationsService.getApplications(e).then(function(e) {
                        p.ctrl.applications = e, p.ctrl.updating = !1, p.updateBindability();
                    });
                }
            }, this.watchResults = function(e, t, r) {
                p.watches.push(p.DataService.watchObject(e, t.metadata.name, r, function(e, t) {
                    var r = i.get(e, "status.conditions"), n = i.find(r, {
                        type: "Ready"
                    });
                    p.ctrl.orderComplete = n && "True" === n.status, p.ctrl.error = i.find(r, {
                        type: "Failed",
                        status: "True"
                    });
                }));
            }, this.$scope = e, this.$filter = t, this.ApplicationsService = r, this.AuthService = n, 
            this.ProjectsService = s, this.DataService = a, this.BindingService = o, this.Logger = c, 
            this.sendRequesterUsername = !1, this.ctrl.showPodPresets = i.get(l, [ "ENABLE_TECH_PREVIEW_FEATURE", "pod_presets" ], !1), 
            this.DNS1123_SUBDOMAIN_VALIDATION = d;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.iconClass = this.ctrl.serviceClass.iconClass || "fa fa-clone", this.ctrl.imageUrl = this.ctrl.serviceClass.imageUrl, 
            this.ctrl.serviceName = this.ctrl.serviceClass.name, this.ctrl.description = this.ctrl.serviceClass.description, 
            this.ctrl.longDescription = this.ctrl.serviceClass.longDescription, this.ctrl.plans = i.get(this, "ctrl.serviceClass.resource.plans", []), 
            this.ctrl.applications = [], this.ctrl.parameterData = {}, this.ctrl.bindParameterData = {}, 
            this.ctrl.forms = {}, this.ctrl.appToBind = null, this.ctrl.configStepValid = !0, 
            this.planStep = {
                id: "plans",
                label: "Plan",
                view: "order-service/order-service-plans.html",
                hidden: this.ctrl.plans.length < 2,
                allowed: !0,
                valid: !0,
                allowClickNav: !0,
                onShow: this.showPlan
            }, this.configStep = {
                label: "Configuration",
                id: "configure",
                view: "order-service/order-service-configure.html",
                hidden: !1,
                allowed: !0,
                valid: !1,
                allowClickNav: !0,
                onShow: this.showConfig
            }, this.bindStep = {
                label: "Binding",
                id: "bind",
                view: "order-service/order-service-bind.html",
                hidden: !1,
                allowed: !1,
                valid: !0,
                allowClickNav: !0,
                onShow: this.showBind
            }, this.bindParametersStep = {
                label: "Parameters",
                id: "bind-parameters",
                view: "order-service/order-service-bind-parameters.html",
                hidden: !1,
                allowed: !1,
                valid: !0,
                allowClickNav: !0,
                onShow: this.showBindParameters
            }, this.reviewStep = {
                label: "Results",
                id: "results",
                view: "order-service/order-service-review.html",
                hidden: !1,
                allowed: !1,
                valid: !0,
                prevEnabled: !1,
                allowClickNav: !1,
                onShow: this.showResults
            }, this.ctrl.steps = [ this.planStep, this.configStep, this.bindStep, this.bindParametersStep, this.reviewStep ], 
            this.ctrl.nameTaken = !1, this.ctrl.wizardDone = !1, this.ctrl.bindType = "none", 
            this.selectPlan(i.head(this.ctrl.plans)), this.ctrl.planIndex = 0, this.ctrl.updating = !0, 
            this.selectedProjectWatch = this.$scope.$watch(function() {
                return e.ctrl.selectedProject;
            }, this.onProjectUpdate), this.bindTypeWatch = this.$scope.$watch("$ctrl.bindType", function(t, r) {
                t !== r && (e.updateBindParametersStepVisibility(), e.ctrl.nextTitle = e.bindParametersStep.hidden ? "Create" : "Next >", 
                e.reviewStep.allowed = e.bindParametersStep.hidden && e.bindStep.valid);
            }), this.AuthService.withUser().then(function(t) {
                e.user = t, e.ctrl.wizardReady = !0;
            });
        }, e.prototype.selectPlan = function(e) {
            this.ctrl.selectedPlan = e, this.ctrl.parameterData = {}, this.updateParameterSchema(e), 
            this.updateBindability();
        }, e.prototype.createService = function() {
            var e = this, t = this.getParameters(), r = i.isEmpty(t) ? null : this.generateSecretName(), n = this.makeServiceInstance(r), s = {
                group: "servicecatalog.k8s.io",
                resource: "serviceinstances"
            }, a = {
                namespace: this.ctrl.selectedProject.metadata.name
            };
            this.DataService.create(s, null, n, a).then(function(n) {
                if (e.ctrl.orderInProgress = !0, e.watchResults(s, n, a), e.ctrl.serviceInstance = n, 
                r) {
                    var o = e.makeParametersSecret(r, t, n);
                    e.DataService.create("secrets", null, o, a).then(i.noop, function(t) {
                        e.ctrl.error = i.get(t, "data");
                    });
                }
                "none" !== e.ctrl.bindType && e.bindService();
            }, function(t) {
                e.ctrl.error = i.get(t, "data");
            });
        }, e.prototype.bindService = function() {
            var e = this;
            this.ctrl.bindError = !1;
            var t = {
                namespace: i.get(this.ctrl.selectedProject, "metadata.name")
            }, r = "application" === this.ctrl.bindType ? this.ctrl.appToBind : void 0;
            this.BindingService.bindService(this.ctrl.serviceInstance, r, this.ctrl.serviceClass.resource, this.ctrl.bindParameterData).then(function(r) {
                e.ctrl.binding = r, e.watches.push(e.DataService.watchObject(e.BindingService.bindingResource, i.get(e.ctrl.binding, "metadata.name"), t, function(t) {
                    e.ctrl.binding = t;
                }));
            }, function(t) {
                e.ctrl.bindError = t;
            });
        }, e.prototype.$onDestroy = function() {
            this.DataService.unwatchAll(this.watches), this.selectedProjectWatch(), this.bindTypeWatch(), 
            this.clearValidityWatcher();
        }, e.prototype.closePanel = function() {
            n.isFunction(this.ctrl.handleClose) && this.ctrl.handleClose();
        }, e.prototype.updateBindability = function() {
            if (!this.ctrl.wizardDone) {
                var e = i.get(this.ctrl.selectedPlan, "bindable");
                this.bindStep.hidden = !0 !== e && (!1 === e || !i.get(this.ctrl.serviceClass, "resource.bindable")), 
                this.updateBindParametersStepVisibility(), this.ctrl.configPageShown && (this.reviewStep.allowed = this.bindStep.hidden, 
                this.bindStep.hidden ? this.ctrl.nextTitle = "Create" : this.ctrl.nextTitle = "Next >");
            }
        }, e.prototype.updateBindParametersStepVisibility = function() {
            this.bindParametersStep.hidden = this.bindStep.hidden || "none" === this.ctrl.bindType || !i.has(this.ctrl, "bindParameterSchema.properties"), 
            this.bindParametersStep.allowed = this.bindStep.valid;
        }, e.prototype.updateParameterSchema = function(t) {
            var r = i.get(t, "instanceCreateParameterSchema");
            i.has(r, [ "properties", e.REQUESTER_USERNAME_PARAM_NAME ]) ? (r = n.copy(r), delete r.properties[e.REQUESTER_USERNAME_PARAM_NAME], 
            this.sendRequesterUsername = !0) : this.sendRequesterUsername = !1, this.ctrl.parameterSchema = r, 
            this.ctrl.parameterFormDefinition = i.get(this, "ctrl.selectedPlan.externalMetadata.schemas.service_instance.create.openshift_form_definition"), 
            this.ctrl.bindParameterSchema = i.get(t, "serviceInstanceCredentialCreateParameterSchema");
        }, e.prototype.getParameters = function() {
            var t = i.omitBy(this.ctrl.parameterData, function(e) {
                return "" === e;
            });
            return this.sendRequesterUsername && (t[e.REQUESTER_USERNAME_PARAM_NAME] = this.user.metadata.name), 
            t;
        }, e.prototype.getServiceClassName = function() {
            return i.get(this, "ctrl.serviceClass.resource.metadata.name");
        }, e.prototype.generateSecretName = function() {
            var e = 5, t = i.truncate(this.getServiceClassName() + "-parameters", {
                length: this.DNS1123_SUBDOMAIN_VALIDATION.maxlength - e - 1,
                omission: ""
            });
            return this.$filter("generateName")(t + "-", e);
        }, e.prototype.makeParametersSecret = function(e, t, r) {
            return {
                apiVersion: "v1",
                kind: "Secret",
                metadata: {
                    name: e,
                    ownerReferences: [ {
                        apiVersion: r.apiVersion,
                        kind: r.kind,
                        name: r.metadata.name,
                        uid: r.metadata.uid,
                        controller: !1,
                        blockOwnerDeletion: !1
                    } ]
                },
                type: "Opaque",
                stringData: {
                    parameters: JSON.stringify(t)
                }
            };
        }, e.prototype.makeServiceInstance = function(e) {
            var t = this.getServiceClassName(), r = {
                kind: "ServiceInstance",
                apiVersion: "servicecatalog.k8s.io/v1alpha1",
                metadata: {
                    namespace: this.ctrl.selectedProject.metadata.name,
                    generateName: t + "-"
                },
                spec: {
                    serviceClassName: t,
                    planName: this.ctrl.selectedPlan.name
                }
            };
            return e && (r.spec.parametersFrom = [ {
                secretKeyRef: {
                    name: e,
                    key: "parameters"
                }
            } ]), r;
        }, e.prototype.isNewProject = function() {
            return !this.ctrl.selectedProject || !i.has(this.ctrl.selectedProject, "metadata.uid");
        }, e;
    }();
    s.$inject = [ "$scope", "$filter", "ApplicationsService", "AuthService", "ProjectsService", "DataService", "BindingService", "Logger", "Constants", "DNS1123_SUBDOMAIN_VALIDATION" ], 
    s.REQUESTER_USERNAME_PARAM_NAME = "template.openshift.io/requester-username", t.OrderServiceController = s;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(1), i = r(2), s = function() {
        function e() {
            var e = this;
            this.ctrl = this, this.closePanel = function() {
                n.isFunction(e.ctrl.handleClose) && e.ctrl.handleClose();
            }, this.showDialog = function() {
                e.ctrl.shown = !0, i("body").addClass("overlay-open");
            }, this.hideDialog = function() {
                e.ctrl.shown = !1, i("body").removeClass("overlay-open");
            }, this.ctrl.shown = !1;
        }
        return e.prototype.$postLink = function() {
            this.ctrl.showPanel && this.showDialog();
        }, e.prototype.$onChanges = function(e) {
            e.showPanel && (this.ctrl.showPanel ? this.showDialog() : this.hideDialog());
        }, e.prototype.$onDestroy = function() {
            i("body").removeClass("overlay-open");
        }, e;
    }();
    t.OverlayPanelController = s;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(1), i = r(0), s = function() {
        function e(t, r, s, a, o, c, l, d, p, h, m) {
            var u = this;
            this.ctrl = this, this.newProjectPanelShown = !1, this.editProjectPanelShown = !1, 
            this.projects = [], this.watches = [], this.maxDisplayProjects = 5, this.watchingProjects = !1, 
            this.init = function() {
                u.ProjectsService.list().then(function(t) {
                    u.onProjectsUpdate(t), u.ctrl.isProjectListIncomplete = u.ProjectsService.isProjectListIncomplete(), 
                    !u.ctrl.isProjectListIncomplete && i.size(u.projects) <= e.MAX_PROJETS_TO_WATCH && (u.watches.push(u.ProjectsService.watch(u.$scope, u.onProjectsUpdate)), 
                    u.watchingProjects = !0);
                }, function() {
                    u.ctrl.isProjectListIncomplete = !0;
                }), u.ctrl.resourceLinks = i.clone(u.Constants.CATALOG_HELP_RESOURCES.links), i.forEach(u.ctrl.resourceLinks, function(e) {
                    n.isDefined(e.help) && (e.href = u.Constants.HELP_BASE_URL + (e.help ? u.Constants.HELP[e.help] : ""));
                }), u.$rootScope.$on("recently-viewed-updated", function() {
                    u.ctrl.recentlyViewedItems = u.getRecentlyViewedItems();
                });
            }, this.onProjectsUpdate = function(e) {
                var t = i.toArray(e.by("metadata.creationTimestamp"));
                u.ctrl.projects = u.RecentlyViewedProjectsService.orderByMostRecentlyViewed(t), 
                u.ctrl.totalProjects = u.ctrl.projects.length, u.ctrl.projects = i.take(u.ctrl.projects, u.maxDisplayProjects), 
                u.ctrl.loading = !1, u.ctrl.showGetStarted = !u.ctrl.projects || u.ctrl.projects.length < 2;
            }, this.goToProject = function(e) {
                var t = u.$filter("projectUrl")(e, u.ctrl.baseProjectUrl);
                u.$window.location.href = t;
            }, this.closeNewProjectPanel = function() {
                u.ctrl.newProjectPanelShown = !1;
            }, this.onNewProject = function(e) {
                u.ctrl.newProjectPanelShown = !1, u.watchingProjects || u.ProjectsService.list().then(u.onProjectsUpdate);
            }, this.onViewMemebership = function(e) {
                var t = u.ctrl.viewEditMembership();
                t && t(e);
            }, this.editProject = function(e) {
                u.ctrl.edittingProject = e, u.ctrl.editProjectPanelShown = !0;
            }, this.closeEditProjectPanel = function() {
                u.ctrl.editProjectPanelShown = !1;
            }, this.onEditProject = function(e) {
                u.ctrl.editProjectPanelShown = !1, u.watchingProjects || u.ProjectsService.list().then(u.onProjectsUpdate);
            }, this.onDeleteProject = function() {
                u.watchingProjects || u.ProjectsService.list().then(u.onProjectsUpdate);
            }, this.$filter = t, this.$rootScope = r, this.$scope = s, this.$window = a, this.AuthService = o, 
            this.Constants = c, this.DataService = l, this.Logger = d, this.ProjectsService = p, 
            this.RecentlyViewedProjectsService = h, this.RecentlyViewedItems = m;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.loading = !0, this.AuthService.withUser().then(function(t) {
                e.ctrl.user = t;
            }), this.ProjectsService.canCreate().then(function() {
                e.ctrl.canCreate = !0;
            }, function(t) {
                e.ctrl.canCreate = !1, e.ctrl.loading = !1;
                var r = t.data || {};
                if (403 !== t.status) {
                    var n = "Failed to determine create project permission";
                    return 0 !== t.status && (n += " (" + t.status + ")"), void e.Logger.warn(n);
                }
                if (r.details) {
                    var s = [];
                    i.forEach(r.details.causes || [], function(e) {
                        e.message && s.push(e.message);
                    }), s.length > 0 && (e.ctrl.newProjectMessage = s.join("\n"));
                }
            }).finally(function() {
                e.init();
            });
        }, e.prototype.$onDestroy = function() {
            this.DataService.unwatchAll(this.watches);
        }, e.prototype.$onChanges = function(e) {
            e.catalogItems && this.ctrl.catalogItems && (this.allItems = i.keyBy(this.ctrl.catalogItems, "resource.metadata.uid"), 
            this.ctrl.recentlyViewedItems = this.getRecentlyViewedItems());
        }, e.prototype.openNewProjectPanel = function(e) {
            this.ctrl.newProjectPanelShown = !0, this.ctrl.modalPopupElement = e.currentTarget;
        }, e.prototype.handleGettingStartedClick = function() {
            var e = this.ctrl.startTour();
            e && e();
        }, e.prototype.handleProjectClick = function(e) {
            var t = this.ctrl.projectSelect();
            t && t(e);
        }, e.prototype.orderService = function(e) {
            this.$scope.$emit("open-overlay-panel", e);
        }, e.prototype.showAllProjects = function() {
            var e = this.ctrl.showProjects();
            e && e();
        }, e.prototype.getRecentlyViewedItems = function() {
            var e = this;
            if (this.allItems) {
                var t = this.RecentlyViewedItems.getItems(), r = i.map(t, function(t) {
                    return e.allItems[t];
                });
                return r = i.reject(r, function(e) {
                    return !e;
                });
            }
        }, e;
    }();
    s.$inject = [ "$filter", "$rootScope", "$scope", "$window", "AuthService", "Constants", "DataService", "Logger", "ProjectsService", "RecentlyViewedProjectsService", "RecentlyViewedServiceItems" ], 
    s.MAX_PROJETS_TO_WATCH = 250, t.ProjectsSummaryController = s;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(1), i = r(0), s = function() {
        function e(e, t, r, n) {
            var i = this;
            this.ctrl = this, this.onWindowResize = function() {
                i.$scope.$evalAsync(function() {
                    i.updateListExpandVisibility();
                });
            }, this.$scope = e, this.$window = t, this.$element = r, this.BREAKPOINTS = n, this.ctrl.sassListExpanded = !1, 
            this.ctrl.itemsOverflow = !1;
        }
        return e.prototype.$postLink = function() {
            this.debounceResize = i.debounce(this.onWindowResize, 50, {
                maxWait: 250
            }), n.element(this.$window).on("resize", this.debounceResize), this.updateListExpandVisibility();
        }, e.prototype.$onDestroy = function() {
            n.element(this.$window).off("resize", this.debounceResize);
        }, e.prototype.hasSaasOfferings = function() {
            return !i.isEmpty(this.ctrl.saasOfferings);
        }, e.prototype.$onChanges = function(e) {
            e.saasOfferings && !e.saasOfferings.isFirstChange() && (this.ctrl.saasOfferings = e.saasOfferings.currentValue, 
            this.updateListExpandVisibility());
        }, e.prototype.toggleListExpand = function() {
            this.ctrl.sassListExpanded = !this.ctrl.sassListExpanded;
        }, e.prototype.updateListExpandVisibility = function() {
            var e = this.$window.innerWidth, t = i.size(this.ctrl.saasOfferings);
            this.ctrl.itemsOverflow = t > 4 || t > 2 && e < this.BREAKPOINTS.screenLgMin;
        }, e;
    }();
    s.$inject = [ "$scope", "$window", "$element", "BREAKPOINTS" ], t.SaasListController = s;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(1), i = r(0), s = function() {
        function e(e, t, r, n, i, s, a) {
            var o = this;
            this.ctrl = this, this.groupChoicesBy = function(e) {
                return o.RecentlyViewedProjectsService.isRecentlyViewed(e.metadata.uid) ? "Recently Viewed" : "Create Project" === e.metadata.annotations["openshift.io/display-name"] ? "" : "Other Projects";
            }, this.$scope = e, this.$filter = t, this.AuthService = i, this.AuthorizationService = s, 
            this.RecentlyViewedProjectsService = a, this.ProjectsService = r, this.Logger = n;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.nameTaken = !1, this.ProjectsService.canCreate().then(function() {
                e.ctrl.canCreate = !0;
            }, function(t) {
                if (e.ctrl.canCreate = !1, 403 !== t.status) {
                    var r = "Failed to determine create project permission";
                    0 !== t.status && (r += " (" + t.status + ")"), e.Logger.warn(r);
                }
            }).finally(function() {
                e.listProjects();
            });
        }, e.prototype.$onChanges = function(e) {
            e.nameTaken && !e.nameTaken.isFirstChange() && this.ctrl.forms.createProjectForm.name.$setValidity("nameTaken", !this.ctrl.nameTaken), 
            e.availableProjects && !e.availableProjects.isFirstChange() && this.filterProjects(this.ctrl.availableProjects);
        }, e.prototype.onSelectProjectChange = function() {
            this.canIAddToProject(), n.isFunction(this.ctrl.onProjectSelected) && this.ctrl.onProjectSelected(this.ctrl.selectedProject);
        }, e.prototype.onNewProjectNameChange = function() {
            this.ctrl.nameTaken = !1, this.ctrl.forms.createProjectForm.name.$setValidity("nameTaken", !this.ctrl.nameTaken);
        }, e.prototype.isNewProject = function() {
            return this.ctrl.projects && this.ctrl.selectedProject && !i.has(this.ctrl.selectedProject, "metadata.uid");
        }, e.prototype.canIAddToProject = function() {
            return this.ctrl.forms.selectProjectForm.selectProject.$setValidity("cannotAddToProject", !0);
        }, e.prototype.filterProjects = function(e) {
            var t = {
                metadata: {
                    annotations: {
                        "openshift.io/display-name": "Create Project",
                        "new-display-name": ""
                    }
                }
            }, r = i.reject(e, "metadata.deletionTimestamp");
            this.ctrl.projects = this.RecentlyViewedProjectsService.orderByMostRecentlyViewed(i.toArray(e)), 
            this.ctrl.searchEnabled = !i.isEmpty(r), this.ctrl.existingProjectNames = i.map(e, "metadata.name"), 
            !this.ctrl.selectedProject && i.size(this.ctrl.projects) > 0 && 1 === i.size(this.ctrl.projects) && (this.ctrl.selectedProject = this.ctrl.projects[0], 
            this.onSelectProjectChange()), this.ctrl.canCreate && (this.ctrl.projects.unshift(t), 
            1 === i.size(this.ctrl.projects) && (this.ctrl.selectedProject = t, this.onSelectProjectChange())), 
            this.canIAddToProject();
        }, e.prototype.listProjects = function() {
            var e = this;
            this.ctrl.availableProjects ? this.filterProjects(this.ctrl.availableProjects) : this.ProjectsService.list().then(function(t) {
                e.filterProjects(t.by("metadata.name"));
            });
        }, e;
    }();
    s.$inject = [ "$scope", "$filter", "ProjectsService", "Logger", "AuthService", "AuthorizationService", "RecentlyViewedProjectsService" ], 
    t.SelectProjectController = s;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(1), i = r(0), s = r(2), a = function() {
        function e(e, t, r, n, s, a, o, c, l, d) {
            var p = this;
            this.ctrl = this, this.previousSubCategoryHeight = 0, this.resizeRetries = 0, this.serviceViewItemClicked = function(e, t) {
                p.$scope.$emit("open-overlay-panel", e);
            }, this.filterChange = function(e) {
                p.filterByCategory(p.ctrl.currentFilter, p.ctrl.currentSubFilter, !1), i.isEmpty(e) || i.each(e, function(e) {
                    switch (e.id) {
                      case "keyword":
                        p.ctrl.filteredItems = p.filterForKeywords(e.values[0], p.ctrl.filteredItems);
                        break;

                      case "vendors":
                        p.ctrl.filteredItems = p.filterForVendors(e.values, p.ctrl.filteredItems);
                    }
                }), p.ctrl.filterConfig.resultsCount = p.ctrl.filteredItems.length, p.ctrl.keywordFilterValue = null;
            }, this.constants = e, this.catalog = t, this.keywordService = r, this.logger = n, 
            this.htmlService = s, this.element = a[0], this.$filter = o, this.$rootScope = c, 
            this.$scope = l, this.$timeout = d, this.ctrl.loaded = !1, this.ctrl.isEmpty = !1, 
            this.ctrl.mobileView = "categories", this.ctrl.filterConfig = {}, this.ctrl.keywordFilterValue = null;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.debounceResize = i.debounce(function() {
                return e.resizeExpansion(!1);
            }, 50, {
                maxWait: 250
            }), n.element(window).bind("resize", this.debounceResize), s(window).on("resize.services", this.debounceResize), 
            this.removeFilterListener = this.$rootScope.$on("filter-catalog-items", function(t, r) {
                e.ctrl.keywordFilterValue = r.searchText, e.ctrl.currentFilter = e.ctrl.currentSubFilter = "all", 
                e.ctrl.mobileView = "subcategories";
            }), this.ctrl.filterConfig = {
                resultsLabel: "Items",
                appliedFilters: []
            };
        }, e.prototype.$onChanges = function(e) {
            e.catalogItems && this.ctrl.catalogItems && (this.ctrl.categories = this.catalog.categories, 
            this.filterByCategory("all", "all", !0), this.ctrl.isEmpty = i.isEmpty(this.ctrl.catalogItems), 
            this.ctrl.loaded = !0);
        }, e.prototype.$postLink = function() {
            this.scrollParent = this.getScrollParent(this.element), this.scrollParent && this.htmlService.isWindowAboveBreakpoint(this.htmlService.WINDOW_SIZE_SM) && (this.ctrl.viewStyle = {
                "min-height": "calc(100vh - " + this.scrollParent.getBoundingClientRect().top + "px)"
            });
        }, e.prototype.$onDestroy = function() {
            s(window).off("resize.services"), this.removeFilterListener();
        }, e.prototype.selectCategory = function(e) {
            if (this.ctrl.mobileView = "subcategories", this.clearAppliedFilters(), this.filterByCategory(e, null, !0), 
            this.scrollParent) {
                var t = s(this.scrollParent);
                t.scrollTop() !== this.element.offsetTop && t.animate({
                    scrollTop: this.element.offsetTop
                }, 200);
            }
        }, e.prototype.selectSubCategory = function(e) {
            this.ctrl.mobileView = "items", this.ctrl.currentSubFilter === e && "xxs" !== this.htmlService.getBreakpoint() && (e = null, 
            this.ctrl.mobileView = "subcategories"), this.clearAppliedFilters(), this.filterByCategory(this.ctrl.currentFilter, e, !1);
        }, e.prototype.getSubCategories = function(e) {
            var t = [];
            return this.ctrl.categories.map(function(r) {
                e === r.id && (t = t.concat(r.subCategories));
            }), t = i.filter(t, {
                hasItems: !0
            }), "all" === t[0].id && 2 === t.length && (t = i.drop(t, 1)), t;
        }, e.prototype.applyFilters = function(e) {
            this.filterChange(e.appliedFilters);
        }, e.prototype.filterByCategory = function(e, t, r) {
            var n, s;
            "all" === e || "other" === e ? t = "all" : (r && (this.ctrl.subCategories = this.getSubCategories(e)), 
            t = 1 === this.ctrl.subCategories.length ? this.ctrl.subCategories[0].id : t || null), 
            n = i.find(this.ctrl.categories, {
                id: e
            }), n ? t && (s = i.find(n.subCategories, {
                id: t
            }), s ? (this.ctrl.filteredItems = s.items, this.ctrl.filterConfig.totalCount = this.ctrl.filteredItems.length, 
            this.ctrl.filterConfig.resultsCount = this.ctrl.filterConfig.totalCount) : this.logger.error("Could not find subcategory '" + t + "' for category '" + e + "'")) : this.logger.error("Could not find category '" + e + "'"), 
            this.ctrl.currentFilter = e, this.ctrl.currentSubFilter = t, this.updateActiveCardStyles();
        }, e.prototype.filterForKeywords = function(e, t) {
            var r = this.keywordService.generateKeywords(e);
            return this.keywordService.filterForKeywords(t, [ "name", "tags" ], r);
        }, e.prototype.filterForVendors = function(e, t) {
            return i.filter(t, function(t) {
                return i.includes(e, t.vendor);
            });
        }, e.prototype.clearAppliedFilters = function() {
            this.$scope.$broadcast("clear-filters");
        }, e.prototype.getScrollParent = function(e) {
            if (null === e || !(e instanceof Element)) return null;
            var t = window.getComputedStyle(e).overflowY;
            return "visible" !== t && "hidden" !== t ? e : this.getScrollParent(e.parentNode);
        }, e.prototype.resizeExpansion = function(t) {
            var r = this;
            if ("all" !== this.ctrl.currentFilter && "other" !== this.ctrl.currentFilter && this.ctrl.currentSubFilter && this.htmlService.isWindowAboveBreakpoint(this.htmlService.WINDOW_SIZE_XS)) {
                if (this.resizeRetries > e.MAX_RESIZE_RETRIES) return void (this.resizeRetries = 0);
                var n = s("#" + this.ctrl.currentSubFilter), i = n.find(".services-items"), a = i.outerHeight(!0);
                a || (this.resizeRetries++, setTimeout(function() {
                    return r.resizeExpansion(t);
                }, 50)), t ? (s(".services-sub-category").removeAttr("style").removeClass("items-shown"), 
                n.css("margin-bottom", this.previousSubCategoryHeight + "px"), n.animate({
                    "margin-bottom": a
                }, 100, "swing", function() {
                    n.addClass("items-shown");
                })) : (n.css("margin-bottom", a + "px"), n.addClass("items-shown")), this.previousSubCategoryHeight = a;
            } else s(".services-sub-category").removeAttr("style").removeClass("items-shown"), 
            this.previousSubCategoryHeight = 0, this.resizeRetries = 0;
            this.$scope.$evalAsync(function() {
                r.scrollParent = r.getScrollParent(r.element), r.htmlService.isWindowAboveBreakpoint(r.htmlService.WINDOW_SIZE_SM) && r.scrollParent ? r.ctrl.viewStyle = {
                    "min-height": "calc(100vh - " + r.scrollParent.getBoundingClientRect().top + "px)"
                } : r.ctrl.viewStyle = void 0;
            });
        }, e.prototype.updateActiveCardStyles = function() {
            var e = this;
            this.$timeout(function() {
                return e.resizeExpansion(!0);
            });
        }, e;
    }();
    a.$inject = [ "Constants", "Catalog", "KeywordService", "Logger", "HTMLService", "$element", "$filter", "$rootScope", "$scope", "$timeout" ], 
    a.MAX_RESIZE_RETRIES = 20, t.ServicesViewController = a;
}, function(e, t) {
    e.exports = URI;
}, function(e, t, r) {
    "use strict";
    t.__esModule = !0;
    var n = r(1);
    r(3), r(29);
    var i = r(30), s = r(31), a = r(19), o = r(20), c = r(32), l = r(21), d = r(22), p = r(23), h = r(24), m = r(25), u = r(26), g = r(27), f = r(28), v = r(33), y = r(18);
    t.webCatalog = "webCatalog", n.module(t.webCatalog, [ "patternfly", "ngAnimate", "ui.bootstrap", "angularMoment", "ui.select", "schemaForm" ]).service("BuilderAppService", s.BuilderAppService).service("Catalog", c.CatalogService).service("RecentlyViewedServiceItems", v.RecentlyViewedServiceItems).filter("projectUrl", i.projectUrlFilter).component("catalogParameters", a.catalogParameters).component("catalogSearch", o.catalogSearch).component("createFromBuilder", l.createFromBuilder).component("landingPage", d.landingPage).component("orderService", p.orderService).component("overlayPanel", h.overlayPanel).component("projectsSummary", m.projectsSummary).component("saasList", u.saasList).component("selectProject", g.selectProject).component("servicesView", f.servicesView).component("catalogFilter", y.catalogFilter).run([ "$templateCache", function(e) {
        e.put("catalog-search/catalog-search-result.html", r(4)), e.put("create-from-builder/create-from-builder-configure.html", r(6)), 
        e.put("create-from-builder/create-from-builder-bind.html", r(5)), e.put("create-from-builder/create-from-builder-results.html", r(7)), 
        e.put("order-service/order-service-plans.html", r(11)), e.put("order-service/order-service-configure.html", r(10)), 
        e.put("order-service/order-service-bind.html", r(9)), e.put("order-service/order-service-bind-parameters.html", r(8)), 
        e.put("order-service/order-service-review.html", r(12)), e.put("decorators/bootstrap/array.html", r(13)), 
        e.put("decorators/bootstrap/checkbox.html", r(14)), e.put("decorators/bootstrap/checkboxes.html", r(15)), 
        e.put("decorators/bootstrap/default.html", r(16)), e.put("decorators/bootstrap/select.html", r(17));
    } ]);
} ], [ 57 ]);