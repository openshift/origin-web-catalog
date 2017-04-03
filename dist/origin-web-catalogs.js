webpackJsonp([ 0, 1 ], [ function(e, t) {
    e.exports = angular;
}, function(e, t) {
    e.exports = _;
}, function(e, t) {}, function(e, t) {
    e.exports = '<div ng-if="$ctrl.versions" uib-dropdown class="input-group-btn version-dropdown">\n  <button uib-dropdown-toggle type="button" class="btn btn-default" uib-tooltip="Select Version" tooltip-placement="top">\n    {{$ctrl.selectedVersion}}\n    <span class="caret"></span>\n  </button>\n  <ul uib-dropdown-menu>\n    <li ng-repeat="version in $ctrl.versions">\n      <a role="menuitem" tabindex="-1" ng-click="$ctrl.selectedVersion = version">\n        {{version}}\n      </a>\n    </li>\n  </ul>\n</div>\n<div ng-bind-html="$ctrl.description | linky : \'_blank\'"></div>\n<!-- TODO: truncate long text -->\n<p class="description">\n  <div ng-bind-html="$ctrl.longDescription | linky : \'_blank\'"></div>\n  <!-- TODO: add documentation link -->\n  <!-- <a href="">Learn More...</a> -->\n</p>\n';
}, function(e, t) {
    e.exports = $;
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <form class="form-horizontal config-form">\n    <div class="form-group">\n      <label class="col-sm-4 control-label" for="project">Add to Project</label>\n      <div class="col-sm-8">\n        <!-- TODO: handle duplicate display names -->\n        <!-- TODO: let users create projects -->\n        <select\n            id="project"\n            ng-model="$ctrl.selectedProject"\n            ng-options="project as (project | displayName) for project in $ctrl.projects track by (project | uid)"\n            class="form-control">\n        </select>\n      </div>\n    </div>\n\n    <!-- TODO: add parameters -->\n    <!-- <div class="form-group"> -->\n    <!--   <label class="col-sm-4 control-label" for="field1">Field 1</label> -->\n    <!--   <div class="col-sm-8"> -->\n    <!--     <input class="form-control" type="text" id="field1"> -->\n    <!--   </div> -->\n    <!-- </div> -->\n  </form>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <div class="select-plans">\n    <h3>Select a Plan</h3>\n    <div ng-repeat="plan in $ctrl.serviceClass.resource.plans" class="radio">\n      <label>\n        <input\n          type="radio"\n          ng-model="$ctrl.planIndex"\n          ng-change="$ctrl.selectPlan(plan)"\n          value="{{$index}}">\n        <span class="plan-name">{{plan.osbMetadata.displayName || plan.name}}</span>\n        <!-- TODO: truncate long text -->\n        <div ng-if="plan.description">{{plan.description}}</div>\n        <!-- TODO: show plan bullets -->\n        <div ng-if="plan.osbFree">Free</div>\n        <div ng-if="!plan.osbFree">Paid</div>\n      </label>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="col-md-12 center">\n  <div ng-if="!$ctrl.error">\n    <div class="title">\n      Your Order is Complete <span class="fa fa-check success-check"></span>\n    </div>\n    <div class="sub-title center">\n      Continue to your project to bind the service to your application.\n    </div>\n    <div class="launch-service">\n      <!-- FIXME: Only works in the console -->\n      <!-- TODO: Provide direct link to bind action? -->\n      <a ng-href="project/{{$ctrl.selectedProject.metadata.name}}/overview" class="btn btn-primary order-btn">\n        View Project\n      </a>\n    </div>\n  </div>\n  <div ng-if="$ctrl.error">\n    <div class="title">Order Failed <span class="fa fa-times text-danger"></span></div>\n    <div class="sub-title center">\n      <span ng-if="$ctrl.error.data.message">\n        {{$ctrl.error.data.message | upperFirst}}\n      </span>\n      <span ng-if="!$ctrl.error.data.message">\n        An error occurred ordering the service.\n      </span>\n    </div>\n  </div>\n  <div>\n    <a class="close-href" href="" ng-click="$ctrl.closePanel()">Close</a> this panel to browse other services.\n  </div>\n  <!-- <div class="related-services-container"> -->\n  <!--   <span class="related-services-label">Related Services</span> -->\n  <!--   <span class="related-services-row"> -->\n  <!--     <div class="card"> -->\n  <!--       <div class="card-icon font-icon icon-jenkins"></div> -->\n  <!--       <div class="card-name">Jenkins</div> -->\n  <!--     </div> -->\n  <!--     <div class="card"> -->\n  <!--       <div class="card-icon font-icon icon-mysql-database"></div> -->\n  <!--       <div class="card-name">mySQL</div> -->\n  <!--     </div> -->\n  <!--   </span> -->\n  <!-- </div> -->\n</div>\n';
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(24);
    t.guidedTour = {
        bindings: {
            showTour: "<",
            tourConfig: "<",
            onTourEnd: "&"
        },
        controller: i.GuidedTourController,
        template: n(17)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(25);
    t.landingPage = {
        bindings: {
            searchPlaceholder: "@",
            doSearchFn: "<"
        },
        controller: i.LandingPageController,
        template: n(18),
        transclude: {
            landingheader: "landingheader",
            landingbody: "landingbody",
            landingside: "landingside"
        }
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(26);
    t.orderService = {
        bindings: {
            serviceClass: "<",
            handleClose: "<"
        },
        controller: i.OrderServiceController,
        template: n(19)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(27);
    t.overlayPanel = {
        bindings: {
            showClose: "<",
            showPanel: "<",
            handleClose: "<",
            fullHeight: "<"
        },
        controller: i.OverlayPanelController,
        template: n(20),
        transclude: !0
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(28);
    t.projectsSummary = {
        bindings: {
            projectSelect: "&",
            showProjects: "&",
            startGettingStartedTour: "&"
        },
        controller: i.ProjectsSummaryController,
        template: n(21)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(29);
    t.saasList = {
        bindings: {
            saasTitle: "<?",
            saasOfferings: "<"
        },
        controller: i.SaasListController,
        template: n(22)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(30);
    t.servicesView = {
        bindings: {
            serviceClasses: "<",
            imageStreams: "<",
            selectedCatagory: "<",
            selectedSubCategory: "<"
        },
        controller: i.ServicesViewController,
        template: n(23)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(1), s = [ {
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
    } ], r = [ {
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
    t.allCategories = r, t.allSaasOfferings = s, i.set(window, "OPENSHIFT_CONSTANTS.SERVICE_CATALOG_CATEGORIES", r), 
    i.set(window, "OPENSHIFT_CONSTANTS.SAAS_OFFERINGS", s);
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(0), s = n(1), r = function() {
        function e(e, t) {
            this.constants = e, this.$filter = t, this.categories = this.constants.SERVICE_CATALOG_CATEGORIES;
        }
        return e.prototype.getServiceItem = function(e) {
            return new a(e, this);
        }, e.prototype.getImageItem = function(e) {
            var t = new o(e, this);
            return t.builderSpecTagName ? t : null;
        }, e.prototype.getCategoriesBySubCategories = function(e) {
            var t = this, n = {}, i = "other";
            return s.each(e, function(e) {
                s.each(t.categories, function(t) {
                    var i = s.find(t.subCategories, function(t) {
                        return t.id === e || s.includes(t.categoryAliases, e);
                    });
                    if (i) return n[i.id] = t.id, !1;
                });
            }), s.isEmpty(n) && (n[i] = i), n;
        }, e.prototype.hasCategory = function(e, t) {
            return s.includes(e.catsBySubCats, t);
        }, e.prototype.hasSubCategory = function(e, t) {
            return s.has(e, [ "catsBySubCats", t ]);
        }, e.prototype.removeEmptyCategories = function(e) {
            var t = this, n = i.copy(this.categories), r = [];
            return s.each(n, function(n) {
                var a = s.filter(n.subCategories, function(n) {
                    return s.some(e, function(e) {
                        return t.hasSubCategory(e, n.id);
                    });
                });
                if (!s.isEmpty(a)) {
                    var o = i.copy(n);
                    o.subCategories = a, r.push(o);
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
            return s.get(this.resource, "osbMetadata.imageUrl", "");
        }, e.prototype.getIcon = function() {
            return s.get(this.resource, [ "osbMetadata", "console.openshift.io/iconClass" ], "fa fa-cubes");
        }, e.prototype.getName = function() {
            return s.get(this.resource, "osbMetadata.displayName", this.resource.metadata.name);
        }, e.prototype.getDescription = function() {
            return s.get(this.resource, "osbMetadata.description", "");
        }, e.prototype.getLongDescription = function() {
            return s.get(this.resource, "osbMetadata.longDescription", "");
        }, e.prototype.getCategoriesBySubCategories = function() {
            return this.catalogSrv.getCategoriesBySubCategories(this.resource.osbTags);
        }, e;
    }();
    t.ServiceItem = a;
    var o = function() {
        function e(e, t) {
            this.resource = e, this.catalogSrv = t, this.builderSpecTagName = this.getBuilderSpecTagName(), 
            this.builderSpecTagName && (this.tags = this.getTags(), this.iconClass = this.getIcon(), 
            this.name = this.getName(), this.description = this.getDescription(), this.longDescription = this.getLongDescription(), 
            this.catsBySubCats = this.getCategoriesBySubCategories());
        }
        return e.prototype.getBuilderSpecTagName = function() {
            var e, t = this;
            return this.resource.status ? (this.resource.spec && this.resource.spec.tags && (e = s.find(this.resource.spec.tags, function(e) {
                var n = s.get(e, "annotations.tags");
                if (n && (n = n.split(/\s*,\s*/), s.includes(n, "builder") && !s.includes(n, "hidden"))) return s.some(t.resource.status.tags, function(t) {
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
    t.ImageItem = o;
}, function(e, t) {
    e.exports = '<div ng-show="$ctrl.showBackdrop" class="modal-backdrop fade guided-tour-backdrop " ng-click="$ctrl.cancelTour()"></div>\n';
}, function(e, t) {
    e.exports = '<div class="landing-page">\n  <div class="landing-page-container" ng-class="{\'snap-up-shown\': $ctrl.showSnapDown}">\n    <div class="landing-main-area">\n      <div class="landing-search-area">\n        <form role="form" class="landing-search-form search-pf has-button">\n          <div class="form-group has-clear">\n            <div class="search-pf-input-group">\n              <label for="search1" class="sr-only">{{$ctrl.searchPlaceholder}}</label>\n              <input id="search1" type="search" class="form-control" placeholder="{{$ctrl.searchPlaceholder}}" ng-model="$ctrl.searchText" ng-keypress="($event.charCode==13)? $ctrl.onSearchButtonClick() : return">\n              <button type="button" ng-if="$ctrl.searchText" class="clear" aria-hidden="true">\n            <span class="pficon pficon-close">\n            </span>\n              </button>\n            </div>\n          </div>\n          <div class="form-group">\n            <button class="btn btn-default" type="button">\n          <span class="fa fa-search"  ng-click="$ctrl.onSearchButtonClick()">\n          </span>\n            </button>\n          </div>\n        </form>\n      </div>\n      <div class="landing-header-area" ng-transclude="landingheader">\n      </div>\n      <div class="landing-body-area">\n        <div ng-transclude="landingbody"></div>\n      </div>\n    </div>\n    <div class="landing-side-bar" ng-transclude="landingside">\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="order-service wizard-pf-body">\n  <div class="wizard-pf-steps">\n    <ul class="wizard-pf-steps-indicator" ng-if="$ctrl.wizardReady">\n      <li class="wizard-pf-step" ng-class="{\n        active: step.selected,\n        visited: step.visited && !step.selected\n      }" ng-repeat="step in $ctrl.getSteps()" data-tabgroup="{{$index}}">\n        <a ng-click="$ctrl.stepClick(step)"><span class="wizard-pf-step-number">{{$index + 1}}</span><span class="wizard-pf-step-title">{{step.label}}</span></a>\n      </li>\n    </ul>\n  </div>\n  <div class="container-fluid wizard-pf-main">\n    <div class="col-sm-6 order-service-details">\n      <div class="order-service-details-top">\n        <div class="pull-left">\n          <span ng-if="!$ctrl.imageUrl" class="icon {{$ctrl.iconClass}}"></span>\n          <!-- TODO: Need to size the image -->\n          <span ng-if="$ctrl.imageUrl"><img ng-src="{{$ctrl.imageUrl}}"></span>\n        </div>\n        <div class="service-title-area">\n          <div class="service-title">\n            <span class="name">{{$ctrl.serviceName}}</span>\n          </div>\n          <div ng-if="$ctrl.serviceClass.resource.osbTags" class="order-service-tags">\n            <span ng-repeat="tag in $ctrl.serviceClass.resource.osbTags" class="tag">\n              {{tag}}\n            </span>\n          </div>\n        </div>\n        <div class="order-service-description">\n          <div ng-if="$ctrl.currentStep.id !== \'plans\' && $ctrl.selectedPlan" class="h3">\n            Plan {{$ctrl.selectedPlan.osbMetadata.displayName || $ctrl.selectedPlan.name}}\n          </div>\n          <div ng-include="\'order-service/order-service-details.html\'"></div>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-6 order-service-config">\n      <div ng-include="$ctrl.currentStep.view" class="wizard-pf-contents"></div>\n    </div>\n  </div>\n  <div class="config-bottom modal-footer wizard-pf-footer">\n    <!--\n      Only use the `btn-cancel wizard-pf-cancel` classes when there\'s a Back\n      button, otherwise there\'s an odd gap between Cancel and Next when there\n      are only two buttons in the wizard.\n    -->\n    <button\n        type="button"\n        class="btn btn-default wizard-pf-dismiss"\n        ng-class="{ \'btn-cancel wizard-pf-cancel\': $ctrl.plans.length > 1 }"\n        ng-disabled="$ctrl.currentStep.id === \'results\'"\n        ng-click="$ctrl.closePanel()">\n      Cancel\n    </button>\n    <!-- Hide the button when only one plan. It will never be enabled. -->\n    <button\n        type="button"\n        class="btn btn-default wizard-pf-back"\n        ng-if="$ctrl.plans.length > 1"\n        ng-disabled="$ctrl.currentStep.id !== \'configure\'"\n        ng-click="$ctrl.previousStep()">\n      <span class="fa fa-angle-left" aria-hidden="true"></span>\n      Back\n    </button>\n    <button\n        type="button"\n        class="btn btn-primary wizard-pf-next"\n        ng-if="$ctrl.currentStep.id !== \'configure\' && $ctrl.currentStep.id !== \'results\'"\n        ng-click="$ctrl.nextStep()">\n      Next\n      <span class="fa fa-angle-right" aria-hidden="true"></span>\n    </button>\n    <button\n        type="button"\n        class="btn btn-primary wizard-pf-next"\n        ng-if="$ctrl.currentStep.id === \'configure\'"\n        ng-disabled="!$ctrl.selectedProject || $ctrl.currentStep.id === \'results\'"\n        ng-click="$ctrl.provisionService()">\n      Create\n      <span class="fa fa-angle-right" aria-hidden="true"></span>\n    </button>\n    <button\n        type="button"\n        class="btn btn-primary wizard-pf-close wizard-pf-dismiss"\n        ng-if="$ctrl.currentStep.id === \'results\'"\n        ng-click="$ctrl.closePanel()">\n      Close\n    </button>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="catalogs-overlay-modal" role="dialog">\n  <div ng-if="$ctrl.shown" class="modal-backdrop fade in"></div>\n  <div ng-if="$ctrl.shown" class="catalogs-overlay-panel-wrapper">\n    <div class="catalogs-overlay-panel-grow-height">\n      <div class="catalogs-overlay-panel" ng-class="{\'catalogs-overlay-panel-full-height\' : $ctrl.fullHeight}">\n        <a ng-if="$ctrl.showClose" ng-click="$ctrl.closePanel()">\n          <span class="catalogs-overlay-panel-close pficon pficon-close"></span>\n        </a>\n        <div class="catalogs-overlay-panel-body" ng-transclude>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="catalog-projects-summary-panel">\n  <button ng-if="$ctrl.canCreate" class="create-button btn btn-primary" ng-click="$ctrl.openNewProjectPanel()">\n    <span class="fa fa-plus"></span>\n    <span class="create-button-text">Create Project</span>\n  </button>\n  <h2 class="primary" ng-if="!$ctrl.projects || $ctrl.projects.length < 1">Getting Started</h2>\n  <h2 class="primary" ng-if="$ctrl.projects && $ctrl.projects.length > 0">My Projects</h2>\n  <div class="catalog-modal catalog-modal-create-project" ng-if="$ctrl.showNewProjectPanel">\n    <h4 class="catalog-modal-title">\n      Create Project\n    </h4>\n    <create-project alerts="$ctrl.alerts" is-dialog="true" redirect-action="$ctrl.onNewProject" on-cancel="$ctrl.closeNewProjectPanel"></create-project>\n    <a href="" class="catalog-modal-close" ng-click="$ctrl.closeNewProjectPanel()">\n      <span class="pficon pficon-close"></span>\n    </a>\n  </div>\n  <div ng-if="$ctrl.projects && $ctrl.projects.length > 0" class="catalog-project-summary-list">\n    <div ng-if="$ctrl.totalProjects > $ctrl.maxDisplayProjects" class="projects-count">\n      <strong>{{$ctrl.maxDisplayProjects}}</strong>\n      of\n      <strong>{{$ctrl.totalProjects}}</strong>\n      Projects\n      <a href="" class="projects-view-all" ng-click="$ctrl.showAllProjects()">View All</a>\n    </div>\n    <div id="catalog-projects-summary-list">\n      <div ng-repeat="project in $ctrl.projects track by (project | uid)" class="project-tile">\n        <div class="dropdown  dropdown-kebab-pf" uib-dropdown="">\n          <button class="btn btn-link uib-dropdown-toggle" type="button" id="dropdownKebab" aria-haspopup="true" aria-expanded="true" uib-dropdown-toggle>\n            <span class="fa fa-ellipsis-v"></span>\n          </button>\n          <ul class="uib-dropdown-menu dropdown-menu-right" aria-labelledby="dropdownKebab">\n            <li><a href="" ng-click="$ctrl.editProject(project)">Edit</a></li>\n            <li>\n              <delete-link\n                  kind="Project"\n                  resource-name="{{project.metadata.name}}"\n                  project-name="{{project.metadata.name}}"\n                  display-name="{{(project | displayName)}}"\n                  type-name-to-confirm="true"\n                  stay-on-current-page="true"\n                  alerts="$ctrl.alerts">\n              </delete-link>\n            </li>\n          </ul>\n        </div>\n        <h3 class="project-tile-header">\n          <span ng-if="project.statusIconClass" class="project-status {{project.statusIconClass}}"></span>\n          <a href="" ng-click="$ctrl.handleProjectClick(project)" class="project-title">{{project | displayName}}</a>\n        </h3>\n        <p class="project-date">\n          {{project.metadata.creationTimestamp | date: \'mediumDate\'}}\n        </p>\n        <div class="project-description" ng-if="project | description">\n          {{project | description}}\n        </div>\n        <div class="catalog-modal catalog-modal-edit-project" ng-if="$ctrl.showEditProjectPanel && $ctrl.edittingProject === project">\n          <h4 class="catalog-modal-title">\n            Edit Project\n          </h4>\n          <edit-project project="$ctrl.edittingProject" is-dialog="true" alerts="$ctrl.alerts" redirect-action="$ctrl.onEditProject" on-cancel="$ctrl.closeEditProjectPanel"></edit-project>\n          <a href="" class="catalog-modal-close" ng-click="$ctrl.closeEditProjectPanel()">\n            <span class="pficon pficon-close"></span>\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div ng-if="$ctrl.showGetStarted">\n    <div class="getting-started-panel">\n      <h2 class="secondary" ng-if="$ctrl.projects && $ctrl.projects.length > 0">Getting Started</h2>\n      <button class="getting-started-button btn btn-default" ng-class="{\'with-projects\': $ctrl.projects && $ctrl.projects.length > 0}" ng-click="$ctrl.handleGettingStartedClick()">\n        <span class="fa fa-info-circle fa-2"></span>\n        <span class="getting-started-button-text">Start Guided Tour</span>\n      </button>\n    </div>\n    <div class="resources-panel">\n      <h2 class="secondary">Resources</h2>\n      <span>\n        {{$ctrl.resourcesText}}\n      </span>\n      <ul>\n        <li ng-repeat="resource in $ctrl.resources">\n          {{resource.text}}\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<span ng-if="$ctrl.hasSaasOfferings()" class="saas-offerings-container">\n  <h1 ng-if="$ctrl.saasTitle">{{$ctrl.saasTitle}}</h1>\n  <div pf-card-view config="$ctrl.cardViewConfig" items="$ctrl.saasOfferings">\n    <div class="card-container">\n      <div class="card-header">\n        <span class="card-icon {{item.icon}}"></span>\n        <span class="card-title">{{item.title}}</span>\n      </div>\n      <div class="card-footer hidden-xs">\n        <truncate-long-text\n                class="card-description"\n                content="item.description"\n                limit="120"\n                use-word-boundary="true">\n        </truncate-long-text>\n      </div>\n    </div>\n  </div>\n</span>\n';
}, function(e, t) {
    e.exports = '\n<div class="services-view">\n\n  <overlay-panel show-panel="$ctrl.orderingPanelvisible" show-close="true" handle-close="$ctrl.closeOrderingPanel">\n    <order-service service-class="$ctrl.serviceToOrder" handle-close="$ctrl.closeOrderingPanel"></order-service>\n  </overlay-panel>\n\n  <div ng-if="$ctrl.loading" class="spinner-container">\n    <div ng-class="{\'spinner spinner-xl\': $ctrl.loading}"></div>\n  </div>\n  <div ng-if="!$ctrl.loading" class="services-view-container">\n    <h1>Catalog</h1>\n\n    <div class="services-categories">\n      <a id="category-all" ng-class="{\'current-filter\': $ctrl.currentFilter === \'all\'}" ng-click="$ctrl.filterByCategory(\'all\', \'all\', true)">All</a> |\n      <span ng-repeat="category in $ctrl.categories">\n        <a id="{{\'category-\'+category.id}}" ng-class="{\'current-filter\': $ctrl.currentFilter === category.id}"\n           ng-click="$ctrl.filterByCategory(category.id, \'all\', true)">{{category.label}}</a>\n           {{$ctrl.categories.length !== ($index+1) ? \' | \' : \'\'}}\n      </span>\n    </div>\n\n    <!-- Do not show sub-category tiles for \'All\' or \'Other\' main categories -->\n\n    <div class="services-sub-categories" ng-if="$ctrl.currentFilter !== \'other\' && $ctrl.currentFilter !== \'all\'">\n      <div ng-repeat="subCategory in $ctrl.subCategories"\n           id="{{\'sub-category-\'+subCategory.id}}"\n           class="sub-cat-card" ng-class="{\'active\': $ctrl.currentSubFilter === subCategory.id}">\n        <div class="inner-content" ng-click="$ctrl.toggleExpand(subCategory.id)">\n          <div class="sub-cat-icon {{subCategory.icon}}" ng-if="subCategory.icon"></div>\n          <div class="sub-cat-label">{{subCategory.label}}</div>\n        </div>\n        <div ng-if="$ctrl.currentSubFilter === subCategory.id"\n           class="card-expansion"\n           pf-card-view config="$ctrl.cardViewConfig" items="$ctrl.filteredItems">\n          <div class="card-container">\n            <div ng-if="!item.imageUrl" class="card-icon {{item.iconClass}}"></div>\n            <div ng-if="item.imageUrl" class="card-img"><img ng-src="{{item.imageUrl}}"></div>\n            <div class="card-name">{{item.name}}</div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Show catalog cards for \'All\' and \'Other\' main categories -->\n\n    <div ng-if="$ctrl.currentFilter === \'other\' || $ctrl.currentFilter === \'all\'"\n         class="card-expansion no-sub-cats"\n         pf-card-view config="$ctrl.cardViewConfig" items="$ctrl.filteredItems">\n      <div class="card-container">\n        <div ng-if="!item.imageUrl" class="card-icon {{item.iconClass}}"></div>\n        <div ng-if="item.imageUrl" class="card-img"><img ng-src="{{item.imageUrl}}"></div>\n        <div class="card-name">{{item.name}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n';
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(0), s = n(31), r = n(4), a = function() {
        function e(e, t) {
            var n = this;
            this.ctrl = this, this.showBackdrop = !1, this.cancelTour = function() {
                s.endTour();
            }, this.handleTourStart = function() {
                n.$timeout(function() {
                    n.showBackdrop = !0, n.bodyElement.addClass("overlay-open");
                });
            }, this.handleTourEnd = function() {
                n.$timeout(function() {
                    n.ctrl.showTour = !1, n.showBackdrop = !1, n.bodyElement.removeClass("overlay-open");
                    var e = n.ctrl.onTourEnd();
                    e && e();
                });
            }, this.$document = e, this.$timeout = t, this.innerConfig = {
                bubblePadding: 5,
                arrowWidth: 15,
                onStart: this.handleTourStart,
                onEnd: this.handleTourEnd,
                onClose: this.handleTourEnd,
                showPrevButton: !0,
                i18n: {
                    nextBtn: "Next >",
                    prevBtn: "< Back"
                }
            };
        }
        return e.prototype.$postLink = function() {
            this.bodyElement = r(this.$document).find("body"), this.hopscotchConfig = {}, i.merge(this.hopscotchConfig, this.innerConfig, this.ctrl.tourConfig);
        }, e.prototype.$onChanges = function(e) {
            e.showTour && (this.ctrl.showTour ? s.startTour(this.hopscotchConfig) : s.endTour()), 
            e.tourConfig && (this.hopscotchConfig = {}, i.merge(this.hopscotchConfig, this.innerConfig, this.ctrl.tourConfig));
        }, e;
    }();
    a.$inject = [ "$document", "$timeout" ], t.GuidedTourController = a;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(0), s = function() {
        function e() {
            this.ctrl = this;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.searchText = "";
        }, e.prototype.onSearchButtonClick = function() {
            i.isFunction(this.ctrl.doSearchFn) && this.ctrl.doSearchFn(this.ctrl.searchText);
        }, e;
    }();
    t.LandingPageController = s;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(0), s = n(1), r = function() {
        function e(e, t, n, i) {
            this.ctrl = this, this.$scope = e, this.$filter = t, this.DataService = n, this.Logger = i;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.iconClass = this.ctrl.serviceClass.iconClass || "fa fa-cubes", this.ctrl.imageUrl = this.ctrl.serviceClass.imageUrl, 
            this.ctrl.serviceName = this.ctrl.serviceClass.name, this.ctrl.description = this.ctrl.serviceClass.description, 
            this.ctrl.longDescription = this.ctrl.serviceClass.longDescription, this.ctrl.plans = s.get(this, "ctrl.serviceClass.resource.plans", []), 
            this.ctrl.selectedPlan = s.first(this.ctrl.plans), this.ctrl.planIndex = 0, this.ctrl.steps = [ {
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
            this.ctrl.currentStep.selected = !0, this.currentStepIndex = s.findIndex(this.ctrl.steps, "selected");
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
            i.isFunction(this.ctrl.handleClose) && this.ctrl.handleClose();
        }, e.prototype.listProjects = function() {
            var e = this;
            this.DataService.list("projects", this.$scope).then(function(t) {
                e.ctrl.projects = s.sortBy(t.by("metadata.name"), e.$filter("displayName")), e.ctrl.selectedProject = s.first(e.ctrl.projects);
            });
        }, e.prototype.makeServiceInstance = function() {
            var e = s.get(this, "ctrl.serviceClass.resource.metadata.name");
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
            var t = s.find(this.ctrl.steps, {
                id: e
            });
            this.gotoStep(t);
        }, e;
    }();
    r.$inject = [ "$scope", "$filter", "DataService", "Logger" ], t.OrderServiceController = r;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(0), s = n(4), r = function() {
        function e(e, t) {
            var n = this;
            this.ctrl = this, this.closePanel = function() {
                i.isFunction(n.ctrl.handleClose) && n.ctrl.handleClose();
            }, this.showDialog = function() {
                n.ctrl.shown = !0, n.$timeout(function() {
                    n.ctrl.showOverlayPanel = !0, s("body").addClass("overlay-open");
                }, 500);
            }, this.hideDialog = function() {
                n.ctrl.shown = !1, n.$timeout(function() {
                    n.ctrl.showOverlayPanel = !1, s("body").removeClass("overlay-open");
                }, 500);
            }, this.$element = e, this.$timeout = t, this.ctrl.showOverlayPanel = !1, this.ctrl.shown = !1;
        }
        return e.prototype.$postLink = function() {
            this.ctrl.showPanel && this.showDialog();
        }, e.prototype.$onChanges = function(e) {
            e.showPanel && (this.ctrl.showPanel ? this.showDialog() : this.hideDialog());
        }, e.prototype.$onDestroy = function() {
            s("body").removeClass("overlay-open");
        }, e;
    }();
    r.$inject = [ "$element", "$timeout" ], t.OverlayPanelController = r;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(1), s = function() {
        function e(e, t, n, s, r, a, o, c) {
            var l = this;
            this.ctrl = this, this.showNewProjectPanel = !1, this.showEditwProjectPanel = !1, 
            this.alerts = [], this.projects = [], this.watches = [], this.maxDisplayProjects = 5, 
            this.onVerifyUser = function() {
                l.ctrl.loading = !0, l.watches.push(l.DataService.watch("projects", l.$scope, l.onProjectsUpdate)), 
                l.AlertMessageService.getAlerts().forEach(function(e) {
                    this.ctrl.alerts[e.name] = e.data;
                });
            }, this.onProjectsUpdate = function(e) {
                var t = i.toArray(e.by("metadata.creationTimestamp")), n = l.$filter("orderObjectsByDate");
                l.ctrl.projects = n(t, !0), l.ctrl.totalProjects = l.ctrl.projects.length, l.ctrl.projects = i.take(l.ctrl.projects, l.maxDisplayProjects), 
                l.ctrl.loading = !1, l.ctrl.showGetStarted = !l.ctrl.projects || l.ctrl.projects.length < 2;
            }, this.closeNewProjectPanel = function() {
                l.ctrl.showNewProjectPanel = !1;
            }, this.onNewProject = function(e) {
                l.ctrl.showNewProjectPanel = !1;
            }, this.editProject = function(e) {
                l.ctrl.edittingProject = e, l.ctrl.showEditProjectPanel = !0;
            }, this.closeEditProjectPanel = function() {
                l.ctrl.showEditProjectPanel = !1;
            }, this.onEditProject = function(e) {
                l.ctrl.showEditProjectPanel = !1;
            }, this.$element = e, this.$scope = t, this.$filter = n, this.ProjectsService = s, 
            this.Logger = r, this.AuthService = a, this.DataService = o, this.AlertMessageService = c;
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
    s.$inject = [ "$element", "$scope", "$filter", "ProjectsService", "Logger", "AuthService", "DataService", "AlertMessageService" ], 
    t.ProjectsSummaryController = s;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(1), s = function() {
        function e() {
            this.ctrl = this, this.cardViewConfig = {
                selectItems: !1,
                showSelectBox: !1,
                onClick: this.handleClick
            };
        }
        return e.prototype.hasSaasOfferings = function() {
            return !i.isEmpty(this.ctrl.saasOfferings);
        }, e.prototype.handleClick = function(e, t) {
            window.open(e.url, "_blank");
        }, e.prototype.$onChanges = function(e) {
            e.saasOfferings && !e.saasOfferings.isFirstChange() && (this.ctrl.saasOfferings = e.saasOfferings.currentValue);
        }, e;
    }();
    t.SaasListController = s;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(0), s = n(1), r = n(4), a = function() {
        function e(e, t, n, i, r) {
            var a = this;
            this.ctrl = this, this.serviceClassesLoaded = !1, this.imageStreamsLoaded = !1, 
            this.handleClick = function(e, t) {
                a.ctrl.serviceToOrder = e, a.ctrl.openOrderingPanel();
            }, this.closeOrderingPanel = function() {
                a.ctrl.orderingPanelvisible = !1;
            }, this.normalizeData = function(e, t) {
                var n, i = [];
                return s.each(t, function(t) {
                    "service" === e ? n = a.catalog.getServiceItem(t) : "image" === e && (n = a.catalog.getImageItem(t)), 
                    n && i.push(n);
                }), i;
            }, this.cardViewConfig = {
                selectItems: !1,
                showSelectBox: !1,
                onClick: this.handleClick
            }, this.constants = e, this.catalog = t, this.$filter = n, this.$scope = i, this.$timeout = r, 
            this.ctrl.loading = !0;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.allItems = [], this.ctrl.currentFilter = "all", this.ctrl.currentSubFilter = null, 
            this.ctrl.orderingPanelvisible = !1, this.updateAll(), this.$scope.$on("cancelOrder", function() {
                e.ctrl.closeOrderingPanel();
            }), this.debounceResize = s.debounce(this.resizeExpansion, 50, {
                maxWait: 250
            }), i.element(window).bind("resize", this.debounceResize), r(window).on("resize.services", this.debounceResize);
        }, e.prototype.$onChanges = function(e) {
            e.serviceClasses && !e.serviceClasses.isFirstChange() && (this.ctrl.serviceClasses = e.serviceClasses.currentValue, 
            this.serviceClassesLoaded = !0, this.updateServiceClasses()), e.imageStreams && !e.imageStreams.isFirstChange() && (this.ctrl.imageStreams = e.imageStreams.currentValue, 
            this.imageStreamsLoaded = !0, this.updateImageStreams());
        }, e.prototype.$onDestroy = function() {
            r(window).off("resize.services");
        }, e.prototype.filterByCategory = function(e, t, n) {
            var i = this;
            this.ctrl.filteredItems = "all" === e && "all" === t ? this.ctrl.allItems : s.filter(this.ctrl.allItems, function(n) {
                return "all" !== e && "all" === t ? i.catalog.hasCategory(n, e) : "all" === e && "all" !== t ? i.catalog.hasSubCategory(n, t) : i.catalog.hasCategory(n, e) && i.catalog.hasSubCategory(n, t);
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
            this.ctrl.loading = s.isEmpty(this.ctrl.serviceClasses) && !this.serviceClassesLoaded || s.isEmpty(this.ctrl.imageStreams) && !this.imageStreamsLoaded, 
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
}, function(e, t) {
    e.exports = hopscotch;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(0);
    n(2), n(15);
    var s = n(16), r = n(8), a = n(9), o = n(10), c = n(11), l = n(12), d = n(13), p = n(14);
    n(2), t.webCatalog = "webCatalog", i.module(t.webCatalog, [ "patternfly", "ngAnimate", "ui.bootstrap" ]).service("Catalog", s.CatalogService).component("guidedTour", r.guidedTour).component("landingPage", a.landingPage).component("orderService", o.orderService).component("overlayPanel", c.overlayPanel).component("projectsSummary", l.projectsSummary).component("saasList", d.saasList).component("servicesView", p.servicesView).run([ "$templateCache", function(e) {
        e.put("order-service/order-service-details.html", n(3)), e.put("order-service/order-service-details.html", n(3)), 
        e.put("order-service/order-service-plans.html", n(6)), e.put("order-service/order-service-configure.html", n(5)), 
        e.put("order-service/order-service-review.html", n(7));
    } ]);
} ], [ 32 ]);