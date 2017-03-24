webpackJsonp([ 0, 1 ], [ function(e, t) {
    e.exports = _;
}, function(e, t) {
    e.exports = angular;
}, function(e, t) {}, function(e, t) {
    e.exports = '<div ng-if="$ctrl.versions" uib-dropdown class="input-group-btn version-dropdown">\n  <button uib-dropdown-toggle type="button" class="btn btn-default" uib-tooltip="Select Version" tooltip-placement="top">\n    {{$ctrl.selectedVersion}}\n    <span class="caret"></span>\n  </button>\n  <ul uib-dropdown-menu>\n    <li ng-repeat="version in $ctrl.versions">\n      <a role="menuitem" tabindex="-1" ng-click="$ctrl.selectedVersion = version">\n        {{version}}\n      </a>\n    </li>\n  </ul>\n</div>\n<div ng-bind-html="$ctrl.description | linky : \'_blank\'"></div>\n<!-- TODO: truncate long text -->\n<p class="description">\n  <div ng-bind-html="$ctrl.longDescription | linky : \'_blank\'"></div>\n  <!-- TODO: add documentation link -->\n  <!-- <a href="">Learn More...</a> -->\n</p>\n';
}, function(e, t) {
    e.exports = $;
}, function(e, t) {
    e.exports = '<a href="" class="catalog-search-match">\n  <span class="catalog-search-icon">\n    <span ng-if="match.model.imageUrl"><img ng-src="{{match.model.imageUrl}}"></span>\n    <span ng-if="!match.model.imageUrl && match.model.iconClass" ng-class="match.model.iconClass" class="icon"></span>\n  </span>\n  <div class="catalog-search-match-info">\n    <div class="catalog-search-match-label">\n      {{match.label}}\n    </div>\n    <div class="catalog-search-match-description">\n      <span ng-repeat="tag in (match.model.tags || match.model.resource.osbTags)" class="tag small text-muted">\n        {{tag}}\n      </span>\n    </div>\n  </div>\n</a>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <form class="form-horizontal config-form">\n    <div class="form-group">\n      <label class="col-sm-4 control-label" for="project">Add to Project</label>\n      <div class="col-sm-8">\n        <!-- TODO: handle duplicate display names -->\n        <!-- TODO: let users create projects -->\n        <select\n            id="project"\n            ng-model="$ctrl.selectedProject"\n            ng-options="project as (project | displayName) for project in $ctrl.projects track by (project | uid)"\n            class="form-control">\n        </select>\n      </div>\n    </div>\n\n    <!-- TODO: add parameters -->\n    <!-- <div class="form-group"> -->\n    <!--   <label class="col-sm-4 control-label" for="field1">Field 1</label> -->\n    <!--   <div class="col-sm-8"> -->\n    <!--     <input class="form-control" type="text" id="field1"> -->\n    <!--   </div> -->\n    <!-- </div> -->\n  </form>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <div class="select-plans">\n    <h3>Select a Plan</h3>\n    <div ng-repeat="plan in $ctrl.serviceClass.resource.plans" class="radio">\n      <label>\n        <input\n          type="radio"\n          ng-model="$ctrl.planIndex"\n          ng-change="$ctrl.selectPlan(plan)"\n          value="{{$index}}">\n        <span class="plan-name">{{plan.osbMetadata.displayName || plan.name}}</span>\n        <!-- TODO: truncate long text -->\n        <div ng-if="plan.description">{{plan.description}}</div>\n        <!-- TODO: show plan bullets -->\n        <div ng-if="plan.osbFree">Free</div>\n        <div ng-if="!plan.osbFree">Paid</div>\n      </label>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="col-md-12 center">\n  <div ng-if="!$ctrl.error">\n    <div class="title">\n      Your Order is Complete <span class="fa fa-check success-check"></span>\n    </div>\n    <div class="sub-title center">\n      Continue to your project to bind the service to your application.\n    </div>\n    <div class="launch-service">\n      <!-- FIXME: Only works in the console -->\n      <!-- TODO: Provide direct link to bind action? -->\n      <a ng-href="project/{{$ctrl.selectedProject.metadata.name}}/overview" class="btn btn-primary order-btn">\n        View Project\n      </a>\n    </div>\n  </div>\n  <div ng-if="$ctrl.error">\n    <div class="title">Order Failed <span class="fa fa-times text-danger"></span></div>\n    <div class="sub-title center">\n      <span ng-if="$ctrl.error.data.message">\n        {{$ctrl.error.data.message | upperFirst}}\n      </span>\n      <span ng-if="!$ctrl.error.data.message">\n        An error occurred ordering the service.\n      </span>\n    </div>\n  </div>\n  <div>\n    <a class="close-href" href="" ng-click="$ctrl.closePanel()">Close</a> this panel to browse other services.\n  </div>\n  <!-- <div class="related-services-container"> -->\n  <!--   <span class="related-services-label">Related Services</span> -->\n  <!--   <span class="related-services-row"> -->\n  <!--     <div class="card"> -->\n  <!--       <div class="card-icon font-icon icon-jenkins"></div> -->\n  <!--       <div class="card-name">Jenkins</div> -->\n  <!--     </div> -->\n  <!--     <div class="card"> -->\n  <!--       <div class="card-icon font-icon icon-mysql-database"></div> -->\n  <!--       <div class="card-name">mySQL</div> -->\n  <!--     </div> -->\n  <!--   </span> -->\n  <!-- </div> -->\n</div>\n';
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(26);
    t.catalogSearch = {
        bindings: {
            imageStreams: "<",
            serviceClasses: "<"
        },
        controller: s.CatalogSearchController,
        template: n(19)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(27);
    t.landingPage = {
        bindings: {
            imageStreams: "<",
            serviceClasses: "<"
        },
        controller: s.LandingPageController,
        template: n(20),
        transclude: {
            landingheader: "landingheader",
            landingbody: "landingbody",
            landingside: "landingside"
        }
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(28);
    t.orderService = {
        bindings: {
            serviceClass: "<",
            handleClose: "<"
        },
        controller: s.OrderServiceController,
        template: n(21)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(29);
    t.overlayPanel = {
        bindings: {
            showClose: "<",
            showPanel: "<",
            handleClose: "<",
            fullHeight: "<"
        },
        controller: s.OverlayPanelController,
        template: n(22),
        transclude: !0
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(30);
    t.projectsSummary = {
        bindings: {
            baseProjectUrl: "@",
            projectsUrl: "@",
            viewEditMembership: "&",
            startGettingStartedTour: "&"
        },
        controller: s.ProjectsSummaryController,
        template: n(23)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(31);
    t.saasList = {
        bindings: {
            saasTitle: "<?",
            saasOfferings: "<"
        },
        controller: s.SaasListController,
        template: n(24)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(32);
    t.servicesView = {
        bindings: {
            serviceClasses: "<",
            imageStreams: "<"
        },
        controller: s.ServicesViewController,
        template: n(25)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(0);
    s.set(window, "OPENSHIFT_CONSTANTS.HELP_BASE_URL", "https://docs.openshift.org/latest/");
    var i = {
        new_app: "dev_guide/application_lifecycle/new_app.html",
        application_health: "dev_guide/application_health.html",
        authorization: "architecture/additional_concepts/authorization.html",
        deployments: "dev_guide/deployments/how_deployments_work.html",
        default: "welcome/index.html"
    };
    s.set(window, "OPENSHIFT_CONSTANTS.HELP", i);
    var r = [ {
        id: 1,
        title: "Microservices Application",
        icon: "fa fa-cubes",
        url: "https://www.redhat.com/en/technologies/virtualization",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
    }, {
        id: 2,
        title: "Mobile Application",
        icon: "fa fa-mobile",
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
        iconClassDefault: "fa fa-code",
        subCategories: [ {
            id: "java",
            label: "Java",
            icon: "font-icon icon-openjdk"
        }, {
            id: "javascript",
            categoryAliases: [ "nodejs", "js" ],
            label: "Javascript",
            icon: "font-icon icon-js"
        }, {
            id: "perl",
            label: "Perl",
            icon: "font-icon icon-perl"
        }, {
            id: "ruby",
            label: "Ruby",
            icon: "font-icon icon-ruby"
        }, {
            id: "php",
            label: "PHP",
            icon: "font-icon icon-php"
        }, {
            id: "python",
            label: "Python",
            icon: "font-icon icon-python"
        } ]
    }, {
        id: "databases",
        label: "Databases",
        subCategories: [ {
            id: "mongodb",
            label: "Mongo",
            icon: "font-icon icon-mongodb"
        }, {
            id: "mysql",
            label: "mySQL",
            icon: "font-icon icon-mysql-database"
        }, {
            id: "postgresql",
            label: "Postgres",
            icon: "font-icon icon-postgresql"
        }, {
            id: "mariadb",
            label: "MariaDB",
            icon: "font-icon icon-mariadb"
        } ]
    }, {
        id: "middleware",
        label: "Middleware",
        subCategories: [ {
            id: "jboss",
            label: "JBoss",
            icon: "font-icon icon-openjdk"
        }, {
            id: "fuse",
            label: "Fuse",
            icon: "font-icon icon-openjdk"
        }, {
            id: "amq",
            label: "A-MQ",
            icon: "font-icon icon-openjdk"
        }, {
            id: "bpm",
            label: "BPM",
            icon: "font-icon icon-openjdk"
        } ]
    }, {
        id: "cicd",
        label: "CI/CD",
        subCategories: [ {
            id: "jenkins",
            label: "Jenkins",
            icon: "font-icon icon-jenkins"
        }, {
            id: "pipelines",
            label: "Pipelines",
            icon: "fa fa-clone"
        } ]
    }, {
        id: "other",
        label: "Other",
        subCategories: [ {
            id: "other",
            label: "Other"
        } ]
    } ];
    t.allCategories = a, t.allSaasOfferings = r, s.set(window, "OPENSHIFT_CONSTANTS.SERVICE_CATALOG_CATEGORIES", a), 
    s.set(window, "OPENSHIFT_CONSTANTS.SAAS_OFFERINGS", r);
    var c = {
        description: "Lorem ipsum dolor sit amet, consectular adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
        links: [ {
            title: "Welcome",
            help: "default"
        }, {
            title: "Building a new Application",
            help: "new_app"
        }, {
            title: "Authorization",
            help: "authorization"
        }, {
            title: "Deployments",
            help: "deployments"
        }, {
            title: "Application Health",
            help: "application_health"
        }, {
            title: "Visit us on Facebook",
            href: "http://facebook.com/RedHatInc"
        } ]
    };
    s.set(window, "OPENSHIFT_CONSTANTS.CATALOG_HELP_RESOURCES", c);
}, function(e, t, n) {
    "use strict";
    function s() {
        return function(e, t) {
            var n = t || "", s = e && e.metadata ? e.metadata.name : "";
            return n.endsWith("/") || (n += "/"), n + s;
        };
    }
    t.__esModule = !0, t.projectUrlFilter = s;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(1), i = n(0), r = function() {
        function e(e, t) {
            this.constants = e, this.$filter = t, this.categories = this.constants.SERVICE_CATALOG_CATEGORIES;
        }
        return e.prototype.getServiceItem = function(e) {
            return new a(e, this);
        }, e.prototype.getImageItem = function(e) {
            var t = new c(e, this);
            return t.builderSpecTagName ? t : null;
        }, e.prototype.getCategoriesBySubCategories = function(e) {
            var t = this, n = {}, s = "other";
            return i.each(e, function(e) {
                i.each(t.categories, function(t) {
                    var s = i.find(t.subCategories, function(t) {
                        return t.id === e || i.includes(t.categoryAliases, e);
                    });
                    if (s) return n[s.id] = t.id, !1;
                });
            }), i.isEmpty(n) && (n[s] = s), n;
        }, e.prototype.hasCategory = function(e, t) {
            return i.includes(e.catsBySubCats, t);
        }, e.prototype.hasSubCategory = function(e, t) {
            return i.has(e, [ "catsBySubCats", t ]);
        }, e.prototype.removeEmptyCategories = function(e) {
            var t = this, n = s.copy(this.categories), r = [];
            return i.each(n, function(n) {
                var a = i.filter(n.subCategories, function(n) {
                    return i.some(e, function(e) {
                        return t.hasSubCategory(e, n.id);
                    });
                });
                if (!i.isEmpty(a)) {
                    var c = s.copy(n);
                    c.subCategories = a, r.push(c);
                }
            }), r;
        }, e;
    }();
    r.$inject = [ "Constants", "$filter" ], t.CatalogService = r;
    var a = function() {
        function e(e, t) {
            this.resource = e, this.catalogSrv = t, this.imageUrl = this.getImage(), this.iconClass = this.getIcon(), 
            this.name = this.getName(), this.description = this.getDescription(), this.longDescription = this.getLongDescription(), 
            this.catsBySubCats = this.getCategoriesBySubCategories();
        }
        return e.prototype.getImage = function() {
            return i.get(this.resource, "osbMetadata.imageUrl", "");
        }, e.prototype.getIcon = function() {
            return i.get(this.resource, [ "osbMetadata", "console.openshift.io/iconClass" ], "fa fa-cubes");
        }, e.prototype.getName = function() {
            return i.get(this.resource, "osbMetadata.displayName", this.resource.metadata.name);
        }, e.prototype.getDescription = function() {
            return i.get(this.resource, "osbMetadata.description", "");
        }, e.prototype.getLongDescription = function() {
            return i.get(this.resource, "osbMetadata.longDescription", "");
        }, e.prototype.getCategoriesBySubCategories = function() {
            return this.catalogSrv.getCategoriesBySubCategories(this.resource.osbTags);
        }, e;
    }();
    t.ServiceItem = a;
    var c = function() {
        function e(e, t) {
            this.resource = e, this.catalogSrv = t, this.builderSpecTagName = this.getBuilderSpecTagName(), 
            this.builderSpecTagName && (this.tags = this.getTags(), this.iconClass = this.getIcon(), 
            this.name = this.getName(), this.description = this.getDescription(), this.longDescription = this.getLongDescription(), 
            this.catsBySubCats = this.getCategoriesBySubCategories());
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
            return e = e.indexOf("icon-") !== -1 ? "font-icon " + e : e;
        }, e.prototype.getName = function() {
            var e = this.catalogSrv.$filter("displayName")(this.resource);
            return e || (e = this.resource.metadata.name), e;
        }, e.prototype.getDescription = function() {
            return null;
        }, e.prototype.getLongDescription = function() {
            return null;
        }, e.prototype.getCategoriesBySubCategories = function() {
            return this.catalogSrv.getCategoriesBySubCategories(this.tags);
        }, e;
    }();
    t.ImageItem = c;
}, function(e, t) {
    e.exports = '<!-- TODO: Should not have two ordering panels, combine with services view -->\n<overlay-panel show-panel="$ctrl.orderingPanelVisible" show-close="true" handle-close="$ctrl.closeOrderingPanel">\n  <order-service service-class="$ctrl.serviceToOrder" handle-close="$ctrl.closeOrderingPanel"></order-service>\n</overlay-panel>\n<div class="landing-search-area">\n  <form role="form" class="landing-search-form search-pf has-button">\n    <div class="form-group has-clear">\n      <div class="search-pf-input-group">\n        <label for="search-input" class="sr-only">Search Catalog</label>\n        <input\n            id="search-input"\n            type="search"\n            class="form-control"\n            placeholder="Search Catalog"\n            ng-model="$ctrl.searchText"\n            uib-typeahead="item.name for item in $ctrl.search($viewValue)"\n            typeahead-on-select="$ctrl.itemSelected($item)"\n            typeahead-template-url="catalog-search/catalog-search-result.html">\n        <button\n            type="button"\n            ng-if="$ctrl.searchText"\n            ng-click="$ctrl.searchText = \'\'"\n            class="clear">\n          <span class="sr-only">Clear Search Input</span>\n          <span class="pficon pficon-close" aria-hidden="true"></span>\n        </button>\n      </div>\n    </div>\n  </form>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="landing">\n  <div class="landing-main-area">\n    <catalog-search service-classes="$ctrl.serviceClasses" image-streams="$ctrl.imageStreams"></catalog-search>\n    <div class="landing-header-area" ng-transclude="landingheader"></div>\n    <div class="landing-body-area">\n      <div ng-transclude="landingbody"></div>\n    </div>\n  </div>\n  <div class="landing-side-bar" ng-transclude="landingside"></div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="order-service wizard-pf-body">\n  <div class="wizard-pf-steps">\n    <ul class="wizard-pf-steps-indicator" ng-if="$ctrl.wizardReady">\n      <li class="wizard-pf-step" ng-class="{\n        active: step.selected,\n        visited: step.visited && !step.selected\n      }" ng-repeat="step in $ctrl.getSteps()" data-tabgroup="{{$index}}">\n        <a ng-click="$ctrl.stepClick(step)"><span class="wizard-pf-step-number">{{$index + 1}}</span><span class="wizard-pf-step-title">{{step.label}}</span></a>\n      </li>\n    </ul>\n  </div>\n  <div class="container-fluid wizard-pf-main">\n    <div class="col-sm-6 order-service-details">\n      <div class="order-service-details-top">\n        <div class="pull-left">\n          <span ng-if="!$ctrl.imageUrl" class="icon {{$ctrl.iconClass}}"></span>\n          <!-- TODO: Need to size the image -->\n          <span ng-if="$ctrl.imageUrl"><img ng-src="{{$ctrl.imageUrl}}"></span>\n        </div>\n        <div class="service-title-area">\n          <div class="service-title">\n            <span class="name">{{$ctrl.serviceName}}</span>\n          </div>\n          <div ng-if="$ctrl.serviceClass.resource.osbTags" class="order-service-tags">\n            <span ng-repeat="tag in $ctrl.serviceClass.resource.osbTags" class="tag">\n              {{tag}}\n            </span>\n          </div>\n        </div>\n        <div class="order-service-description">\n          <div ng-if="$ctrl.currentStep.id !== \'plans\' && $ctrl.selectedPlan" class="h3">\n            Plan {{$ctrl.selectedPlan.osbMetadata.displayName || $ctrl.selectedPlan.name}}\n          </div>\n          <div ng-include="\'order-service/order-service-details.html\'"></div>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-6 order-service-config">\n      <div ng-include="$ctrl.currentStep.view" class="wizard-pf-contents"></div>\n    </div>\n  </div>\n  <div class="config-bottom modal-footer wizard-pf-footer">\n    <!--\n      Only use the `btn-cancel wizard-pf-cancel` classes when there\'s a Back\n      button, otherwise there\'s an odd gap between Cancel and Next when there\n      are only two buttons in the wizard.\n    -->\n    <button\n        type="button"\n        class="btn btn-default wizard-pf-dismiss"\n        ng-class="{ \'btn-cancel wizard-pf-cancel\': $ctrl.plans.length > 1 }"\n        ng-disabled="$ctrl.currentStep.id === \'results\'"\n        ng-click="$ctrl.closePanel()">\n      Cancel\n    </button>\n    <!-- Hide the button when only one plan. It will never be enabled. -->\n    <button\n        type="button"\n        class="btn btn-default wizard-pf-back"\n        ng-if="$ctrl.plans.length > 1"\n        ng-disabled="$ctrl.currentStep.id !== \'configure\'"\n        ng-click="$ctrl.previousStep()">\n      <span class="fa fa-angle-left" aria-hidden="true"></span>\n      Back\n    </button>\n    <button\n        type="button"\n        class="btn btn-primary wizard-pf-next"\n        ng-if="$ctrl.currentStep.id !== \'configure\' && $ctrl.currentStep.id !== \'results\'"\n        ng-click="$ctrl.nextStep()">\n      Next\n      <span class="fa fa-angle-right" aria-hidden="true"></span>\n    </button>\n    <button\n        type="button"\n        class="btn btn-primary wizard-pf-next"\n        ng-if="$ctrl.currentStep.id === \'configure\'"\n        ng-disabled="!$ctrl.selectedProject || $ctrl.currentStep.id === \'results\'"\n        ng-click="$ctrl.provisionService()">\n      Create\n      <span class="fa fa-angle-right" aria-hidden="true"></span>\n    </button>\n    <button\n        type="button"\n        class="btn btn-primary wizard-pf-close wizard-pf-dismiss"\n        ng-if="$ctrl.currentStep.id === \'results\'"\n        ng-click="$ctrl.closePanel()">\n      Close\n    </button>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="catalogs-overlay-modal" role="dialog">\n  <div ng-if="$ctrl.shown" class="modal-backdrop fade in"></div>\n  <div ng-if="$ctrl.shown" class="catalogs-overlay-panel-wrapper">\n    <div class="catalogs-overlay-panel-grow-height">\n      <div class="catalogs-overlay-panel" ng-class="{\'catalogs-overlay-panel-full-height\' : $ctrl.fullHeight}">\n        <a ng-if="$ctrl.showClose" ng-click="$ctrl.closePanel()">\n          <span class="catalogs-overlay-panel-close pficon pficon-close"></span>\n        </a>\n        <div class="catalogs-overlay-panel-body" ng-transclude>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="catalog-projects-summary-panel">\n  <button ng-if="$ctrl.canCreate" class="create-button btn btn-primary" ng-click="$ctrl.openNewProjectPanel()">\n    <span class="fa fa-plus"></span>\n    <span class="create-button-text">Create Project</span>\n  </button>\n  <h2 class="primary" ng-if="!$ctrl.projects || !$ctrl.projects.length">Getting Started</h2>\n  <h2 class="primary" ng-if="$ctrl.projects && $ctrl.projects.length">My Projects</h2>\n  <div class="catalog-modal catalog-modal-create-project" ng-if="$ctrl.showNewProjectPanel">\n    <h4 class="catalog-modal-title">\n      Create Project\n    </h4>\n    <create-project alerts="$ctrl.alerts" is-dialog="true" redirect-action="$ctrl.onNewProject" on-cancel="$ctrl.closeNewProjectPanel"></create-project>\n    <a href="" class="catalog-modal-close" ng-click="$ctrl.closeNewProjectPanel()">\n      <span class="pficon pficon-close"></span>\n    </a>\n  </div>\n  <div ng-if="$ctrl.projects && $ctrl.projects.length" class="catalog-project-summary-list">\n    <div ng-if="$ctrl.totalProjects > $ctrl.maxDisplayProjects" class="projects-count">\n      <strong>{{$ctrl.maxDisplayProjects}}</strong>\n      of\n      <strong>{{$ctrl.totalProjects}}</strong>\n      Projects\n      <a href="{{$ctrl.projectsUrl}}" class="projects-view-all">View All</a>\n    </div>\n    <div id="catalog-projects-summary-list">\n      <div ng-repeat="project in $ctrl.projects track by (project | uid)" class="project-tile">\n        <div class="dropdown  dropdown-kebab-pf" uib-dropdown="">\n          <button class="btn btn-link uib-dropdown-toggle" type="button" id="dropdownKebab" aria-haspopup="true" aria-expanded="true" uib-dropdown-toggle>\n            <span class="fa fa-ellipsis-v"></span>\n          </button>\n          <ul class="uib-dropdown-menu dropdown-menu-right" aria-labelledby="dropdownKebab">\n            <li><a href="" ng-click="$ctrl.onViewMemebership(project)">View Membership</a></li>\n            <li><a href="" ng-click="$ctrl.editProject(project)">Edit Project</a></li>\n            <li>\n              <delete-link\n                  kind="Project"\n                  label="Delete Project"\n                  resource-name="{{project.metadata.name}}"\n                  project-name="{{project.metadata.name}}"\n                  display-name="{{(project | displayName)}}"\n                  type-name-to-confirm="true"\n                  stay-on-current-page="true"\n                  alerts="$ctrl.alerts">\n              </delete-link>\n            </li>\n          </ul>\n        </div>\n        <h3 class="project-tile-header">\n          <span ng-if="project.statusIconClass" class="project-status {{project.statusIconClass}}"></span>\n          <a href="{{project | projectUrl : $ctrl.baseProjectUrl}}" class="project-title">{{project | displayName}}</a>\n        </h3>\n        <p class="project-date">\n          <span ng-if="project | displayName : true"><span ng-bind-html="project.metadata.name"></span> &ndash;</span>\n          created\n          <span ng-if="project | annotation : \'openshift.io/requester\'">by <span ng-bind-html="project | annotation : \'openshift.io/requester\'"></span></span>\n          <span am-time-ago="project.metadata.creationTimestamp"></span>\n        </p>\n        <div class="project-description" ng-if="project | description">\n          <truncate-long-text content="project | description" use-word-boundary="true" limit="120"></truncate-long-text>\n        </div>\n        <div class="catalog-modal catalog-modal-edit-project" ng-if="$ctrl.showEditProjectPanel && $ctrl.edittingProject === project">\n          <h4 class="catalog-modal-title">\n            Edit Project\n          </h4>\n          <edit-project project="$ctrl.edittingProject" is-dialog="true" alerts="$ctrl.alerts" redirect-action="$ctrl.onEditProject" on-cancel="$ctrl.closeEditProjectPanel"></edit-project>\n          <a href="" class="catalog-modal-close" ng-click="$ctrl.closeEditProjectPanel()">\n            <span class="pficon pficon-close"></span>\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div ng-if="$ctrl.showGetStarted">\n    <div class="getting-started-panel">\n      <h2 class="secondary" ng-if="$ctrl.projects && $ctrl.projects.length > 0">Getting Started</h2>\n      <button class="getting-started-button btn btn-default" ng-class="{\'with-projects\': $ctrl.projects && $ctrl.projects.length}" ng-click="$ctrl.handleGettingStartedClick()">\n        <span class="fa fa-info-circle fa-2"></span>\n        <span class="getting-started-button-text">Start Guided Tour</span>\n      </button>\n    </div>\n    <div class="resources-panel">\n      <h2 class="secondary">Resources</h2>\n      <p>\n        {{$ctrl.resourceDescription}}\n      </p>\n      <ul>\n        <li ng-repeat="resource in $ctrl.resourceLinks">\n          <a href="{{resource.href}}" target="_blank" title="{{resource.href}}">{{resource.title}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<span ng-if="$ctrl.hasSaasOfferings()" class="saas-offerings-container">\n  <h1 ng-if="$ctrl.saasTitle">{{$ctrl.saasTitle}}</h1>\n  <div pf-card-view config="$ctrl.cardViewConfig" items="$ctrl.saasOfferings">\n    <div class="card-container">\n      <div class="card-header">\n        <span class="card-icon {{item.icon}}"></span>\n        <span class="card-title">{{item.title}}</span>\n      </div>\n      <div class="card-footer hidden-xs">\n        <truncate-long-text\n                class="card-description"\n                content="item.description"\n                limit="120"\n                use-word-boundary="true">\n        </truncate-long-text>\n      </div>\n    </div>\n  </div>\n</span>\n';
}, function(e, t) {
    e.exports = '\n<div class="services-view">\n\n  <overlay-panel show-panel="$ctrl.orderingPanelvisible" show-close="true" handle-close="$ctrl.closeOrderingPanel">\n    <order-service service-class="$ctrl.serviceToOrder" handle-close="$ctrl.closeOrderingPanel"></order-service>\n  </overlay-panel>\n\n  <div ng-if="$ctrl.loading" class="spinner-container">\n    <div ng-class="{\'spinner spinner-xl\': $ctrl.loading}"></div>\n  </div>\n  <div ng-if="!$ctrl.loading" class="services-view-container">\n    <h1>Catalog</h1>\n\n    <div class="services-categories">\n      <a id="category-all" ng-class="{\'current-filter\': $ctrl.currentFilter === \'all\'}" ng-click="$ctrl.filterByCategory(\'all\', \'all\', true)">All</a> |\n      <span ng-repeat="category in $ctrl.categories">\n        <a id="{{\'category-\'+category.id}}" ng-class="{\'current-filter\': $ctrl.currentFilter === category.id}"\n           ng-click="$ctrl.filterByCategory(category.id, \'all\', true)">{{category.label}}</a>\n           {{$ctrl.categories.length !== ($index+1) ? \' | \' : \'\'}}\n      </span>\n    </div>\n\n    <!-- Do not show sub-category tiles for \'All\' or \'Other\' main categories -->\n\n    <div class="services-sub-categories" ng-if="$ctrl.currentFilter !== \'other\' && $ctrl.currentFilter !== \'all\'">\n      <div ng-repeat="subCategory in $ctrl.subCategories"\n           id="{{\'sub-category-\'+subCategory.id}}"\n           class="sub-cat-card" ng-class="{\'active\': $ctrl.currentSubFilter === subCategory.id}">\n        <div class="inner-content" ng-click="$ctrl.toggleExpand(subCategory.id)">\n          <div class="sub-cat-icon {{subCategory.icon}}" ng-if="subCategory.icon"></div>\n          <div class="sub-cat-label">{{subCategory.label}}</div>\n        </div>\n        <div ng-if="$ctrl.currentSubFilter === subCategory.id"\n           class="card-expansion"\n           pf-card-view config="$ctrl.cardViewConfig" items="$ctrl.filteredItems">\n          <div class="card-container">\n            <div ng-if="!item.imageUrl" class="card-icon {{item.iconClass}}"></div>\n            <div ng-if="item.imageUrl" class="card-img"><img ng-src="{{item.imageUrl}}"></div>\n            <div class="card-name">{{item.name}}</div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Show catalog cards for \'All\' and \'Other\' main categories -->\n\n    <div ng-if="$ctrl.currentFilter === \'other\' || $ctrl.currentFilter === \'all\'"\n         class="card-expansion no-sub-cats"\n         pf-card-view config="$ctrl.cardViewConfig" items="$ctrl.filteredItems">\n      <div class="card-container">\n        <div ng-if="!item.imageUrl" class="card-icon {{item.iconClass}}"></div>\n        <div ng-if="item.imageUrl" class="card-img"><img ng-src="{{item.imageUrl}}"></div>\n        <div class="card-name">{{item.name}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n';
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(0), i = function() {
        function e(e, t, n) {
            var s = this;
            this.ctrl = this, this.loaded = !1, this.closeOrderingPanel = function() {
                s.ctrl.orderingPanelVisible = !1;
            }, this.$q = e, this.Catalog = t, this.KeywordService = n;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.searchText = "";
        }, e.prototype.$onChanges = function(e) {
            var t = this;
            if (e.serviceClasses || e.imageStreams) {
                if (!this.ctrl.serviceClasses && !this.ctrl.imageStreams) return;
                var n = s.map(this.ctrl.serviceClasses, function(e) {
                    return t.Catalog.getServiceItem(e);
                });
                if (n = n.concat(s.map(this.ctrl.imageStreams, function(e) {
                    return t.Catalog.getImageItem(e);
                })), n = s.reject(n, function(e) {
                    return !e;
                }), this.allItems = s.sortBy(n, "name"), this.loaded = !0, this.searchDeferred) {
                    var i = this.filterForKeywords(this.ctrl.searchText);
                    this.searchDeferred.resolve(i), this.searchDeferred = null;
                }
            }
        }, e.prototype.itemSelected = function(e) {
            this.ctrl.serviceToOrder = e, this.ctrl.orderingPanelVisible = !0, this.ctrl.searchText = "";
        }, e.prototype.search = function(e) {
            return e ? this.loaded ? this.filterForKeywords(e) : (this.searchDeferred = this.$q.defer(), 
            this.searchDeferred.promise) : [];
        }, e.prototype.filterForKeywords = function(e) {
            var t = this.KeywordService.generateKeywords(e), n = this.KeywordService.filterForKeywords(this.allItems, [ "name", "tags", "resource.osbMetadata.tags" ], t);
            return s.take(n, 5);
        }, e;
    }();
    i.$inject = [ "$q", "Catalog", "KeywordService" ], t.CatalogSearchController = i;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = function() {
        function e() {
            this.ctrl = this;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.searchText = "";
        }, e;
    }();
    t.LandingPageController = s;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(1), i = n(0), r = function() {
        function e(e, t, n, s) {
            this.ctrl = this, this.$scope = e, this.$filter = t, this.DataService = n, this.Logger = s;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.iconClass = this.ctrl.serviceClass.iconClass || "fa fa-cubes", this.ctrl.imageUrl = this.ctrl.serviceClass.imageUrl, 
            this.ctrl.serviceName = this.ctrl.serviceClass.name, this.ctrl.description = this.ctrl.serviceClass.description, 
            this.ctrl.longDescription = this.ctrl.serviceClass.longDescription, this.ctrl.plans = i.get(this, "ctrl.serviceClass.resource.plans", []), 
            this.ctrl.selectedPlan = i.first(this.ctrl.plans), this.ctrl.planIndex = 0, this.ctrl.steps = [ {
                id: "plans",
                label: "Plans",
                view: "order-service/order-service-plans.html"
            }, {
                label: "Configuration",
                id: "configure",
                view: "order-service/order-service-configure.html"
            }, {
                label: "Results",
                id: "results",
                view: "order-service/order-service-review.html"
            } ], this.ctrl.plans.length < 2 && this.ctrl.steps.shift(), this.gotoStep(this.ctrl.steps[0]), 
            this.listProjects(), this.ctrl.wizardReady = !0;
        }, e.prototype.getSteps = function() {
            return this.ctrl.steps;
        }, e.prototype.stepClick = function(e) {
            this.ctrl.orderComplete || e.visited && this.gotoStep(e);
        }, e.prototype.gotoStep = function(e) {
            this.ctrl.steps.forEach(function(e) {
                return e.selected = !1;
            }), this.ctrl.currentStep && (this.ctrl.currentStep.visited = !0), this.ctrl.currentStep = e, 
            this.ctrl.currentStep.selected = !0, this.currentStepIndex = i.findIndex(this.ctrl.steps, "selected");
        }, e.prototype.previousStep = function() {
            var e = this.ctrl.steps[this.currentStepIndex - 1];
            this.gotoStep(e);
        }, e.prototype.nextStep = function() {
            var e = this.ctrl.steps[this.currentStepIndex + 1];
            this.gotoStep(e);
        }, e.prototype.selectPlan = function(e) {
            this.ctrl.selectedPlan = e;
        }, e.prototype.provisionService = function() {
            var e = this, t = this.makeServiceInstance();
            this.DataService.create({
                group: "servicecatalog.k8s.io",
                resource: "instances"
            }, null, t, {
                namespace: this.ctrl.selectedProject.metadata.name
            }).then(function() {
                e.ctrl.orderComplete = !0, e.ctrl.error = null, e.gotoStepID("results");
            }, function(t) {
                e.ctrl.error = t;
            });
        }, e.prototype.$onChanges = function(e) {}, e.prototype.$doCheck = function() {}, 
        e.prototype.closePanel = function() {
            s.isFunction(this.ctrl.handleClose) && this.ctrl.handleClose();
        }, e.prototype.listProjects = function() {
            var e = this;
            this.DataService.list("projects", this.$scope).then(function(t) {
                e.ctrl.projects = i.sortBy(t.by("metadata.name"), e.$filter("displayName")), e.ctrl.selectedProject = i.first(e.ctrl.projects);
            });
        }, e.prototype.makeServiceInstance = function() {
            var e = i.get(this, "ctrl.serviceClass.resource.metadata.name");
            return {
                kind: "Instance",
                apiVersion: "servicecatalog.k8s.io/v1alpha1",
                metadata: {
                    namespace: this.ctrl.selectedProject.metadata.name,
                    generateName: e + "-"
                },
                spec: {
                    serviceClassName: e,
                    planName: this.ctrl.selectedPlan.name
                }
            };
        }, e.prototype.gotoStepID = function(e) {
            var t = i.find(this.ctrl.steps, {
                id: e
            });
            this.gotoStep(t);
        }, e;
    }();
    r.$inject = [ "$scope", "$filter", "DataService", "Logger" ], t.OrderServiceController = r;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(1), i = n(4), r = function() {
        function e(e, t) {
            var n = this;
            this.ctrl = this, this.closePanel = function() {
                s.isFunction(n.ctrl.handleClose) && n.ctrl.handleClose();
            }, this.showDialog = function() {
                n.ctrl.shown = !0, n.$timeout(function() {
                    n.ctrl.showOverlayPanel = !0, i("body").addClass("overlay-open");
                }, 500);
            }, this.hideDialog = function() {
                n.ctrl.shown = !1, n.$timeout(function() {
                    n.ctrl.showOverlayPanel = !1, i("body").removeClass("overlay-open");
                }, 500);
            }, this.$element = e, this.$timeout = t, this.ctrl.showOverlayPanel = !1, this.ctrl.shown = !1;
        }
        return e.prototype.$postLink = function() {
            this.ctrl.showPanel && this.showDialog();
        }, e.prototype.$onChanges = function(e) {
            e.showPanel && (this.ctrl.showPanel ? this.showDialog() : this.hideDialog());
        }, e.prototype.$onDestroy = function() {
            i("body").removeClass("overlay-open");
        }, e;
    }();
    r.$inject = [ "$element", "$timeout" ], t.OverlayPanelController = r;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(1), i = n(0), r = function() {
        function e(e, t, n, r, a, c, o, l, d) {
            var p = this;
            this.ctrl = this, this.showNewProjectPanel = !1, this.showEditwProjectPanel = !1, 
            this.alerts = [], this.projects = [], this.watches = [], this.maxDisplayProjects = 5, 
            this.onVerifyUser = function() {
                p.ctrl.loading = !0, p.watches.push(p.DataService.watch("projects", p.$scope, p.onProjectsUpdate)), 
                p.AlertMessageService.getAlerts().forEach(function(e) {
                    this.ctrl.alerts[e.name] = e.data;
                }), p.ctrl.resourceDescription = p.Constants.CATALOG_HELP_RESOURCES.description, 
                p.ctrl.resourceLinks = i.clone(p.Constants.CATALOG_HELP_RESOURCES.links), i.forEach(p.ctrl.resourceLinks, function(e) {
                    s.isDefined(e.help) && (e.href = p.Constants.HELP_BASE_URL + p.Constants.HELP[e.help]);
                });
            }, this.onProjectsUpdate = function(e) {
                var t = i.toArray(e.by("metadata.creationTimestamp")), n = p.$filter("orderObjectsByDate");
                p.ctrl.projects = n(t, !0), p.ctrl.totalProjects = p.ctrl.projects.length, p.ctrl.projects = i.take(p.ctrl.projects, p.maxDisplayProjects), 
                p.ctrl.loading = !1, p.ctrl.showGetStarted = !p.ctrl.projects || p.ctrl.projects.length < 2;
            }, this.closeNewProjectPanel = function() {
                p.ctrl.showNewProjectPanel = !1;
            }, this.onNewProject = function(e) {
                p.ctrl.showNewProjectPanel = !1;
            }, this.onViewMemebership = function(e) {
                var t = p.ctrl.viewEditMembership();
                t && t(e);
            }, this.editProject = function(e) {
                p.ctrl.edittingProject = e, p.ctrl.showEditProjectPanel = !0;
            }, this.closeEditProjectPanel = function() {
                p.ctrl.showEditProjectPanel = !1;
            }, this.onEditProject = function(e) {
                p.ctrl.showEditProjectPanel = !1;
            }, this.$element = e, this.$scope = t, this.$filter = n, this.ProjectsService = r, 
            this.Logger = a, this.AuthService = c, this.DataService = o, this.Constants = l, 
            this.AlertMessageService = d;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ProjectsService.canCreate().then(function() {
                e.ctrl.canCreate = !0;
            }, function(t) {
                e.ctrl.canCreate = !1;
                var n = t.data || {};
                if (403 !== t.status) {
                    var s = "Failed to determine create project permission";
                    return 0 !== t.status && (s += " (" + t.status + ")"), void e.Logger.warn(s);
                }
                if (n.details) {
                    var r = [];
                    i.forEach(n.details.causes || [], function(e) {
                        e.message && r.push(e.message);
                    }), r.length > 0 && (e.ctrl.newProjectMessage = r.join("\n"));
                }
            }), this.AuthService.withUser().then(this.onVerifyUser);
        }, e.prototype.openNewProjectPanel = function() {
            this.ctrl.showNewProjectPanel = !0;
        }, e.prototype.handleGettingStartedClick = function() {
            var e = this.ctrl.startGettingStartedTour();
            e && e();
        }, e.prototype.handleProjectClick = function(e) {
            var t = this.ctrl.projectSelect();
            t && t(e);
        }, e.prototype.showAllProjects = function() {
            var e = this.ctrl.showProjects();
            e && e();
        }, e;
    }();
    r.$inject = [ "$element", "$scope", "$filter", "ProjectsService", "Logger", "AuthService", "DataService", "Constants", "AlertMessageService" ], 
    t.ProjectsSummaryController = r;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(0), i = function() {
        function e() {
            this.ctrl = this, this.cardViewConfig = {
                selectItems: !1,
                showSelectBox: !1,
                onClick: this.handleClick
            };
        }
        return e.prototype.hasSaasOfferings = function() {
            return !s.isEmpty(this.ctrl.saasOfferings);
        }, e.prototype.handleClick = function(e, t) {
            window.open(e.url, "_blank");
        }, e.prototype.$onChanges = function(e) {
            e.saasOfferings && !e.saasOfferings.isFirstChange() && (this.ctrl.saasOfferings = e.saasOfferings.currentValue);
        }, e;
    }();
    t.SaasListController = i;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(1), i = n(0), r = n(4), a = function() {
        function e(e, t, n, s, r) {
            var a = this;
            this.ctrl = this, this.serviceClassesLoaded = !1, this.imageStreamsLoaded = !1, 
            this.handleClick = function(e, t) {
                a.ctrl.serviceToOrder = e, a.ctrl.openOrderingPanel();
            }, this.closeOrderingPanel = function() {
                a.ctrl.orderingPanelvisible = !1;
            }, this.normalizeData = function(e, t) {
                var n, s = [];
                return i.each(t, function(t) {
                    "service" === e ? n = a.catalog.getServiceItem(t) : "image" === e && (n = a.catalog.getImageItem(t)), 
                    n && s.push(n);
                }), s;
            }, this.cardViewConfig = {
                selectItems: !1,
                showSelectBox: !1,
                onClick: this.handleClick
            }, this.constants = e, this.catalog = t, this.$filter = n, this.$scope = s, this.$timeout = r, 
            this.ctrl.loading = !0;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.allItems = [], this.ctrl.currentFilter = "all", this.ctrl.currentSubFilter = null, 
            this.ctrl.orderingPanelvisible = !1, this.updateAll(), this.$scope.$on("cancelOrder", function() {
                e.ctrl.closeOrderingPanel();
            }), this.debounceResize = i.debounce(this.resizeExpansion, 50, {
                maxWait: 250
            }), s.element(window).bind("resize", this.debounceResize), r(window).on("resize.services", this.debounceResize);
        }, e.prototype.$onChanges = function(e) {
            e.serviceClasses && !e.serviceClasses.isFirstChange() && (this.ctrl.serviceClasses = e.serviceClasses.currentValue, 
            this.serviceClassesLoaded = !0, this.updateServiceClasses()), e.imageStreams && !e.imageStreams.isFirstChange() && (this.ctrl.imageStreams = e.imageStreams.currentValue, 
            this.imageStreamsLoaded = !0, this.updateImageStreams());
        }, e.prototype.$onDestroy = function() {
            r(window).off("resize.services");
        }, e.prototype.filterByCategory = function(e, t, n) {
            var s = this;
            this.ctrl.filteredItems = "all" === e && "all" === t ? this.ctrl.allItems : i.filter(this.ctrl.allItems, function(n) {
                return "all" !== e && "all" === t ? s.catalog.hasCategory(n, e) : "all" === e && "all" !== t ? s.catalog.hasSubCategory(n, t) : s.catalog.hasCategory(n, e) && s.catalog.hasSubCategory(n, t);
            }), n && (this.ctrl.subCategories = this.getSubCategories(e)), this.ctrl.currentFilter = e, 
            this.ctrl.currentSubFilter = 1 === this.ctrl.subCategories.length ? this.ctrl.subCategories[0].id : t || "all", 
            this.updateActiveCardStyles();
        }, e.prototype.toggleExpand = function(e) {
            this.ctrl.currentSubFilter === e ? (this.ctrl.currentSubFilter = null, this.updateActiveCardStyles()) : this.filterByCategory(this.ctrl.currentFilter, e, !1);
        }, e.prototype.getSubCategories = function(e) {
            var t = [];
            return this.ctrl.categories.map(function(n) {
                e === n.id && (t = t.concat(n.subCategories));
            }), t.length > 1 && t.unshift({
                id: "all",
                label: "All"
            }), t;
        }, e.prototype.openOrderingPanel = function() {
            this.ctrl.orderingPanelvisible = !0;
        }, e.prototype.updateAll = function() {
            this.updateServiceClasses(), this.updateImageStreams();
        }, e.prototype.updateState = function() {
            this.ctrl.loading = i.isEmpty(this.ctrl.serviceClasses) && !this.serviceClassesLoaded || i.isEmpty(this.ctrl.imageStreams) && !this.imageStreamsLoaded, 
            this.ctrl.loading || (this.ctrl.filteredItems = this.ctrl.allItems, this.ctrl.categories = this.catalog.removeEmptyCategories(this.ctrl.filteredItems), 
            this.ctrl.subCategories = this.getSubCategories("all"));
        }, e.prototype.updateServiceClasses = function() {
            this.ctrl.allItems = this.ctrl.allItems.concat(this.normalizeData("service", this.ctrl.serviceClasses)), 
            this.updateState();
        }, e.prototype.updateImageStreams = function() {
            this.ctrl.allItems = this.ctrl.allItems.concat(this.normalizeData("image", this.ctrl.imageStreams)), 
            this.updateState();
        }, e.prototype.resizeExpansion = function() {
            var e = r(".sub-cat-card.active"), t = e.find(".card-view-pf").outerHeight();
            e.css("margin-bottom", t + "px");
        }, e.prototype.updateActiveCardStyles = function() {
            r(".sub-cat-card").css("margin-bottom", ""), this.$timeout(this.resizeExpansion, 50);
        }, e;
    }();
    a.$inject = [ "Constants", "Catalog", "$filter", "$scope", "$timeout" ], t.ServicesViewController = a;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var s = n(1);
    n(2), n(16);
    var i = n(17), r = n(9), a = n(10), c = n(11), o = n(12), l = n(13), d = n(14), p = n(15), u = n(18);
    n(2), t.webCatalog = "webCatalog", s.module(t.webCatalog, [ "patternfly", "ngAnimate", "ui.bootstrap", "angularMoment" ]).service("Catalog", u.CatalogService).filter("projectUrl", i.projectUrlFilter).component("catalogSearch", r.catalogSearch).component("landingPage", a.landingPage).component("orderService", c.orderService).component("overlayPanel", o.overlayPanel).component("projectsSummary", l.projectsSummary).component("saasList", d.saasList).component("servicesView", p.servicesView).run([ "$templateCache", function(e) {
        e.put("catalog-search/catalog-search-result.html", n(5)), e.put("order-service/order-service-details.html", n(3)), 
        e.put("order-service/order-service-details.html", n(3)), e.put("order-service/order-service-plans.html", n(7)), 
        e.put("order-service/order-service-configure.html", n(6)), e.put("order-service/order-service-review.html", n(8));
    } ]);
} ], [ 33 ]);