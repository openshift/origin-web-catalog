webpackJsonp([ 0, 1 ], [ function(e, t) {
    e.exports = _;
}, function(e, t) {
    e.exports = angular;
}, function(e, t) {
    e.exports = $;
}, function(e, t) {}, function(e, t) {
    e.exports = '<a href="" class="catalog-search-match">\n  <span class="catalog-search-match-icon">\n    <span ng-if="match.model.imageUrl"><img ng-src="{{match.model.imageUrl}}"></span>\n    <span ng-if="!match.model.imageUrl && match.model.iconClass" ng-class="match.model.iconClass" class="icon"></span>\n  </span>\n  <div class="catalog-search-match-info">\n    <div class="catalog-search-match-label">\n      {{match.label}}\n    </div>\n    <div class="catalog-search-match-description">\n      <span ng-repeat="tag in (match.model.tags || match.model.resource.alphaTags)" class="tag small text-muted">\n        {{tag}}\n      </span>\n    </div>\n  </div>\n</a>\n';
}, function(e, t) {
    e.exports = '<bind-application-form application-name=\'$ctrl.imageStream.name\'\n                       form-name=\'$ctrl.bindForm\'\n                       allow-no-binding="true"\n                       service-instances="$ctrl.serviceInstances"\n                       service-classes="$ctrl.serviceClasses"\n                       service-to-bind="$ctrl.serviceToBind">\n</bind-application-form>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <form name="$ctrl.builderForm" class="config-form">\n    <div class="form-group">\n      <label class="control-label" for="version">Version</label>\n      <ui-select ng-model="$ctrl.istag" required search-enabled="false">\n        <ui-select-match>\n          {{$select.selected.name}}\n        </ui-select-match>\n        <ui-select-choices repeat="tag in $ctrl.versions track by tag.name">\n          {{tag.name}}\n          <small ng-repeat="otherTag in $ctrl.referencedBy[tag.name]">\n            <span ng-if="$first"> &mdash; </span>{{otherTag}}<span ng-if="!$last">,</span>\n          </small>\n        </ui-select-choices>\n      </ui-select>\n    </div>\n    <select-project selected-project="$ctrl.selectedProject" name-taken="$ctrl.projectNameTaken"></select-project>\n    <div class="form-group">\n      <label class="control-label required" for="app-name">Application Name</label>\n      <div ng-class="{ \'has-error\': $ctrl.builderForm.name.$touched && $ctrl.builderForm.name.$invalid }">\n        <input\n          class="form-control"\n          type="text"\n          id="app-name"\n          required\n          minlength="2"\n          ng-maxlength="$ctrl.nameMaxLength"\n          ng-pattern="$ctrl.namePattern"\n          ng-model="$ctrl.name"\n          name="name"\n          autocorrect="off"\n          autocapitalize="off"\n          spellcheck="false">\n        \x3c!-- Wait until users leave the field to avoid flashing errors as they type. --\x3e\n        <div ng-if="$ctrl.builderForm.name.$touched">\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.required">\n            <span class="help-block">\n              Application name is required.\n            </span>\n          </div>\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.pattern">\n            <span class="help-block">\n              Application name consists of lower-case letters, numbers, and dashes. It must start with a letter and can\'t end with a <code>-</code>.\n            </span>\n          </div>\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.minlength">\n            <span class="help-block">\n              Application name must be at least 2 characters.\n            </span>\n          </div>\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.maxlength">\n            <span class="help-block">\n              Application name can\'t be more than 24 characters.\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class="form-group">\n      <label class="control-label required" for="repository">Git Repository</label>\n      <div ng-class="{ \'has-error\': $ctrl.builderForm.repository.$touched && $ctrl.builderForm.repository.$error.$required }">\n        <input class="form-control"\n          type="text"\n          id="repository"\n          name="repository"\n          required\n          ng-model="$ctrl.repository"\n          autocorrect="off"\n          autocapitalize="off"\n          spellcheck="false">\n        <div ng-if="$ctrl.istag.annotations.sampleRepo" class="help-block">\n          <a href="" ng-click="$ctrl.fillSampleRepo()">Try Sample Repository\n            <i class="fa fa-level-up" aria-hidden="true"></i></a>\n        </div>\n        <div class="has-error" ng-if="$ctrl.builderForm.repository.$touched && $ctrl.builderForm.repository.$error.$required">\n          <span class="help-block">\n            Git repository is required.\n          </span>\n        </div>\n        <div class="has-warning" ng-if="$ctrl.builderForm.repository.$touched && $ctrl.repository && !$ctrl.repositoryPattern.test($ctrl.repository)">\n          <span class="help-block">\n            This might not be a valid Git URL. Check that it is the correct URL to a remote Git repository.\n          </span>\n        </div>\n      </div>\n    </div>\n\n    \x3c!--\n      Only show the link for existing projects. It will be broken for new\n      projects.  Use class `invisible` when the project list is still loading\n      so the dialog doesn\'t resize.\n    --\x3e\n    <div ng-hide="$ctrl.selectedProject && !$ctrl.selectedProject.metadata.uid"\n         ng-class="{ invisible: !$ctrl.selectedProject || !$ctrl.istag }"\n         class="form-group">\n      If you have a private Git repository or need to change application defaults, view\n      <a href="" ng-click="$ctrl.navigateToAdvancedForm()">advanced options</a>.\n    </div>\n  </form>\n</div>\n';
}, function(e, t) {
    e.exports = '<div ng-if="!$ctrl.success && !$ctrl.error">\n  <div ng-if="!$ctrl.serviceToBind">\n    <h3 class="text-center">\n      <div class="spinner spinner-lg" aria-hidden="true"></div>\n    </h3>\n    <h3 class="text-center">\n      <span>The application is being created</span>\n    </h3>\n  </div>\n  <div ng-if="$ctrl.serviceToBind" class="review-status">\n    <div class="spinner spinner-sm spinner-inline aria-hidden="true"></div>\n    <h3 class="review-message">\n      The application is being created\n    </h3>\n  </div>\n</div>\n<div ng-if="$ctrl.success">\n  <div class="review-status">\n    <span class="pficon pficon-ok" aria-hidden="true"></span>\n    <span class="sr-only">Success</span>\n    <h3 class="review-message">\n    <span>\n      <strong>{{$ctrl.name}}</strong> has been created in <strong>{{$ctrl.selectedProject.metadata.name}}</strong> successfully\n    </span>\n    </h3>\n  </div>\n</div>\n<div ng-if="!$ctrl.error && ($ctrl.bindInProgress || $ctrl.bindComplete)">\n  <bind-results error="$ctrl.bindError"\n                progress-inline="true"\n                binding="$ctrl.binding"\n                service-to-bind="$ctrl.serviceToBind"\n                bind-type="application"\n                application-to-bind="$ctrl.name"\n                show-pod-presets="$ctrl.showPodPresets">\n  </bind-results>\n</div>\n<div ng-if="$ctrl.success">\n  <p ng-if="!$ctrl.serviceToBind || $ctrl.bindComplete">\n    Continue to your project to check the status of your application as it builds and deploys.\n  </p>\n</div>\n<div class="review-failure" ng-if="$ctrl.error">\n  <div class="review-status">\n    <span class="pficon pficon-error-circle-o text-danger" aria-hidden="true"></span>\n    <span class="sr-only">Error</span>\n    <h3 class="review-message">\n      Order Failed\n    </h3>\n  </div>\n  <div class="sub-title">\n    <span ng-if="$ctrl.error.data.message">\n      {{$ctrl.error.data.message | upperFirst}}\n    </span>\n    <span ng-if="!$ctrl.error.data.message">\n      An error occurred creating the application.\n    </span>\n  </div>\n  \x3c!-- TODO: Improve error message presentation --\x3e\n  <ul ng-if="$ctrl.error.failure.length" class="failure-messages">\n    <li ng-repeat="failure in $ctrl.error.failure">\n      {{failure.data.message}}\n    </li>\n  </ul>\n</div>\n<div class="footer-panel">\n  <a class="btn btn-primary" href="{{$ctrl.selectedProject | projectUrl : $ctrl.baseProjectUrl}}">View Project</a>\n</div>\n';
}, function(e, t) {
    e.exports = '<bind-service-form service-class="$ctrl.serviceClass.resource"\n                   service-class-name="$ctrl.serviceClass.name"\n                   applications="$ctrl.applications"\n                   form-name="$ctrl.forms.bindForm"\n                   allow-no-binding="true"\n                   bind-type="$ctrl.bindType"\n                   app-to-bind="$ctrl.appToBind">\n</bind-service-form>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <form name="$ctrl.forms.orderConfigureForm" class="config-form">\n    <select-project selected-project="$ctrl.selectedProject" name-taken="$ctrl.nameTaken"></select-project>\n    <catalog-parameters\n      ng-if="$ctrl.selectedPlan.alphaInstanceCreateParameterSchema"\n      model="$ctrl.parameterData"\n      parameter-schema="$ctrl.selectedPlan.alphaInstanceCreateParameterSchema">\n    </catalog-parameters>\n  </form>\n  <div ng-if="$ctrl.error" class="has-error">\n    <span class="help-block">{{$ctrl.error}}</span>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <div class="select-plans">\n    <h3>Select a Plan</h3>\n    <div ng-repeat="plan in $ctrl.serviceClass.resource.plans" class="radio">\n      <label>\n        <input\n          type="radio"\n          ng-model="$ctrl.planIndex"\n          ng-change="$ctrl.selectPlan(plan)"\n          value="{{$index}}">\n        <span class="plan-name">{{plan.externalMetadata.displayName || plan.name}}</span>\n        \x3c!-- TODO: truncate long text --\x3e\n        <div ng-if="plan.description">{{plan.description}}</div>\n        \x3c!-- TODO: show plan bullets --\x3e\n      </label>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div ng-if="!$ctrl.error">\n  <div ng-if="!$ctrl.orderComplete">\n    <div ng-if="$ctrl.bindType === \'none\'">\n      <h3 class="text-center">\n        <div class="spinner spinner-lg" aria-hidden="true"></div>\n      </h3>\n      <h3 class="text-center">\n        <span>The service is being provisioned</span>\n      </h3>\n    </div>\n    <div ng-if="$ctrl.bindType !== \'none\'" class="review-status">\n      <div class="spinner spinner-sm spinner-inline" aria-hidden="true"></div>\n      <h3 class="review-message">\n        The service is being provisioned\n      </h3>\n    </div>\n  </div>\n</div>\n<div class="review-failure" ng-if="$ctrl.error">\n  <div class="review-status">\n    <span class="pficon pficon-error-circle-o text-danger" aria-hidden="true"></span>\n    <span class="sr-only">Error</span>\n    <h3 class="review-message">\n      Order Failed\n    </h3>\n  </div>\n  <div class="sub-title">\n    <span ng-if="$ctrl.error.message || $ctrl.error.Message ">\n      {{$ctrl.error.message || $ctrl.error.Message | upperFirst}}\n    </span>\n    <span ng-if="!$ctrl.error.message || $ctrl.error.Message">\n      An error occurred ordering the service.\n    </span>\n  </div>\n</div>\n<div ng-if="$ctrl.orderComplete">\n  <div class="review-status">\n    <span class="pficon pficon-ok" aria-hidden="true"></span>\n    <span class="sr-only">Success</span>\n    <h3 class="review-message">\n      <span>\n        <strong>{{$ctrl.serviceInstanceName}}</strong> has been added to <strong>{{$ctrl.projectDisplayName}}</strong> successfully\n      </span>\n    </h3>\n  </div>\n</div>\n<div ng-if="$ctrl.bindType !== \'none\'">\n  <bind-results error="$ctrl.bindError"\n                progress-inline="true"\n                binding="$ctrl.binding"\n                service-to-bind="$ctrl.serviceInstanceName"\n                bind-type="{{$ctrl.bindType}}"\n                application-to-bind="$ctrl.appToBind.metadata.name"\n                show-pod-presets="$ctrl.showPodPresets">\n  </bind-results>\n</div>\n<div class="alert alert-info" ng-if="$ctrl.orderComplete && $ctrl.bindType === \'none\'">\n  <span class="pficon pficon-info" aria-hidden="true"></span>\n  <span class="sr-only">Info</span>\n  Continue to your project to bind this service to your application. Binding this service creates a secret containing the information necessary for your application to use the service.\n</div>\n<div class="footer-panel">\n  <a class="btn btn-primary" href="{{$ctrl.selectedProject | projectUrl : $ctrl.baseProjectUrl}}">View Project</a>\n</div>\n';
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
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(42);
    t.catalogParameters = {
        bindings: {
            parameterSchema: "<",
            model: "="
        },
        controller: r.CatalogParametersController,
        template: n(32)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(43);
    t.catalogSearch = {
        bindings: {
            baseProjectUrl: "@",
            catalogItems: "<"
        },
        controller: r.CatalogSearchController,
        template: n(33)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(44);
    t.createFromBuilder = {
        bindings: {
            baseProjectUrl: "@",
            imageStream: "<",
            handleClose: "<"
        },
        controller: r.CreateFromBuilderController,
        template: n(34)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(45);
    t.landingPage = {
        bindings: {
            baseProjectUrl: "@",
            onTemplateSelected: "&"
        },
        controller: r.LandingPageController,
        template: n(35),
        transclude: {
            landingsearch: "landingsearch",
            landingheader: "landingheader",
            landingbody: "landingbody",
            landingside: "landingside"
        }
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(46);
    t.orderService = {
        bindings: {
            baseProjectUrl: "@",
            serviceClass: "<",
            handleClose: "<"
        },
        controller: r.OrderServiceController,
        template: n(36)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(47);
    t.overlayPanel = {
        bindings: {
            showClose: "<",
            showPanel: "<",
            handleClose: "<",
            singleColumn: "<"
        },
        controller: r.OverlayPanelController,
        template: n(37),
        transclude: !0
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(48);
    t.projectsSummary = {
        bindings: {
            baseProjectUrl: "@",
            catalogItems: "<",
            projectsUrl: "@",
            viewEditMembership: "&",
            startTour: "&"
        },
        controller: r.ProjectsSummaryController,
        template: n(38)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(49);
    t.saasList = {
        bindings: {
            saasTitle: "<?",
            saasOfferings: "<"
        },
        controller: r.SaasListController,
        template: n(39)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(50);
    t.selectProject = {
        bindings: {
            selectedProject: "=",
            nameTaken: "<"
        },
        controller: r.SelectProjectController,
        template: n(40)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(51);
    t.servicesView = {
        bindings: {
            baseProjectUrl: "@",
            catalogItems: "<"
        },
        controller: r.ServicesViewController,
        template: n(41)
    };
}, function(e, t, n) {
    "use strict";
    (function(e) {
        t.__esModule = !0;
        var r = n(0);
        r.set(window, "OPENSHIFT_CONSTANTS.HELP_BASE_URL", "https://docs.openshift.org/latest/");
        var i = {
            new_app: "dev_guide/application_lifecycle/new_app.html",
            application_health: "dev_guide/application_health.html",
            authorization: "architecture/additional_concepts/authorization.html",
            deployments: "dev_guide/deployments/how_deployments_work.html",
            default: "welcome/index.html"
        };
        r.set(window, "OPENSHIFT_CONSTANTS.HELP", i);
        var a = [ {
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
        } ], s = [ {
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
                id: "jboss",
                label: "JBoss",
                tags: [ "jboss" ],
                icon: "font-icon icon-openjdk"
            }, {
                id: "fuse",
                label: "Fuse",
                tags: [ "fuse" ],
                icon: "font-icon icon-openjdk"
            }, {
                id: "amq",
                label: "A-MQ",
                tags: [ "amq" ],
                icon: "font-icon icon-openjdk"
            }, {
                id: "bpm",
                label: "BPM",
                tags: [ "bpm" ],
                icon: "font-icon icon-openjdk"
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
        r.set(window, "OPENSHIFT_CONSTANTS.SERVICE_CATALOG_CATEGORIES", s), r.set(window, "OPENSHIFT_CONSTANTS.SAAS_OFFERINGS", a);
        var o = {
            links: [ {
                title: "Documentation",
                help: ""
            }, {
                title: "Developer Portal",
                href: "https://developers.openshift.com"
            }, {
                title: "Interactive Learning Portal",
                href: "https://openshift.katacoda.com"
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
        r.set(window, "OPENSHIFT_CONSTANTS.CATALOG_HELP_RESOURCES", o);
        var c = function() {
            e("body").find(".services-view-container .nav-tabs a")[0].click();
        }, l = function() {
            e(e("body").find(".services-view-container .nav-tabs li")[1]).find("a")[0].click(), 
            setTimeout(function() {
                e("body").find(".services-sub-category-tab")[1].click();
            });
        }, d = {
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
                target: ".services-view-container",
                targetScrollElement: ".landing",
                placement: "top",
                xOffset: 20,
                preShow: c
            }, {
                title: "Browse by Category",
                content: "A secondary level of categorization is available to further narrow your search.",
                target: ".services-view-container .nav-tabs li:nth-child(2)",
                targetScrollElement: ".landing",
                placement: "top",
                preShow: l
            }, {
                title: "Configure a Resource",
                content: "Clicking on a catalog item will open a panel allowing you to configure and create within a project.",
                target: ".services-sub-category.active .services-items .services-item",
                targetScrollElement: ".landing",
                placement: "right"
            }, {
                title: "Additional Help",
                content: "Additional resources can be found here or you can always access the help icon in the top banner for more information.",
                target: ".resources-panel",
                targetScrollElement: ".landing-side-bar",
                placement: "left"
            } ]
        }, p = {
            landing_page_tour: {
                enabled: !0,
                auto_launch: !0,
                steps: d
            }
        };
        r.set(window, "OPENSHIFT_CONSTANTS.GUIDED_TOURS", p);
    }).call(t, n(2));
}, function(e, t, n) {
    "use strict";
    function r() {
        return function(e, t) {
            var n = t || "project/", r = e && e.metadata ? e.metadata.name : "";
            return n.endsWith("/") || (n += "/"), n + r;
        };
    }
    t.__esModule = !0, t.projectUrlFilter = r;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(0), i = function() {
        function e() {}
        return e.prototype.makeAPIObjects = function(e) {
            var t = this.getPorts(e.imageStreamTag), n = r.first(t);
            return [ this.makeImageStream(e), this.makeBuildConfig(e), this.makeDeploymentConfig(e, t), this.makeService(e, n), this.makeRoute(e, n) ];
        }, e.prototype.getPorts = function(e) {
            var t = e.image, n = r.get(t, "dockerImageMetadata.Config.ExposedPorts") || r.get(t, "dockerImageMetadata.ContainerConfig.ExposedPorts", []);
            return this.parsePortsFromSpec(n);
        }, e.prototype.parsePortsFromSpec = function(e) {
            var t = [];
            return r.each(e, function(e, n) {
                var r = n.split("/");
                1 === r.length && r.push("tcp");
                var i = parseInt(r[0], 10);
                isNaN(i) ? this.Logger.warn("Container port " + r[0] + " is not a number") : t.push({
                    containerPort: i,
                    protocol: r[1].toUpperCase()
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
                            labels: r.assign({
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
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), i = n(0), a = function() {
        function e(e, t, n, r, i, a) {
            this.$filter = e, this.$q = t, this.constants = n, this.apiService = r, this.dataService = i, 
            this.logger = a;
        }
        return e.prototype.getCatalogItems = function(e) {
            var t = this, n = this.$q.defer(), r = {}, i = 0, a = 0, s = [], o = {
                group: "servicecatalog.k8s.io",
                resource: "serviceclasses"
            };
            return this.apiService.apiInfo(o) && (++i, this.dataService.list(o, {}).then(function(e) {
                r.serviceClasses = e.by("metadata.name");
            }, function() {
                s.push("service classes");
            }).finally(function() {
                t.returnCatalogItems(n, r, ++a, i, s);
            })), ++i, this.dataService.list("imagestreams", {
                namespace: "openshift"
            }).then(function(e) {
                r.imageStreams = e.by("metadata.name");
            }, function() {
                s.push("builder images");
            }).finally(function() {
                t.returnCatalogItems(n, r, ++a, i, s);
            }), e && (++i, this.dataService.list("templates", {
                namespace: "openshift"
            }).then(function(e) {
                r.templates = e.by("metadata.name");
            }, function() {
                s.push("templates");
            }).finally(function() {
                t.returnCatalogItems(n, r, ++a, i, s);
            })), n.promise;
        }, e.prototype.convertToServiceItems = function(e, t, n) {
            var r = this, a = i.map(e, function(e) {
                return r.getServiceItem(e);
            });
            return a = a.concat(i.map(t, function(e) {
                return r.getImageItem(e);
            })), a = a.concat(i.map(n, function(e) {
                return r.getTemplateItem(e);
            })), a = i.reject(a, function(e) {
                return !e;
            }), a = a.sort(function(e, t) {
                var n = i.get(e, "name", "").localeCompare(i.get(t, "name", ""), void 0, {
                    sensitivity: "base"
                });
                return 0 === n && (n = i.get(e, "resource.kind", "").localeCompare(i.get(t, "resource.kind", ""), void 0, {
                    sensitivity: "base"
                })), 0 === n && (n = i.get(e, "resource.metadata.name", "").localeCompare(i.get(t, "resource.metadata.name", ""), void 0, {
                    sensitivity: "base"
                })), n;
            }), this.categorizeItems(a), a;
        }, e.prototype.getServiceItem = function(e) {
            return new s(e, this);
        }, e.prototype.getImageItem = function(e) {
            var t = new o(e, this);
            return t.builderSpecTagName ? t : null;
        }, e.prototype.getTemplateItem = function(e) {
            return new c(e, this);
        }, e.prototype.categorizeItems = function(e) {
            var t, n, a = this;
            this.categories = r.copy(this.constants.SERVICE_CATALOG_CATEGORIES), this.createAllAndOtherMainCategories();
            var s = i.first(this.categories), o = i.get(s, "subCategories[0]"), c = i.last(this.categories), l = i.get(c, "subCategories[0]");
            i.each(e, function(e) {
                n = !1, i.each(a.categories, function(r) {
                    r.tags ? a.hasMatchingTags(r.tags, e.tags) && (n = a.categorizeItem(e, r, "all"), 
                    t = a.filterSubCatsByTags(r.subCategories, e.tags), i.isEmpty(t) ? a.categorizeItem(e, r, "other") : i.each(t, function(t) {
                        a.categorizeItem(e, r, t);
                    })) : (t = a.filterSubCatsByTags(r.subCategories, e.tags), i.isEmpty(t) || (n = a.categorizeItem(e, r, "all"), 
                    i.each(t, function(t) {
                        a.categorizeItem(e, r, t);
                    })));
                }), n || a.categorizeItem(e, c, l), a.categorizeItem(e, s, o);
            });
        }, e.prototype.categorizeItem = function(e, t, n) {
            return i.isString(n) && (n = this.getAllOrOtherSubCategory(t, n)), n.items = i.isArray(n.items) ? n.items.concat([ e ]) : [ e ], 
            t.hasItems = n.hasItems = !0;
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
            var n = i.find(e.subCategories, {
                id: t
            });
            return n || ("other" === t ? (n = {
                id: "other",
                label: "Other"
            }, e.subCategories.push(n)) : (n = {
                id: "all",
                label: "All"
            }, e.subCategories.unshift(n))), n;
        }, e.prototype.hasMatchingTags = function(e, t) {
            return i.some(e, function(e) {
                var n = e.toLowerCase();
                return i.some(t, function(e) {
                    return n === e.toLowerCase();
                });
            });
        }, e.prototype.filterSubCatsByTags = function(e, t) {
            var n = this;
            return i.filter(e, function(e) {
                return n.hasMatchingTags(e.tags, t);
            });
        }, e.prototype.returnCatalogItems = function(e, t, n, r, a) {
            if (!(n < r)) {
                a = i.size(a) ? "Unable to load all content for the catalog. Error loading " + this.formatArray(a) : null;
                var s = this.convertToServiceItems(t.serviceClasses, t.imageStreams, t.templates);
                e.resolve([ s, a ]);
            }
        }, e.prototype.formatArray = function(e) {
            var t = "";
            return 1 === e.length ? t = e[0] : 2 === e.length ? t = e.join(" and ") : e.length > 2 && (t = e.slice(0, -1).join(", ") + ", and " + e.slice(-1)), 
            t + ".";
        }, e;
    }();
    a.$inject = [ "$filter", "$q", "Constants", "APIService", "DataService", "Logger" ], 
    t.CatalogService = a;
    var s = function() {
        function e(e, t) {
            this.resource = e, this.catalogSrv = t, this.imageUrl = this.getImage(), this.iconClass = this.getIcon(), 
            this.name = this.getName(), this.description = this.getDescription(), this.longDescription = this.getLongDescription(), 
            this.tags = this.getTags();
        }
        return e.prototype.getImage = function() {
            return i.get(this.resource, "externalMetadata.imageUrl", "");
        }, e.prototype.getIcon = function() {
            var e = i.get(this.resource, [ "externalMetadata", "console.openshift.io/iconClass" ], "fa fa-cubes");
            return e = -1 !== e.indexOf("icon-") ? "font-icon " + e : e;
        }, e.prototype.getName = function() {
            return i.get(this.resource, "externalMetadata.displayName", this.resource.metadata.name);
        }, e.prototype.getDescription = function() {
            return i.get(this.resource, "description", "");
        }, e.prototype.getLongDescription = function() {
            return i.get(this.resource, "externalMetadata.longDescription", "");
        }, e.prototype.getTags = function() {
            return i.get(this.resource, "alphaTags", []);
        }, e;
    }();
    t.ServiceItem = s;
    var o = function() {
        function e(e, t) {
            this.resource = e, this.catalogSrv = t, this.builderSpecTagName = this.getBuilderSpecTagName(), 
            this.builderSpecTagName && (this.tags = this.getTags(), this.iconClass = this.getIcon(), 
            this.name = this.getName(), this.description = this.getDescription(), this.longDescription = this.getLongDescription());
        }
        return e.prototype.getBuilderSpecTagName = function() {
            var e, t = this;
            return this.resource.status ? (this.resource.spec && this.resource.spec.tags && (e = i.find(this.resource.spec.tags, function(e) {
                var n = i.get(e, "annotations.tags");
                if (n && (n = n.split(/\s*,\s*/), i.includes(n, "builder") && !i.includes(n, "hidden"))) return i.some(t.resource.status.tags, function(t) {
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
            this.tags = this.getTags();
        }
        return e.prototype.getImage = function() {
            return "";
        }, e.prototype.getIcon = function() {
            var e = i.get(this.resource, "metadata.annotations.iconClass", "fa fa-cubes");
            return e = -1 !== e.indexOf("icon-") ? "font-icon " + e : e;
        }, e.prototype.getName = function() {
            return this.catalogSrv.$filter("displayName")(this.resource);
        }, e.prototype.getDescription = function() {
            return i.get(this.resource, "metadata.annotations.description", "");
        }, e.prototype.getLongDescription = function() {
            return i.get(this.resource, [ "metadata", "annotations", "template.openshift.io/long-description" ], "");
        }, e.prototype.getTags = function() {
            return i.get(this.resource, "metadata.annotations.tags", "").split(/\s*,\s*/);
        }, e;
    }();
    t.TemplateItem = c;
}, function(e, t, n) {
    "use strict";
    (function(e) {
        t.__esModule = !0;
        var n = function() {
            function t(e) {
                this.$rootScope = e;
            }
            return t.prototype.getItems = function() {
                var e = localStorage.getItem("catalog-recently-viewed-services");
                return e ? JSON.parse(e) : [];
            }, t.prototype.addItem = function(t) {
                var n = this.getItems();
                e.remove(n, function(e) {
                    return e === t;
                }), n.unshift(t), n = e.take(n, 4), this.setRecentlyViewedItems(n);
            }, t.prototype.setRecentlyViewedItems = function(e) {
                localStorage.setItem("catalog-recently-viewed-services", JSON.stringify(e)), this.$rootScope.$emit("recently-viewed-updated");
            }, t;
        }();
        n.$inject = [ "$rootScope" ], t.RecentlyViewedServiceItems = n;
    }).call(t, n(0));
}, function(e, t) {
    e.exports = '\x3c!-- Use angular-schema-form to show a form based on the parameter JSON schema. --\x3e\n<ng-form\n  sf-model="$ctrl.model"\n  sf-form="$ctrl.parameterForm"\n  sf-schema="$ctrl.parameterSchema"\n  sf-options="$ctrl.parameterFormDefaults">\n</ng-form>\n';
}, function(e, t) {
    e.exports = '<div class="catalog-search">\n  <form role="form" class="landing-search-form search-pf has-button">\n    <div class="form-group has-clear">\n      <div class="search-pf-input-group">\n        <label for="search-input" class="sr-only">Search Catalog</label>\n        <span class="fa fa-search catalog-search-icon" aria-hidden="true"></span>\n        <input\n            id="search-input"\n            type="search"\n            class="form-control catalog-search-input"\n            placeholder="Search Catalog"\n            ng-model="$ctrl.searchText"\n            uib-typeahead="item.name for item in $ctrl.search($viewValue)"\n            typeahead-on-select="$ctrl.itemSelected($item)"\n            typeahead-template-url="catalog-search/catalog-search-result.html">\n        <button\n            type="button"\n            ng-if="$ctrl.searchText"\n            ng-click="$ctrl.searchText = \'\'"\n            class="clear">\n          <span class="sr-only">Clear Search Input</span>\n          <span class="pficon pficon-close" aria-hidden="true"></span>\n        </button>\n      </div>\n    </div>\n  </form>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="order-service">\n  <div pf-wizard\n       hide-header="true"\n       hide-sidebar="true"\n       hide-back-button="true"\n       step-class="order-service-wizard-step"\n       wizard-ready="$ctrl.wizardReady"\n       next-title="$ctrl.nextTitle"\n       on-finish="$ctrl.closePanel()"\n       on-cancel="$ctrl.closePanel()"\n       wizard-done="$ctrl.wizardDone"\n       class="pf-wizard-no-back">\n    <div pf-wizard-step ng-repeat="step in $ctrl.steps track by $index"\n         step-title="{{step.label}}"\n         wz-disabled="{{step.hidden}}"\n         allow-click-nav="step.allowed"\n         next-enabled="step.valid && !$ctrl.updating"\n         prev-enabled="step.prevEnabled"\n         on-show="step.onShow"\n         step-id="{{step.id}}"\n         step-priority="{{$index}}">\n      <div class="wizard-pf-main-inner-shadow-covers">\n        <div class="order-service-details">\n          <div class="order-service-details-top">\n            <div class="service-icon">\n              <span class="icon {{$ctrl.imageStream.iconClass}}"></span>\n            </div>\n            <div class="service-title-area">\n              <div class="service-title">\n                {{$ctrl.imageStream.name}}\n                {{$ctrl.istag.name}}\n              </div>\n              <div class="order-service-tags">\n                <span ng-repeat="tag in $ctrl.istag.annotations.tags.split(\',\')" class="tag">\n                  {{tag}}\n                </span>\n              </div>\n            </div>\n          </div>\n          <div class="order-service-description-block">\n            <p ng-bind-html="$ctrl.istag.annotations.description | linky : \'_blank\'" class="description"></p>\n            <p ng-if="$ctrl.istag.annotations.sampleRepo">\n              Sample Repository:\n              \x3c!-- TODO: Use Git link filter, needs to be added to origin-web-common --\x3e\n              <span ng-bind-html="$ctrl.istag.annotations.sampleRepo | linky : \'_blank\'">\n            </p>\n          </div>\n        </div>\n        <div class="order-service-config">\n          <div ng-include="step.view" class="wizard-pf-main-form-contents"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="landing">\n  <overlay-panel show-panel="$ctrl.orderingPanelVisible" show-close="true" handle-close="$ctrl.closeOrderingPanel">\n    <order-service\n        ng-if="$ctrl.selectedItem.resource.kind === \'ServiceClass\'"\n        base-project-url="{{$ctrl.baseProjectUrl}}"\n        service-class="$ctrl.selectedItem"\n        handle-close="$ctrl.closeOrderingPanel">\n    </order-service>\n    <create-from-builder\n        ng-if="$ctrl.selectedItem.resource.kind === \'ImageStream\'"\n        base-project-url="{{$ctrl.baseProjectUrl}}"\n        image-stream="$ctrl.selectedItem"\n        handle-close="$ctrl.closeOrderingPanel">\n    </create-from-builder>\n  </overlay-panel>\n  <div class="landing-search-area" ng-transclude="landingsearch"></div>\n  <div class="landing-main-area">\n    <div class="landing-header-area" ng-transclude="landingheader"></div>\n    <div class="landing-body-area">\n      <div ng-transclude="landingbody"></div>\n    </div>\n  </div>\n  <div class="landing-side-bar" ng-transclude="landingside"></div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="order-service">\n  <div pf-wizard\n       hide-header="true"\n       hide-sidebar="true"\n       step-class="order-service-wizard-step"\n       wizard-ready="$ctrl.wizardReady"\n       next-title="$ctrl.nextTitle"\n       on-finish="$ctrl.closePanel()"\n       on-cancel="$ctrl.closePanel()"\n       wizard-done="$ctrl.wizardDone">\n    <div pf-wizard-step ng-repeat="step in $ctrl.steps track by $index"\n         step-title="{{step.label}}"\n         wz-disabled="{{step.hidden}}"\n         allow-click-nav="step.allowed"\n         next-enabled="step.valid && !$ctrl.updating"\n         prev-enabled="step.prevEnabled"\n         on-show="step.onShow"\n         step-id="{{step.id}}"\n         step-priority="{{$index}}">\n      <div class="wizard-pf-main-inner-shadow-covers">\n        <div class="order-service-details">\n          <div class="order-service-details-top">\n            <div class="service-icon">\n              <span ng-if="!$ctrl.imageUrl" class="icon {{$ctrl.iconClass}}"></span>\n              <span ng-if="$ctrl.imageUrl" class="image"><img ng-src="{{$ctrl.imageUrl}}" alt=""></span>\n            </div>\n            <div class="service-title-area">\n              <div class="service-title">\n                {{$ctrl.serviceName}}\n              </div>\n              <div ng-if="$ctrl.serviceClass.tags" class="order-service-tags">\n                <span ng-repeat="tag in $ctrl.serviceClass.tags" class="tag">\n                  {{tag}}\n                </span>\n              </div>\n              <div ng-if="$ctrl.serviceClass.resource.externalMetadata.documentationUrl" class="order-service-documentation-url">\n                <a ng-href="{{$ctrl.serviceClass.resource.externalMetadata.documentationUrl}}" target="_blank" class="learn-more-link">Learn More <i class="fa fa-external-link" aria-hidden="true"></i></a>\n              </div>\n            </div>\n          </div>\n          <div class="order-service-description-block">\n            <p ng-if="$ctrl.currentStep.id !== \'plans\' && ($ctrl.selectedPlan.externalMetadata.displayName || $ctrl.selectedPlan.description)">\n              <span ng-if="$ctrl.selectedPlan.externalMetadata.displayName">\n                Plan {{$ctrl.selectedPlan.externalMetadata.displayName}}\n                <span ng-if="$ctrl.selectedPlan.description">&ndash;</span>\n              </span>\n              <span ng-if="$ctrl.selectedPlan.description">{{$ctrl.selectedPlan.description}}</span>\n            </p>\n            <p ng-if="$ctrl.description" ng-bind-html="$ctrl.description | linky : \'_blank\'" class="description"></p>\n            <p ng-if="$ctrl.longDescription" ng-bind-html="$ctrl.longDescription | linky : \'_blank\'" class="description"></p>\n          </div>\n        </div>\n        <div class="order-service-config">\n          <div ng-include="step.view" class="wizard-pf-main-form-contents"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="catalogs-overlay-modal" role="dialog">\n  <div ng-if="$ctrl.shown" class="modal-backdrop fade in"></div>\n  <div ng-if="$ctrl.shown" class="catalogs-overlay-panel-wrapper">\n    <div class="catalogs-overlay-panel-grow-height">\n      <div class="catalogs-overlay-panel" ng-class="{\'catalogs-overlay-panel-single-column\' : $ctrl.singleColumn}">\n        <a ng-if="$ctrl.showClose" ng-click="$ctrl.closePanel()">\n          <span class="catalogs-overlay-panel-close pficon pficon-close"></span>\n        </a>\n        <div class="catalogs-overlay-panel-body" ng-transclude>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div ng-if="$ctrl.loading" class="catalog-projects-spinner-container">\n  <div class="spinner spinner-xl"></div>\n</div>\n<div class="catalog-projects-summary-panel" ng-show="!$ctrl.loading">\n  <button ng-if="$ctrl.canCreate" class="create-button btn btn-primary" ng-click="$ctrl.openNewProjectPanel()">\n    <span class="fa fa-plus"></span>\n    <span class="create-button-text">Create Project</span>\n  </button>\n  <h2 class="summary-title secondary" ng-if="!$ctrl.projects || !$ctrl.projects.length">Getting Started</h2>\n  <h2 class="summary-title secondary" ng-if="$ctrl.projects && $ctrl.projects.length">\n    <a href="{{$ctrl.projectsUrl}}">My Projects</a>\n  </h2>\n  <div ng-if="!$ctrl.canCreate">\n    <span ng-if="!$ctrl.newProjectMessage">\n      A cluster admin can create a project for you by running the command:\n      <div class="code-block">\n        <code class="projects-instructions-link">oc adm <span class="command-arg">new-project</span> &lt;projectname&gt; <span class="command-arg">--admin={{$ctrl.user.metadata.name || \'&lt;YourUsername&gt;\'}}</span></code>\n      </div>\n    </span>\n    <span ng-if="$ctrl.newProjectMessage" ng-bind-html="$ctrl.newProjectMessage | linky : \'_blank\'"></span>\n  </div>\n  <div class="catalog-modal catalog-modal-create-project" ng-if="$ctrl.showNewProjectPanel">\n    <h4 class="catalog-modal-title">\n      Create Project\n    </h4>\n    <create-project alerts="$ctrl.alerts" is-dialog="true" redirect-action="$ctrl.onNewProject" on-cancel="$ctrl.closeNewProjectPanel"></create-project>\n    <a href="" class="catalog-modal-close" ng-click="$ctrl.closeNewProjectPanel()">\n      <span class="pficon pficon-close"></span>\n    </a>\n  </div>\n  <div ng-if="$ctrl.projects && $ctrl.projects.length" class="catalog-project-summary-list">\n    <div class="projects-count">\n      <strong>{{$ctrl.projects.length}}</strong>\n      of\n      <strong>{{$ctrl.totalProjects}}</strong>\n      Projects\n      <a href="{{$ctrl.projectsUrl}}" class="projects-view-all">View All</a>\n    </div>\n    <div id="catalog-projects-summary-list">\n      <div ng-repeat="project in $ctrl.projects track by (project | uid)" class="project-tile tile-click">\n        <div class="dropdown  dropdown-kebab-pf" uib-dropdown="">\n          <button class="btn btn-link uib-dropdown-toggle" type="button" id="dropdownKebab" aria-haspopup="true" aria-expanded="true" uib-dropdown-toggle>\n            <span class="fa fa-ellipsis-v"></span>\n          </button>\n          <ul class="uib-dropdown-menu dropdown-menu-right" aria-labelledby="dropdownKebab">\n            <li><a href="" ng-click="$ctrl.onViewMemebership(project)">View Membership</a></li>\n            <li><a href="" ng-click="$ctrl.editProject(project)">Edit Project</a></li>\n            <li>\n              <delete-project\n                  label="Delete Project"\n                  project-name="{{project.metadata.name}}"\n                  display-name="{{(project | displayName)}}"\n                  type-name-to-confirm="true"\n                  stay-on-current-page="true"\n                  alerts="$ctrl.alerts">\n              </delete-project>\n            </li>\n          </ul>\n        </div>\n        <h3 class="project-tile-header">\n          <span ng-if="project.statusIconClass" class="project-status {{project.statusIconClass}}"></span>\n          <a href="{{project | projectUrl : $ctrl.baseProjectUrl}}" class="project-title tile-target">{{project | displayName}}</a>\n        </h3>\n        <p class="project-date">\n          <span ng-if="project | displayName : true"><span ng-bind-html="project.metadata.name"></span> &ndash;</span>\n          created\n          <span ng-if="project | annotation : \'openshift.io/requester\'">by <span ng-bind-html="project | annotation : \'openshift.io/requester\'"></span></span>\n          <span am-time-ago="project.metadata.creationTimestamp"></span>\n        </p>\n        <div class="project-description" ng-if="project | description">\n          <truncate-long-text content="project | description" use-word-boundary="true" limit="120"></truncate-long-text>\n        </div>\n        <div class="catalog-modal catalog-modal-edit-project tile-click-prevent" ng-if="$ctrl.showEditProjectPanel && $ctrl.edittingProject === project">\n          <h4 class="catalog-modal-title">\n            Edit Project\n          </h4>\n          <edit-project project="$ctrl.edittingProject" is-dialog="true" alerts="$ctrl.alerts" redirect-action="$ctrl.onEditProject" on-cancel="$ctrl.closeEditProjectPanel"></edit-project>\n          <a href="" class="catalog-modal-close" ng-click="$ctrl.closeEditProjectPanel()">\n            <span class="pficon pficon-close"></span>\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div ng-if="$ctrl.showGetStarted">\n    <div class="getting-started-panel">\n      <h2 class="secondary" ng-if="$ctrl.projects && $ctrl.projects.length > 0">Getting Started</h2>\n      <button ng-if="$ctrl.startTour()" class="getting-started-button btn btn-default hidden-xs" ng-class="{\'with-projects\': $ctrl.projects && $ctrl.projects.length}" ng-click="$ctrl.handleGettingStartedClick()">\n        <span class="fa fa-info-circle fa-2"></span>\n        <span class="getting-started-button-text">Take Home Page Tour</span>\n      </button>\n    </div>\n    <div class="resources-panel">\n      <ul>\n        <li ng-repeat="resource in $ctrl.resourceLinks">\n          <a href="{{resource.href}}" target="_blank" title="{{resource.href}}">{{resource.title}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n  <div ng-if="$ctrl.recentlyViewedItems.length">\n    <h2 class="secondary">Recently Viewed</h2>\n    <div class="services-view">\n      <a href="" class="services-item" ng-repeat="item in $ctrl.recentlyViewedItems track by (item.resource | uid)"\n           ng-click="$ctrl.orderService(item)">\n        <div ng-if="!item.imageUrl" class="services-item-icon">\n          <span class="{{item.iconClass}}"></span>\n        </div>\n        <div ng-if="item.imageUrl" class="services-item-icon services-item-img">\n          <img ng-src="{{item.imageUrl}}">\n        </div>\n        <div class="services-item-name" title="{{item.name}}" aria-hidden="true">{{item.name}}</div>\n      </a>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<span ng-if="$ctrl.hasSaasOfferings()" class="saas-offerings-container">\n  <h1 ng-if="$ctrl.saasTitle">{{$ctrl.saasTitle}}</h1>\n  <div class="saas-list" ng-class="{\'expanded\': $ctrl.sassListExpanded, \'items-overflow\': $ctrl.itemsOverflow}" items="$ctrl.saasOfferings">\n    <div class="card" ng-repeat="item in $ctrl.saasOfferings">\n      <a ng-href="{{item.url}}" target="_blank" class="card-content">\n        <div class="card-icon">\n          <img ng-if="item.image" ng-src="{{item.image}}" alt="">\n          <span ng-if="!item.image" class="icon {{item.icon}}" aria-hidden="true"></span>\n        </div>\n        <div class="card-title">{{item.title}}</div>\n        <truncate-long-text\n                class="card-description hidden-xs"\n                content="item.description"\n                limit="120"\n                use-word-boundary="true">\n        </truncate-long-text>\n      </a>\n    </div>\n  </div>\n  <div ng-if="$ctrl.itemsOverflow" class="sass-list-expander-container">\n    <a href="" class="sass-list-expander" ng-class="{\'expanded\': $ctrl.sassListExpanded}" ng-click="$ctrl.toggleListExpand()">\n      Show <span class="more">More</span><span class="less">Less</span>\n    </a>\n  </div>\n</span>\n';
}, function(e, t) {
    e.exports = '<ng-form>\n  <div class="form-group">\n    <label class="control-label" for="project">Add to Project</label>\n    <ui-select ng-model="$ctrl.selectedProject">\n      <ui-select-match>\n        {{$select.selected | displayName}}\n      </ui-select-match>\n      <ui-select-choices repeat="project in $ctrl.projects | searchProjects : $select.search track by (project | uid)">\n        <span ng-bind-html="project | displayName | highlightKeywords : $select.search"></span>\n        <span ng-if="project | displayName : true" class="small text-muted">\n          <span ng-if="project.metadata.name">&ndash;</span>\n          <span ng-bind-html="project.metadata.name | highlightKeywords : $select.search"></span>\n        </span>\n      </ui-select-choices>\n    </ui-select>\n  </div>\n</ng-form>\n\n<ng-form name="$ctrl.forms.createProjectForm"\n    ng-if="$ctrl.isNewProject()">\n  <div class="form-group">\n    <label for="name" class="control-label required">Project Name</label>\n    <div ng-class="{\'has-error\': ($ctrl.forms.createProjectForm.name.$error.pattern && $ctrl.forms.createProjectForm.name.$touched) || $ctrl.nameTaken}">\n      <input class="form-control"\n          name="name"\n          id="name"\n          placeholder="my-project"\n          type="text"\n          required\n          take-focus\n          minlength="2"\n          maxlength="63"\n          pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?"\n          aria-describedby="nameHelp"\n          ng-model="$ctrl.selectedProject.metadata.name"\n          osc-unique="$ctrl.existingProjectNames"\n          ng-model-options="{ updateOn: \'default blur\' }"\n          ng-change="$ctrl.onNewProjectNameChange()"\n          autocorrect="off"\n          autocapitalize="off"\n          spellcheck="false">\n      <div class="help-block">A unique name for the project.</div>\n      <div class="has-error" ng-if="$ctrl.forms.createProjectForm.name.$error.minlength && $ctrl.forms.createProjectForm.name.$touched">\n        <span id="nameHelp" class="help-block">\n          Name must have at least two characters.\n        </span>\n      </div>\n      <div class="has-error" ng-if="$ctrl.forms.createProjectForm.name.$error.pattern && $ctrl.forms.createProjectForm.name.$touched">\n        <span id="nameHelp" class="help-block">\n          Project names may only contain lower-case letters, numbers, and dashes.\n          They may not start or end with a dash.\n        </span>\n      </div>\n      <div class="has-error" ng-if="$ctrl.nameTaken || $ctrl.forms.createProjectForm.name.$error.oscUnique">\n        <span class="help-block">\n          This name is already in use. Please choose a different name.\n        </span>\n      </div>\n    </div>\n  </div>\n\n  <div class="form-group">\n    <label for="displayName" class="control-label">Project Display Name</label>\n    <input class="form-control"\n      name="displayName"\n      id="displayName"\n      placeholder="My Project"\n      type="text"\n      ng-model="$ctrl.selectedProject.metadata.annotations[\'new-display-name\']">\n  </div>\n\n  <div class="form-group">\n    <label for="description" class="control-label">Project Description</label>\n    <textarea class="form-control"\n      name="description"\n      id="description"\n      placeholder="A short description."\n      ng-model="$ctrl.selectedProject.metadata.annotations[\'openshift.io/description\']"></textarea>\n  </div>\n</ng-form>\n';
}, function(e, t) {
    e.exports = '<div class="services-view">\n  <div ng-if="!$ctrl.loaded" class="spinner-container">\n    <div class="spinner spinner-xl"></div>\n  </div>\n  <div ng-if="$ctrl.loaded" class="services-view-container">\n    <h1>Browse Catalog</h1>\n\n    <ul class="nav nav-tabs nav-tabs-pf">\n      <li ng-repeat="category in $ctrl.categories"\n          ng-if="category.hasItems"\n          ng-class="{\'active\': $ctrl.currentFilter === category.id}">\n        <a href="" id="{{\'category-\'+category.id}}" ng-click="$ctrl.filterByCategory(category.id, \'all\', true)">{{category.label}}</a>\n      </li>\n    </ul>\n\n    \x3c!-- Do not show sub-category items for \'All\' or \'Other\' main categories --\x3e\n\n    <div class="services-sub-categories" ng-if="$ctrl.currentFilter !== \'other\' && $ctrl.currentFilter !== \'all\'">\n      <div ng-repeat="subCategory in $ctrl.subCategories"\n           ng-if="subCategory.hasItems"\n           class="services-sub-category" ng-class="{\'active\': $ctrl.currentSubFilter === subCategory.id}">\n        <a href=""  id="{{\'services-sub-category-\'+subCategory.id}}"\n           class="services-sub-category-tab" ng-click="$ctrl.selectSubCategory(subCategory.id)">\n          <div class="services-sub-category-tab-image" ng-if="subCategory.imageUrl">\n            <img ng-src="{{subCategory.imageUrl}}" alt="">\n          </div>\n          <div class="services-sub-category-tab-icon {{subCategory.icon}}" ng-if="subCategory.icon && !subCategory.imageUrl"></div>\n          <div class="services-sub-category-tab-name">{{subCategory.label}}</div>\n        </a>\n        <div ng-if="$ctrl.currentSubFilter === subCategory.id" class="services-items">\n          <a href="" class="services-item" ng-repeat="item in $ctrl.filteredItems" ng-click="$ctrl.handleClick(item)">\n            <div ng-if="!item.imageUrl" class="services-item-icon">\n              <span class="{{item.iconClass}}"></span>\n            </div>\n            <div ng-if="item.imageUrl" class="services-item-icon">\n              <img ng-src="{{item.imageUrl}}" alt="">\n            </div>\n            <div class="services-item-name" title="{{item.name}}">\n              {{item.name}}\n            </div>\n          </a>\n        </div>\n      </div>\n    </div>\n\n    \x3c!-- Show catalog item for \'All\' and \'Other\' main categories --\x3e\n\n    <div ng-if="$ctrl.currentFilter === \'other\' || $ctrl.currentFilter === \'all\'" class="services-items">\n      <div ng-if="$ctrl.isEmpty">There are no catalog items.</div>\n      <a href="" class="services-item" ng-repeat="item in $ctrl.filteredItems" ng-click="$ctrl.handleClick(item)">\n        <div ng-if="!item.imageUrl" class="services-item-icon">\n          <span class="{{item.iconClass}}"></span>\n        </div>\n        <div ng-if="item.imageUrl" class="services-item-icon">\n          <img ng-src="{{item.imageUrl}}" alt="">\n        </div>\n        <div class="services-item-name" title="{{item.name}}">\n          {{item.name}}\n        </div>\n      </a>\n    </div>\n  </div>\n</div>\n';
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = function() {
        function e() {
            this.ctrl = this;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.parameterForm = [ "*" ], this.ctrl.parameterFormDefaults = {
                formDefaults: {
                    disableSuccessState: !0,
                    feedback: !1
                },
                pristine: {
                    errors: !1,
                    success: !0
                }
            };
        }, e;
    }();
    t.CatalogParametersController = r;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(0), i = function() {
        function e(e, t, n, r) {
            this.ctrl = this, this.loaded = !1, this.$scope = e, this.$q = t, this.Catalog = n, 
            this.KeywordService = r;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.searchText = "";
        }, e.prototype.$onChanges = function(e) {
            if (e.catalogItems && this.ctrl.catalogItems && (this.loaded = !0, this.searchDeferred)) {
                var t = this.filterForKeywords(this.ctrl.searchText);
                this.searchDeferred.resolve(t), this.searchDeferred = null;
            }
        }, e.prototype.itemSelected = function(e) {
            this.$scope.$emit("open-overlay-panel", e), this.ctrl.searchText = "";
        }, e.prototype.search = function(e) {
            return e ? this.loaded ? this.filterForKeywords(e) : (this.searchDeferred = this.$q.defer(), 
            this.searchDeferred.promise) : [];
        }, e.prototype.filterForKeywords = function(e) {
            var t = this.KeywordService.generateKeywords(e), n = this.KeywordService.filterForKeywords(this.ctrl.catalogItems, [ "name", "tags" ], t);
            return r.take(n, 5);
        }, e;
    }();
    i.$inject = [ "$scope", "$q", "Catalog", "KeywordService" ], t.CatalogSearchController = i;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), i = n(0), a = n(52), s = function() {
        function e(e, t, n, r, a, s, o, c, l, d, p) {
            var m = this;
            this.ctrl = this, this.watches = [], this.clearValidityWatcher = function() {
                m.validityWatcher && (m.validityWatcher(), m.validityWatcher = void 0);
            }, this.showConfig = function() {
                m.clearValidityWatcher(), m.ctrl.nextTitle = "Next >", m.reviewStep.allowed = m.bindStep.hidden && m.configStep.valid, 
                m.validityWatcher = m.$scope.$watch("$ctrl.builderForm.$valid", function(e, t) {
                    m.configStep.valid = e;
                });
            }, this.showBind = function() {
                m.clearValidityWatcher(), m.ctrl.nextTitle = "Create", m.reviewStep.allowed = !0;
            }, this.showResults = function() {
                m.clearValidityWatcher(), m.ctrl.nextTitle = "Close", m.ctrl.wizardDone = !0, m.createApp();
            }, this.onProjectUpdate = function() {
                m.isNewProject() ? (m.ctrl.serviceInstances = [], m.updateBindability()) : (m.ctrl.updating = !0, 
                m.ProjectsService.get(m.ctrl.selectedProject.metadata.name).then(i.spread(function(e, t) {
                    var n = {
                        group: "servicecatalog.k8s.io",
                        resource: "instances"
                    };
                    m.watches.push(m.DataService.watch(n, t, function(e) {
                        m.ctrl.serviceInstances = i.filter(i.toArray(e.by("metadata.name")), m.isServiceBindable), 
                        m.sortServiceInstances(), m.ctrl.updating = !1, m.updateBindability();
                    }));
                })));
            }, this.isServiceBindable = function(e) {
                return m.BindingService.isServiceBindable(e, m.ctrl.serviceClasses);
            }, this.$scope = e, this.$filter = t, this.$location = n, this.$q = r, this.BuilderAppService = a, 
            this.ProjectsService = s, this.DataService = o, this.APIService = c, this.BindingService = l, 
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
                onShow: this.showConfig
            }, this.bindStep = {
                label: "Binding",
                id: "bind",
                view: "create-from-builder/create-from-builder-bind.html",
                valid: !0,
                allowed: !1,
                hidden: !1,
                onShow: this.showBind
            }, this.reviewStep = {
                label: "Results",
                id: "results",
                view: "create-from-builder/create-from-builder-results.html",
                valid: !0,
                allowed: !1,
                hidden: !1,
                prevEnabled: !1,
                onShow: this.showResults
            }, this.ctrl.steps = [ this.configStep, this.bindStep, this.reviewStep ], this.ctrl.versions = this.getVersions(), 
            this.ctrl.istag = i.first(this.ctrl.versions), this.ctrl.nameMaxLength = 24, this.ctrl.namePattern = /^[a-z]([-a-z0-9]*[a-z0-9])?$/, 
            this.ctrl.repositoryPattern = /^[a-z][a-z0-9+.-@]*:(\/\/)?[0-9a-z_-]+/, this.ctrl.wizardDone = !1, 
            this.ctrl.serviceToBind = "", this.ctrl.updating = !1, this.ctrl.serviceInstances = [], 
            this.selectedProjectWatch = this.$scope.$watch(function() {
                return e.ctrl.selectedProject;
            }, this.onProjectUpdate), this.getServiceClasses();
        }, e.prototype.closePanel = function() {
            r.isFunction(this.ctrl.handleClose) && this.ctrl.handleClose();
        }, e.prototype.$onDestroy = function() {
            this.DataService.unwatchAll(this.watches), this.selectedProjectWatch(), this.clearValidityWatcher();
        }, e.prototype.fillSampleRepo = function() {
            if (this.ctrl.repository = i.get(this, "ctrl.istag.annotations.sampleRepo"), !this.ctrl.name && this.ctrl.repository) {
                var e = this.ctrl.repository.substr(this.ctrl.repository.lastIndexOf("/") + 1);
                e = e.replace(/\.git$/, ""), e = i.trunc(e, this.ctrl.nameMaxLength), e = i.kebabCase(e), 
                this.ctrl.namePattern.test(e) && (this.ctrl.name = e);
            }
        }, e.prototype.navigateToAdvancedForm = function() {
            var e = "project/{project}/create/fromimage?imageStream={imageStream}&imageTag={imageTag}&namespace={namespace}&displayName={displayName}&name={name}&sourceURI={sourceURI}&advanced=true", t = a.expand(e, {
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
            var t = {}, n = {}, r = i.get(this, "ctrl.imageStream.resource.spec.tags", []);
            i.each(r, function(r) {
                if (e.referencesSameImageStream(r)) return t[r.name] = r.from.name, e.ctrl.referencedBy[r.from.name] = e.ctrl.referencedBy[r.from.name] || [], 
                void e.ctrl.referencedBy[r.from.name].push(r.name);
                var a = i.get(r, "annotations.tags", ""), s = a.split(/\s*,\s*/);
                i.includes(s, "builder") && !i.includes(s, "hidden") && (n[r.name] = r);
            });
            var a = [], s = i.get(this, "ctrl.imageStream.resource.status.tags", []);
            return i.each(s, function(e) {
                var t = n[e.tag];
                t && a.push(t);
            }), a;
        }, e.prototype.getImageStreamTag = function() {
            var e = this.ctrl.imageStream.resource.metadata.name + ":" + this.ctrl.istag.name;
            return this.DataService.get("imagestreamtags", e, {
                namespace: "openshift"
            });
        }, e.prototype.preselectService = function() {
            var e, t, n = this.$filter("statusCondition");
            i.each(this.ctrl.serviceInstances, function(r) {
                var a = "True" === i.get(n(r, "Ready"), "status");
                a && (!e || r.metadata.creationTimestamp > e.metadata.creationTimestamp) && (e = r), 
                a || t && !(r.metadata.creationTimestamp > t.metadata.creationTimestamp) || (t = r);
            }), this.ctrl.serviceToBind = i.get(e, "metadata.name") || i.get(t, "metadata.name");
        }, e.prototype.sortServiceInstances = function() {
            if (this.ctrl.serviceInstances) {
                var e = i.toArray(this.ctrl.serviceInstances), t = this.$filter("statusCondition");
                e.sort(function(e, n) {
                    var r = "True" === i.get(t(e, "Ready"), "status");
                    if (r === ("True" === i.get(t(n, "Ready"), "status"))) {
                        var a = i.get(e, "metadata.creationTimestamp");
                        return i.get(n, "metadata.creationTimestamp").localeCompare(a);
                    }
                    return r ? -1 : 1;
                }), this.ctrl.serviceInstances = e;
            }
        }, e.prototype.updateBindability = function() {
            this.ctrl.wizardDone || (this.bindStep.hidden = i.size(this.ctrl.serviceInstances) < 1, 
            this.bindStep.hidden ? (this.ctrl.serviceToBind = void 0, this.ctrl.nextTitle = "Create") : (this.preselectService(), 
            this.ctrl.nextTitle = "Next >"));
        }, e.prototype.isNewProject = function() {
            return !i.has(this.ctrl.selectedProject, "metadata.uid");
        }, e.prototype.createApp = function() {
            var e = this;
            this.createProjectIfNecessary().then(function(t) {
                e.ctrl.selectedProject = t, e.getImageStreamTag().then(function(t) {
                    var n = e.BuilderAppService.makeAPIObjects({
                        name: e.ctrl.name,
                        repository: e.ctrl.repository,
                        namespace: e.ctrl.selectedProject.metadata.name,
                        imageStreamTag: t
                    });
                    e.createAPIObjects(n), e.ctrl.serviceToBind && e.bindService();
                }, function(t) {
                    e.ctrl.error = t;
                });
            }, function(t) {
                e.ctrl.error = t;
            });
        }, e.prototype.createProjectIfNecessary = function() {
            if (!this.isNewProject()) return this.$q.when(this.ctrl.selectedProject);
            var e = this.ctrl.selectedProject.metadata.name, t = this.ctrl.selectedProject.metadata.annotations["new-display-name"], n = this.$filter("description")(this.ctrl.selectedProject), r = {
                apiVersion: "v1",
                kind: "ProjectRequest",
                metadata: {
                    name: e
                },
                displayName: t,
                description: n
            };
            return this.DataService.create("projectrequests", null, r, this.$scope);
        }, e.prototype.createAPIObjects = function(e) {
            var t = this;
            this.DataService.batch(e, {
                namespace: this.ctrl.selectedProject.metadata.name
            }).then(function(e) {
                e.failure.length ? t.ctrl.error = e : t.ctrl.success = !0;
            }, function(e) {
                t.ctrl.error = e;
            });
        }, e.prototype.bindService = function() {
            var e = this;
            this.ctrl.bindInProgress = !0, this.ctrl.bindError = !1;
            var t = {
                namespace: i.get(this.ctrl.selectedProject, "metadata.name")
            };
            this.BindingService.bindService(t, this.ctrl.serviceToBind, this.ctrl.name).then(function(n) {
                e.ctrl.binding = n, e.ctrl.bindInProgress = !1, e.ctrl.bindComplete = !0, e.ctrl.bindError = null, 
                e.DataService.watchObject(e.BindingService.bindingResource, i.get(e.ctrl.binding, "metadata.name"), t, function(t) {
                    e.ctrl.binding = t;
                });
            }, function(t) {
                e.ctrl.bindInProgress = !1, e.ctrl.bindComplete = !0, e.ctrl.bindError = t;
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
    s.$inject = [ "$scope", "$filter", "$location", "$q", "BuilderAppService", "ProjectsService", "DataService", "APIService", "BindingService", "Logger", "Constants" ], 
    t.CreateFromBuilderController = s;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = function() {
        function e(e, t) {
            var n = this;
            this.ctrl = this, this.closeOrderingPanel = function() {
                n.RecentlyViewed.addItem(n.ctrl.selectedItem.resource.metadata.uid), n.ctrl.orderingPanelVisible = !1;
            }, this.$scope = e, this.RecentlyViewed = t;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.searchText = "", this.ctrl.orderingPanelVisible = !1, this.$scope.$on("open-overlay-panel", function(t, n) {
                if ("Template" === n.resource.kind) {
                    var r = e.ctrl.onTemplateSelected();
                    return void (r && r(n.resource));
                }
                e.ctrl.selectedItem = n, e.ctrl.orderingPanelVisible = !0;
            });
        }, e.prototype.$onDestroy = function() {
            this.ctrl.orderingPanelVisible && this.closeOrderingPanel();
        }, e;
    }();
    r.$inject = [ "$scope", "RecentlyViewedServiceItems" ], t.LandingPageController = r;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), i = n(0), a = function() {
        function e(e, t, n, r, a, s, o) {
            var c = this;
            this.ctrl = this, this.watches = [], this.clearValidityWatcher = function() {
                c.validityWatcher && (c.validityWatcher(), c.validityWatcher = void 0), c.ctrl.reviewStep.allowed = !1;
            }, this.showPlan = function() {
                c.clearValidityWatcher(), c.ctrl.configPageShown = !1, c.ctrl.nextTitle = "Next >";
            }, this.showConfig = function() {
                c.clearValidityWatcher(), c.ctrl.configPageShown = !0, c.reviewStep.allowed = c.bindStep.hidden && c.configStep.valid, 
                c.updateBindability(), c.validityWatcher = c.$scope.$watch("$ctrl.forms.orderConfigureForm.$valid", function(e, t) {
                    c.configStep.valid = e, c.bindStep.allowed = c.configStep.valid, c.reviewStep.allowed = c.bindStep.hidden && c.configStep.valid;
                });
            }, this.showBind = function() {
                c.clearValidityWatcher(), c.ctrl.configPageShown = !1, c.ctrl.nextTitle = "Create", 
                c.reviewStep.allowed = c.bindStep.valid, c.validityWatcher = c.$scope.$watch("$ctrl.forms.bindForm.$valid", function(e, t) {
                    c.bindStep.valid = e, c.reviewStep.allowed = c.bindStep.valid;
                });
            }, this.showResults = function() {
                c.clearValidityWatcher(), c.ctrl.configPageShown = !1, c.ctrl.nextTitle = "Close", 
                c.ctrl.wizardDone = !0, c.provisionService();
            }, this.provisionService = function() {
                if (c.ctrl.inProgress = !0, c.ctrl.orderComplete = !1, c.ctrl.error = !1, c.isNewProject()) {
                    var e = c.ctrl.selectedProject.metadata.name, t = c.ctrl.selectedProject.metadata.annotations["new-display-name"], n = c.$filter("description")(c.ctrl.selectedProject), r = {
                        apiVersion: "v1",
                        kind: "ProjectRequest",
                        metadata: {
                            name: e
                        },
                        displayName: t,
                        description: n
                    };
                    c.DataService.create("projectrequests", null, r, c.$scope).then(function(e) {
                        c.ctrl.selectedProject = e, c.ctrl.projectDisplayName = c.$filter("displayName")(c.ctrl.selectedProject), 
                        c.createService();
                    }, function(e) {
                        c.ctrl.error = e.data;
                    });
                } else c.ctrl.projectDisplayName = c.$filter("displayName")(c.ctrl.selectedProject), 
                c.createService();
            }, this.onProjectUpdate = function() {
                c.isNewProject() ? (c.ctrl.applications = [], c.updateBindability()) : (c.ctrl.updating = !0, 
                c.ProjectsService.get(c.ctrl.selectedProject.metadata.name).then(i.spread(function(e, t) {
                    c.ctrl.bindType = "none", c.ctrl.serviceToBind = c.ctrl.serviceClass, c.DataService.list("deploymentconfigs", t).then(function(e) {
                        c.deploymentConfigs = i.toArray(e.by("metadata.name")), c.sortApplications();
                    }), c.DataService.list("replicationcontrollers", t).then(function(e) {
                        c.replicationControllers = i.reject(e.by("metadata.name"), c.hasDeploymentConfigFilter), 
                        c.sortApplications();
                    }), c.DataService.list({
                        group: "extensions",
                        resource: "deployments"
                    }, t).then(function(e) {
                        c.deployments = i.toArray(e.by("metadata.name")), c.sortApplications();
                    }), c.DataService.list({
                        group: "extensions",
                        resource: "replicasets"
                    }, t).then(function(e) {
                        c.replicaSets = i.reject(e.by("metadata.name"), c.hasDeploymentFilter), c.sortApplications();
                    }), c.DataService.list({
                        group: "apps",
                        resource: "statefulsets"
                    }, t).then(function(e) {
                        c.statefulSets = i.toArray(e.by("metadata.name")), c.sortApplications();
                    });
                })));
            }, this.watchResults = function(e, t, n) {
                c.watches.push(c.DataService.watchObject(e, t.metadata.name, n, function(e, t) {
                    var n = i.get(e, "status.conditions"), r = i.find(n, {
                        type: "Ready"
                    });
                    c.ctrl.orderComplete = r && "True" === r.status, c.ctrl.error = i.find(n, {
                        type: "ProvisionFailed"
                    });
                }));
            }, this.$scope = e, this.$filter = t, this.ProjectsService = n, this.DataService = r, 
            this.BindingService = a, this.Logger = s, this.hasDeploymentFilter = t("hasDeployment"), 
            this.hasDeploymentConfigFilter = t("hasDeploymentConfig"), this.ctrl.showPodPresets = i.get(o, [ "ENABLE_TECH_PREVIEW_FEATURE", "pod_presets" ], !1);
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.iconClass = this.ctrl.serviceClass.iconClass || "fa fa-cubes", this.ctrl.imageUrl = this.ctrl.serviceClass.imageUrl, 
            this.ctrl.serviceName = this.ctrl.serviceClass.name, this.ctrl.description = this.ctrl.serviceClass.description, 
            this.ctrl.longDescription = this.ctrl.serviceClass.longDescription, this.ctrl.plans = i.get(this, "ctrl.serviceClass.resource.plans", []), 
            this.ctrl.applications = [], this.ctrl.parameterData = {}, this.ctrl.forms = {}, 
            this.ctrl.selectedPlan = i.first(this.ctrl.plans), this.ctrl.planIndex = 0, this.ctrl.appToBind = null, 
            this.ctrl.configStepValid = !0, this.planStep = {
                id: "plans",
                label: "Plan",
                view: "order-service/order-service-plans.html",
                hidden: this.ctrl.plans.length < 2,
                allowed: !0,
                valid: !0,
                onShow: this.showPlan
            }, this.configStep = {
                label: "Configuration",
                id: "configure",
                view: "order-service/order-service-configure.html",
                hidden: !1,
                allowed: !0,
                valid: !1,
                onShow: this.showConfig
            }, this.bindStep = {
                label: "Binding",
                id: "bind",
                view: "order-service/order-service-bind.html",
                hidden: !1,
                allowed: !1,
                valid: !0,
                onShow: this.showBind
            }, this.reviewStep = {
                label: "Results",
                id: "results",
                view: "order-service/order-service-review.html",
                hidden: !1,
                allowed: !1,
                valid: !0,
                prevEnabled: !1,
                onShow: this.showResults
            }, this.ctrl.steps = [ this.planStep, this.configStep, this.bindStep, this.reviewStep ], 
            this.ctrl.nameTaken = !1, this.ctrl.wizardReady = !0, this.ctrl.wizardDone = !1, 
            this.ctrl.updating = !0, this.selectedProjectWatch = this.$scope.$watch(function() {
                return e.ctrl.selectedProject;
            }, this.onProjectUpdate);
        }, e.prototype.selectPlan = function(e) {
            this.ctrl.selectedPlan = e, this.ctrl.parameterData = {}, this.updateBindability();
        }, e.prototype.createService = function() {
            var e = this, t = this.makeServiceInstance(), n = {
                group: "servicecatalog.k8s.io",
                resource: "instances"
            }, r = {
                namespace: this.ctrl.selectedProject.metadata.name
            };
            this.DataService.create(n, null, t, r).then(function(t) {
                e.ctrl.orderInProgress = !0, e.watchResults(n, t, r), e.ctrl.serviceInstanceName = i.get(t, "metadata.name"), 
                "none" !== e.ctrl.bindType && e.bindService();
            }, function(t) {
                e.ctrl.error = t;
            });
        }, e.prototype.bindService = function() {
            var e = this;
            this.ctrl.bindInProgress = !0, this.ctrl.bindError = !1;
            var t = {
                namespace: i.get(this.ctrl.selectedProject, "metadata.name")
            }, n = "application" === this.ctrl.bindType ? this.ctrl.appToBind : void 0;
            this.BindingService.bindService(t, this.ctrl.serviceInstanceName, n).then(function(n) {
                e.ctrl.binding = n, e.ctrl.bindInProgress = !1, e.ctrl.bindComplete = !0, e.ctrl.bindError = null, 
                e.DataService.watchObject(e.BindingService.bindingResource, i.get(e.ctrl.binding, "metadata.name"), t, function(t) {
                    e.ctrl.binding = t;
                });
            }, function(t) {
                e.ctrl.bindInProgress = !1, e.ctrl.bindComplete = !0, e.ctrl.bindError = t;
            });
        }, e.prototype.$onDestroy = function() {
            this.DataService.unwatchAll(this.watches), this.selectedProjectWatch(), this.clearValidityWatcher();
        }, e.prototype.closePanel = function() {
            r.isFunction(this.ctrl.handleClose) && this.ctrl.handleClose();
        }, e.prototype.updateBindability = function() {
            if (!this.ctrl.wizardDone) {
                var e = i.get(this.ctrl.selectedPlan, "bindable");
                this.bindStep.hidden = !0 !== e && (!1 === e || !i.get(this.ctrl.serviceClass, "resource.bindable")), 
                this.ctrl.configPageShown && (this.reviewStep.allowed = this.bindStep.hidden, this.bindStep.hidden ? this.ctrl.nextTitle = "Create" : this.ctrl.nextTitle = "Next >");
            }
        }, e.prototype.sortApplications = function() {
            if (this.deploymentConfigs && this.deployments && this.replicationControllers && this.replicaSets && this.statefulSets) {
                var e = this.deploymentConfigs.concat(this.deployments).concat(this.replicationControllers).concat(this.replicaSets).concat(this.statefulSets);
                this.ctrl.applications = i.sortByAll(e, [ "metadata.name", "kind" ]), this.ctrl.updating = !1, 
                this.updateBindability();
            }
        }, e.prototype.makeServiceInstance = function() {
            var e = i.get(this, "ctrl.serviceClass.resource.metadata.name"), t = i.omit(this.ctrl.parameterData, function(e) {
                return "" === e;
            });
            return {
                kind: "Instance",
                apiVersion: "servicecatalog.k8s.io/v1alpha1",
                metadata: {
                    namespace: this.ctrl.selectedProject.metadata.name,
                    generateName: e + "-"
                },
                spec: {
                    serviceClassName: e,
                    planName: this.ctrl.selectedPlan.name,
                    parameters: t
                }
            };
        }, e.prototype.isNewProject = function() {
            return !this.ctrl.selectedProject || !i.has(this.ctrl.selectedProject, "metadata.uid");
        }, e;
    }();
    a.$inject = [ "$scope", "$filter", "ProjectsService", "DataService", "BindingService", "Logger", "Constants" ], 
    t.OrderServiceController = a;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), i = n(2), a = function() {
        function e() {
            var e = this;
            this.ctrl = this, this.closePanel = function() {
                r.isFunction(e.ctrl.handleClose) && e.ctrl.handleClose();
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
    t.OverlayPanelController = a;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), i = n(2), a = n(0), s = function() {
        function e(e, t, n, i, s, o, c, l, d, p, m, h) {
            var g = this;
            this.ctrl = this, this.showNewProjectPanel = !1, this.showEditProjectPanel = !1, 
            this.alerts = [], this.projects = [], this.watches = [], this.maxDisplayProjects = 5, 
            this.init = function() {
                g.watches.push(g.DataService.watch("projects", g.$scope, g.onProjectsUpdate)), g.AlertMessageService.getAlerts().forEach(function(e) {
                    this.ctrl.alerts[e.name] = e.data;
                }), g.ctrl.resourceLinks = a.clone(g.Constants.CATALOG_HELP_RESOURCES.links), a.forEach(g.ctrl.resourceLinks, function(e) {
                    r.isDefined(e.help) && (e.href = g.Constants.HELP_BASE_URL + (e.help ? g.Constants.HELP[e.help] : ""));
                }), g.$rootScope.$on("recently-viewed-updated", function() {
                    g.ctrl.recentlyViewedItems = g.getRecentlyViewedItems();
                });
            }, this.onProjectsUpdate = function(e) {
                var t = a.toArray(e.by("metadata.creationTimestamp")), n = g.$filter("orderObjectsByDate");
                g.ctrl.projects = n(t, !0), g.ctrl.totalProjects = g.ctrl.projects.length, g.ctrl.projects = a.take(g.ctrl.projects, g.maxDisplayProjects), 
                g.ctrl.loading = !1, g.ctrl.showGetStarted = !g.ctrl.projects || g.ctrl.projects.length < 2;
            }, this.closeNewProjectPanel = function() {
                g.ctrl.showNewProjectPanel = !1, g.hideModalBackdrop();
            }, this.onNewProject = function(e) {
                g.ctrl.showNewProjectPanel = !1, g.hideModalBackdrop();
            }, this.onViewMemebership = function(e) {
                var t = g.ctrl.viewEditMembership();
                t && t(e);
            }, this.editProject = function(e) {
                g.ctrl.edittingProject = e, g.ctrl.showEditProjectPanel = !0, g.showModalBackdrop();
            }, this.closeEditProjectPanel = function() {
                g.ctrl.showEditProjectPanel = !1, g.hideModalBackdrop();
            }, this.onEditProject = function(e) {
                g.ctrl.showEditProjectPanel = !1, g.hideModalBackdrop();
            }, this.$element = e, this.$filter = t, this.$rootScope = n, this.$scope = i, this.AlertMessageService = s, 
            this.AuthService = o, this.Catalog = c, this.Constants = l, this.DataService = d, 
            this.Logger = p, this.ProjectsService = m, this.RecentlyViewed = h;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.loading = !0, this.AuthService.withUser().then(function(t) {
                e.ctrl.user = t;
            }), this.ProjectsService.canCreate().then(function() {
                e.ctrl.canCreate = !0;
            }, function(t) {
                e.ctrl.canCreate = !1, e.ctrl.loading = !1;
                var n = t.data || {};
                if (403 !== t.status) {
                    var r = "Failed to determine create project permission";
                    return 0 !== t.status && (r += " (" + t.status + ")"), void e.Logger.warn(r);
                }
                if (n.details) {
                    var i = [];
                    a.forEach(n.details.causes || [], function(e) {
                        e.message && i.push(e.message);
                    }), i.length > 0 && (e.ctrl.newProjectMessage = i.join("\n"));
                }
            }).finally(function() {
                e.init();
            });
        }, e.prototype.$onChanges = function(e) {
            e.catalogItems && this.ctrl.catalogItems && (this.allItems = a.indexBy(this.ctrl.catalogItems, "resource.metadata.uid"), 
            this.ctrl.recentlyViewedItems = this.getRecentlyViewedItems());
        }, e.prototype.openNewProjectPanel = function() {
            this.ctrl.showNewProjectPanel = !0, this.showModalBackdrop();
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
        }, e.prototype.showModalBackdrop = function() {
            this.$element.append('<div class="catalog-projects-summary-modal-backrop modal-backdrop fade in"></div>');
        }, e.prototype.hideModalBackdrop = function() {
            i(".catalog-projects-summary-modal-backrop").remove();
        }, e.prototype.getRecentlyViewedItems = function() {
            var e = this;
            if (this.allItems) {
                var t = this.RecentlyViewed.getItems(), n = a.map(t, function(t) {
                    return e.allItems[t];
                });
                return n = a.reject(n, function(e) {
                    return !e;
                });
            }
        }, e;
    }();
    s.$inject = [ "$element", "$filter", "$rootScope", "$scope", "AlertMessageService", "AuthService", "Catalog", "Constants", "DataService", "Logger", "ProjectsService", "RecentlyViewedServiceItems" ], 
    t.ProjectsSummaryController = s;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), i = n(0), a = function() {
        function e(e, t, n) {
            var r = this;
            this.ctrl = this, this.onWindowResize = function() {
                r.$scope.$evalAsync(function() {
                    r.updateListExpandVisibility();
                });
            }, this.$scope = e, this.$window = t, this.$element = n, this.ctrl.sassListExpanded = !1, 
            this.ctrl.itemsOverflow = !1;
        }
        return e.prototype.$postLink = function() {
            this.debounceResize = i.debounce(this.onWindowResize, 50, {
                maxWait: 250
            }), r.element(this.$window).on("resize", this.debounceResize), this.updateListExpandVisibility();
        }, e.prototype.$onDestroy = function() {
            r.element(this.$window).off("resize", this.debounceResize);
        }, e.prototype.hasSaasOfferings = function() {
            return !i.isEmpty(this.ctrl.saasOfferings);
        }, e.prototype.$onChanges = function(e) {
            e.saasOfferings && !e.saasOfferings.isFirstChange() && (this.ctrl.saasOfferings = e.saasOfferings.currentValue, 
            this.updateListExpandVisibility());
        }, e.prototype.toggleListExpand = function() {
            this.ctrl.sassListExpanded = !this.ctrl.sassListExpanded;
        }, e.prototype.updateListExpandVisibility = function() {
            var e = this.$window.innerWidth, t = i.size(this.ctrl.saasOfferings);
            this.ctrl.itemsOverflow = e >= this.$window.patternfly.pfBreakpoints.tablet && (t > 4 || e < this.$window.patternfly.pfBreakpoints.desktop && t > 2);
        }, e;
    }();
    a.$inject = [ "$scope", "$window", "$element" ], t.SaasListController = a;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(0), i = function() {
        function e(e, t, n, r, i, a) {
            this.ctrl = this, this.$scope = e, this.$filter = t, this.DataService = n, this.AuthService = a, 
            this.ProjectsService = r, this.Logger = i;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.nameTaken = !1, this.ProjectsService.canCreate().then(function() {
                e.ctrl.canCreate = !0;
            }, function(t) {
                if (e.ctrl.canCreate = !1, 403 !== t.status) {
                    var n = "Failed to determine create project permission";
                    0 !== t.status && (n += " (" + t.status + ")"), e.Logger.warn(n);
                }
            }).finally(function() {
                e.listProjects();
            });
        }, e.prototype.$onChanges = function(e) {
            e.nameTaken && !e.nameTaken.isFirstChange() && this.ctrl.forms.createProjectForm.name.$setValidity("nameTaken", !this.ctrl.nameTaken);
        }, e.prototype.onNewProjectNameChange = function() {
            this.ctrl.nameTaken = !1, this.ctrl.forms.createProjectForm.name.$setValidity("nameTaken", !this.ctrl.nameTaken);
        }, e.prototype.isNewProject = function() {
            return this.ctrl.projects && this.ctrl.selectedProject && !r.has(this.ctrl.selectedProject, "metadata.uid");
        }, e.prototype.listProjects = function() {
            var e = this;
            this.DataService.list("projects", this.$scope).then(function(t) {
                var n = {
                    metadata: {
                        annotations: {
                            "openshift.io/display-name": "Create Project",
                            "new-display-name": ""
                        }
                    }
                };
                e.ctrl.projects = r.sortBy(t.by("metadata.name"), e.$filter("displayName")), e.ctrl.existingProjectNames = r.map(e.ctrl.projects, "metadata.name"), 
                !e.ctrl.selectedProject && r.size(e.ctrl.projects) > 0 && (e.ctrl.selectedProject = e.$filter("mostRecent")(e.ctrl.projects)), 
                e.ctrl.canCreate && (e.ctrl.projects.unshift(n), 1 === r.size(e.ctrl.projects) && (e.ctrl.selectedProject = n));
            });
        }, e;
    }();
    i.$inject = [ "$scope", "$filter", "DataService", "ProjectsService", "Logger", "AuthService" ], 
    t.SelectProjectController = i;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), i = n(0), a = n(2), s = function() {
        function e(e, t, n, r, a, s) {
            var o = this;
            this.ctrl = this, this.filterByCategory = function(e, t, n) {
                var r, a;
                r = i.find(o.ctrl.categories, {
                    id: e
                }), r ? (a = i.find(r.subCategories, {
                    id: t
                }), a ? o.ctrl.filteredItems = a.items : o.logger.error("Could not find subcategory '" + t + "' for category '" + e + "'")) : o.logger.error("Could not find category '" + e + "'"), 
                n && (o.ctrl.subCategories = o.getSubCategories(e)), o.ctrl.currentFilter = e, o.ctrl.currentSubFilter = 1 === o.ctrl.subCategories.length ? o.ctrl.subCategories[0].id : t || "all", 
                o.updateActiveCardStyles();
            }, this.handleClick = function(e, t) {
                o.$scope.$emit("open-overlay-panel", e);
            }, this.constants = e, this.catalog = t, this.logger = n, this.$filter = r, this.$scope = a, 
            this.$timeout = s, this.ctrl.loaded = !1, this.ctrl.isEmpty = !1;
        }
        return e.prototype.$onInit = function() {
            this.debounceResize = i.debounce(this.resizeExpansion, 50, {
                maxWait: 250
            }), r.element(window).bind("resize", this.debounceResize), a(window).on("resize.services", this.debounceResize);
        }, e.prototype.$onChanges = function(e) {
            e.catalogItems && this.ctrl.catalogItems && (this.ctrl.categories = this.catalog.categories, 
            this.filterByCategory("all", "all", !0), this.ctrl.isEmpty = i.isEmpty(this.ctrl.catalogItems), 
            this.ctrl.loaded = !0);
        }, e.prototype.$onDestroy = function() {
            a(window).off("resize.services");
        }, e.prototype.selectSubCategory = function(e) {
            this.filterByCategory(this.ctrl.currentFilter, e, !1);
        }, e.prototype.getSubCategories = function(e) {
            var t = [];
            return this.ctrl.categories.map(function(n) {
                e === n.id && (t = t.concat(n.subCategories));
            }), t = i.filter(t, {
                hasItems: !0
            }), "all" === t[0].id && 2 === t.length && (t = i.drop(t, 1)), t;
        }, e.prototype.resizeExpansion = function() {
            a(".services-sub-category").removeAttr("style");
            var e = a(".services-sub-category.active"), t = e.find(".services-items").innerHeight();
            e.css("margin-bottom", t + "px");
        }, e.prototype.updateActiveCardStyles = function() {
            this.$timeout(this.resizeExpansion, 50);
        }, e;
    }();
    s.$inject = [ "Constants", "Catalog", "Logger", "$filter", "$scope", "$timeout" ], 
    t.ServicesViewController = s;
}, function(e, t) {
    e.exports = URI;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1);
    n(3), n(27);
    var i = n(28), a = n(29), s = n(17), o = n(18), c = n(30), l = n(19), d = n(20), p = n(21), m = n(22), h = n(23), g = n(24), u = n(25), f = n(26), v = n(31);
    t.webCatalog = "webCatalog", r.module(t.webCatalog, [ "patternfly", "ngAnimate", "ui.bootstrap", "angularMoment", "ui.select", "schemaForm" ]).service("BuilderAppService", a.BuilderAppService).service("Catalog", c.CatalogService).service("RecentlyViewedServiceItems", v.RecentlyViewedServiceItems).filter("projectUrl", i.projectUrlFilter).component("catalogParameters", s.catalogParameters).component("catalogSearch", o.catalogSearch).component("createFromBuilder", l.createFromBuilder).component("landingPage", d.landingPage).component("orderService", p.orderService).component("overlayPanel", m.overlayPanel).component("projectsSummary", h.projectsSummary).component("saasList", g.saasList).component("selectProject", u.selectProject).component("servicesView", f.servicesView).run([ "$templateCache", function(e) {
        e.put("catalog-search/catalog-search-result.html", n(4)), e.put("create-from-builder/create-from-builder-configure.html", n(6)), 
        e.put("create-from-builder/create-from-builder-bind.html", n(5)), e.put("create-from-builder/create-from-builder-results.html", n(7)), 
        e.put("order-service/order-service-plans.html", n(10)), e.put("order-service/order-service-configure.html", n(9)), 
        e.put("order-service/order-service-bind.html", n(8)), e.put("order-service/order-service-review.html", n(11)), 
        e.put("decorators/bootstrap/array.html", n(12)), e.put("decorators/bootstrap/checkbox.html", n(13)), 
        e.put("decorators/bootstrap/checkboxes.html", n(14)), e.put("decorators/bootstrap/default.html", n(15)), 
        e.put("decorators/bootstrap/select.html", n(16));
    } ]);
} ], [ 53 ]);