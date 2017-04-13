webpackJsonp([ 0, 1 ], [ function(e, t) {
    e.exports = _;
}, function(e, t) {
    e.exports = angular;
}, function(e, t) {}, function(e, t) {
    e.exports = $;
}, function(e, t) {
    e.exports = '<a href="" class="catalog-search-match">\n  <span class="catalog-search-match-icon">\n    <span ng-if="match.model.imageUrl"><img ng-src="{{match.model.imageUrl}}"></span>\n    <span ng-if="!match.model.imageUrl && match.model.iconClass" ng-class="match.model.iconClass" class="icon"></span>\n  </span>\n  <div class="catalog-search-match-info">\n    <div class="catalog-search-match-label">\n      {{match.label}}\n    </div>\n    <div class="catalog-search-match-description">\n      <span ng-repeat="tag in (match.model.tags || match.model.resource.osbTags)" class="tag small text-muted">\n        {{tag}}\n      </span>\n    </div>\n  </div>\n</a>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <form name="$ctrl.builderForm" class="form-horizontal config-form">\n    <div class="form-group">\n      <label class="col-sm-4 control-label" for="version">Version</label>\n      <div class="col-sm-8">\n        <ui-select ng-model="$ctrl.istag" required search-enabled="false">\n          <ui-select-match>\n            {{$select.selected.name}}\n          </ui-select-match>\n          <ui-select-choices repeat="tag in $ctrl.versions track by tag.name">\n            {{tag.name}}\n            <small ng-repeat="otherTag in $ctrl.referencedBy[tag.name]">\n              <span ng-if="$first"> &mdash; </span>{{otherTag}}<span ng-if="!$last">,</span>\n            </small>\n          </ui-select-choices>\n        </ui-select>\n      </div>\n    </div>\n    <select-project selected-project="$ctrl.selectedProject" name-taken="$ctrl.projectNameTaken"></select-project>\n    <div class="form-group">\n      <label class="col-sm-4 control-label required" for="app-name">Application Name</label>\n      <div class="col-sm-8" ng-class="{ \'has-error\': $ctrl.builderForm.name.$touched && $ctrl.builderForm.name.$invalid }">\n        <input\n          class="form-control"\n          type="text"\n          id="app-name"\n          required\n          minlength="2"\n          ng-maxlength="$ctrl.nameMaxLength"\n          ng-pattern="$ctrl.namePattern"\n          ng-model="$ctrl.name"\n          name="name"\n          autocorrect="off"\n          autocapitalize="off"\n          spellcheck="false">\n        \x3c!-- Wait until users leave the field to avoid flashing errors as they type. --\x3e\n        <div ng-if="$ctrl.builderForm.name.$touched">\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.required">\n            <span class="help-block">\n              Application name is required.\n            </span>\n          </div>\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.pattern">\n            <span class="help-block">\n              Application name consists of lower-case letters, numbers, and dashes. It must start with a letter and can\'t end with a <code>-</code>.\n            </span>\n          </div>\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.minlength">\n            <span class="help-block">\n              Application name must be at least 2 characters.\n            </span>\n          </div>\n          <div class="has-error" ng-show="$ctrl.builderForm.name.$error.maxlength">\n            <span class="help-block">\n              Application name can\'t be more than 24 characters.\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class="form-group">\n      <label class="col-sm-4 control-label required" for="repository">Git Repository</label>\n      <div class="col-sm-8" ng-class="{ \'has-error\': $ctrl.builderForm.repository.$touched && $ctrl.builderForm.repository.$error.$required }">\n        <input class="form-control"\n          type="text"\n          id="repository"\n          name="repository"\n          required\n          ng-model="$ctrl.repository"\n          autocorrect="off"\n          autocapitalize="off"\n          spellcheck="false">\n        <div ng-if="$ctrl.istag.annotations.sampleRepo" class="help-block">\n          <a href="" ng-click="$ctrl.fillSampleRepo()">Try Sample Repository\n            <i class="fa fa-level-up" aria-hidden="true"></i></a>\n        </div>\n        <div class="has-error" ng-if="$ctrl.builderForm.repository.$touched && $ctrl.builderForm.repository.$error.$required">\n          <span class="help-block">\n            Git repository is required.\n          </span>\n        </div>\n        <div class="has-warning" ng-if="$ctrl.builderForm.repository.$touched && $ctrl.repository && !$ctrl.repositoryPattern.test($ctrl.repository)">\n          <span class="help-block">\n            This might not be a valid Git URL. Check that it is the correct URL to a remote Git repository.\n          </span>\n        </div>\n      </div>\n    </div>\n\n    \x3c!--\n      Only show the link for existing projects. It will be broken for new\n      projects.  Make `invisible` instead of using an ng-if so that the dialog\n      doesn\'t resize when the message appears.\n    --\x3e\n    <div ng-class="{ invisible: !$ctrl.selectedProject.metadata.uid || !$ctrl.istag }" class="form-group">\n      <div class="col-sm-8 col-sm-offset-4">\n        If you have a private Git repository or need to change application defaults, view\n        <a href="" ng-click="$ctrl.navigateToAdvancedForm()">advanced options</a>.\n      </div>\n    </div>\n  </form>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="center">\n  <div ng-if="!$ctrl.success && !$ctrl.error">\n    <h3>\n      Creating Application&hellip;\n    </h3>\n  </div>\n  <div ng-if="$ctrl.success">\n    <h3>\n      <span class="pficon pficon-ok"></span>\n      <strong>{{$ctrl.name}}</strong> has been created in <strong>{{$ctrl.selectedProject.metadata.name}}</strong> successfully\n    </h3>\n    <p>\n      Continue to your project to check the status of your application as it builds and deploys.\n    </p>\n    <div class="footer-panel">\n      <a class="btn btn-primary" href="{{$ctrl.selectedProject | projectUrl : $ctrl.baseProjectUrl}}">View Project</a>\n    </div>\n  </div>\n  <div ng-if="$ctrl.error">`\n    <h3>Error <span class="fa fa-times text-danger"></span></h3>\n    <h4>\n      <span ng-if="$ctrl.error.data.message">\n        {{$ctrl.error.data.message | upperFirst}}\n      </span>\n      <span ng-if="!$ctrl.error.data.message">\n        An error occurred creating the application.\n      </span>\n    </h4>\n    \x3c!-- TODO: Improve error message presentation --\x3e\n    <ul ng-if="$ctrl.error.failure.length" class="failure-messages">\n      <li ng-repeat="failure in $ctrl.error.failure">\n        {{failure.data.message}}\n      </li>\n    </ul>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <form name="$ctrl.forms.orderConfigureForm" class="form-horizontal config-form">\n    <select-project selected-project="$ctrl.selectedProject" name-taken="$ctrl.nameTaken"></select-project>\n    \x3c!-- TODO: add parameters --\x3e\n    \x3c!-- <div class="form-group"> --\x3e\n    \x3c!--   <label class="col-sm-4 control-label" for="field1">Field 1</label> --\x3e\n    \x3c!--   <div class="col-sm-8"> --\x3e\n    \x3c!--     <input class="form-control" type="text" id="field1"> --\x3e\n    \x3c!--   </div> --\x3e\n    \x3c!-- </div> --\x3e\n  </form>\n  <div ng-if="$ctrl.error" class="col-sm-12 has-error">\n    <span class="help-block">{{$ctrl.error}}</span>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="config-top">\n  <div class="select-plans">\n    <h3>Select a Plan</h3>\n    <div ng-repeat="plan in $ctrl.serviceClass.resource.plans" class="radio">\n      <label>\n        <input\n          type="radio"\n          ng-model="$ctrl.planIndex"\n          ng-change="$ctrl.selectPlan(plan)"\n          value="{{$index}}">\n        <span class="plan-name">{{plan.osbMetadata.displayName || plan.name}}</span>\n        \x3c!-- TODO: truncate long text --\x3e\n        <div ng-if="plan.description">{{plan.description}}</div>\n        \x3c!-- TODO: show plan bullets --\x3e\n      </label>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div ng-if="!$ctrl.error">\n  <div ng-if="!$ctrl.orderComplete">\n    <h3 class="text-center">\n      <span class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></span>\n    </h3>\n    <h3 class="text-center">\n      The service is being provisioned\n    </h3>\n  </div>\n  <div ng-if="$ctrl.orderComplete">\n    <h3>\n      <span class="pficon pficon-ok"></span>\n      <strong>{{$ctrl.serviceName}}</strong> has been added to <strong>{{$ctrl.projectDisplayName}}</strong> successfully\n    </h3>\n    <div class="alert alert-info">\n      <span class="pficon pficon-info" aria-hidden="true"></span>\n      <span class="sr-only">Info</span>\n      Continue to your project to bind this service to your application. Binding this service creates a secret containing the information necessary for your application to use the service.\n    </div>\n  </div>\n</div>\n<div class="review-failure" ng-if="$ctrl.error">\n  <h3>Order Failed <span class="fa fa-times text-danger"></span></h3>\n  <h4>\n    <span ng-if="$ctrl.error.message || $ctrl.error.Message ">\n      {{$ctrl.error.message || $ctrl.error.Message | upperFirst}}\n    </span>\n    <span ng-if="!$ctrl.error.message || $ctrl.error.Message">\n      An error occurred ordering the service.\n    </span>\n  </h4>\n</div>\n<div class="footer-panel">\n  <a class="btn btn-primary" href="{{$ctrl.selectedProject | projectUrl : $ctrl.baseProjectUrl}}">View Project</a>\n</div>\n';
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(32);
    t.catalogSearch = {
        bindings: {
            baseProjectUrl: "@",
            imageStreams: "<",
            serviceClasses: "<"
        },
        controller: r.CatalogSearchController,
        template: n(23)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(33);
    t.createFromBuilder = {
        bindings: {
            baseProjectUrl: "@",
            imageStream: "<",
            handleClose: "<"
        },
        controller: r.CreateFromBuilderController,
        template: n(24)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(34);
    t.landingPage = {
        bindings: {},
        controller: r.LandingPageController,
        template: n(25),
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
    var r = n(35);
    t.orderService = {
        bindings: {
            baseProjectUrl: "@",
            serviceClass: "<",
            handleClose: "<"
        },
        controller: r.OrderServiceController,
        template: n(26)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(36);
    t.overlayPanel = {
        bindings: {
            showClose: "<",
            showPanel: "<",
            handleClose: "<",
            singleColumn: "<"
        },
        controller: r.OverlayPanelController,
        template: n(27),
        transclude: !0
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(37);
    t.projectsSummary = {
        bindings: {
            baseProjectUrl: "@",
            projectsUrl: "@",
            viewEditMembership: "&",
            startGettingStartedTour: "&"
        },
        controller: r.ProjectsSummaryController,
        template: n(28)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(38);
    t.saasList = {
        bindings: {
            saasTitle: "<?",
            saasOfferings: "<"
        },
        controller: r.SaasListController,
        template: n(29)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(39);
    t.selectProject = {
        bindings: {
            selectedProject: "=",
            nameTaken: "<"
        },
        controller: r.SelectProjectController,
        template: n(30)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(40);
    t.servicesView = {
        bindings: {
            baseProjectUrl: "@",
            serviceClasses: "<",
            imageStreams: "<"
        },
        controller: r.ServicesViewController,
        template: n(31)
    };
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(0);
    r.set(window, "OPENSHIFT_CONSTANTS.HELP_BASE_URL", "https://docs.openshift.org/latest/");
    var s = {
        new_app: "dev_guide/application_lifecycle/new_app.html",
        application_health: "dev_guide/application_health.html",
        authorization: "architecture/additional_concepts/authorization.html",
        deployments: "dev_guide/deployments/how_deployments_work.html",
        default: "welcome/index.html"
    };
    r.set(window, "OPENSHIFT_CONSTANTS.HELP", s);
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
    } ], i = [ {
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
            label: "JavaScript",
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
    t.allCategories = i, t.allSaasOfferings = a, r.set(window, "OPENSHIFT_CONSTANTS.SERVICE_CATALOG_CATEGORIES", i), 
    r.set(window, "OPENSHIFT_CONSTANTS.SAAS_OFFERINGS", a);
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
    r.set(window, "OPENSHIFT_CONSTANTS.CATALOG_HELP_RESOURCES", c);
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
    var r = n(0), s = function() {
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
                var s = parseInt(r[0], 10);
                isNaN(s) ? this.Logger.warn("Container port " + r[0] + " is not a number") : t.push({
                    containerPort: s,
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
    t.BuilderAppService = s;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), s = n(0), a = function() {
        function e(e, t) {
            this.constants = e, this.$filter = t, this.categories = this.constants.SERVICE_CATALOG_CATEGORIES;
        }
        return e.prototype.getServiceItem = function(e) {
            return new i(e, this);
        }, e.prototype.getImageItem = function(e) {
            var t = new c(e, this);
            return t.builderSpecTagName ? t : null;
        }, e.prototype.getCategoriesBySubCategories = function(e) {
            var t = this, n = {}, r = "other";
            return s.each(e, function(e) {
                s.each(t.categories, function(t) {
                    var r = s.find(t.subCategories, function(t) {
                        return t.id === e || s.includes(t.categoryAliases, e);
                    });
                    if (r) return n[r.id] = t.id, !1;
                });
            }), s.isEmpty(n) && (n[r] = r), n;
        }, e.prototype.hasCategory = function(e, t) {
            return s.includes(e.catsBySubCats, t);
        }, e.prototype.hasSubCategory = function(e, t) {
            return s.has(e, [ "catsBySubCats", t ]);
        }, e.prototype.removeEmptyCategories = function(e) {
            var t = this, n = r.copy(this.categories), a = [];
            return s.each(n, function(n) {
                var i = s.filter(n.subCategories, function(n) {
                    return s.some(e, function(e) {
                        return t.hasSubCategory(e, n.id);
                    });
                });
                if (!s.isEmpty(i)) {
                    var c = r.copy(n);
                    c.subCategories = i, a.push(c);
                }
            }), a;
        }, e;
    }();
    a.$inject = [ "Constants", "$filter" ], t.CatalogService = a;
    var i = function() {
        function e(e, t) {
            this.resource = e, this.catalogSrv = t, this.imageUrl = this.getImage(), this.iconClass = this.getIcon(), 
            this.name = this.getName(), this.description = this.getDescription(), this.longDescription = this.getLongDescription(), 
            this.catsBySubCats = this.getCategoriesBySubCategories();
        }
        return e.prototype.getImage = function() {
            return s.get(this.resource, "osbMetadata.imageUrl", "");
        }, e.prototype.getIcon = function() {
            var e = s.get(this.resource, [ "osbMetadata", "console.openshift.io/iconClass" ], "fa fa-cubes");
            return e = -1 !== e.indexOf("icon-") ? "font-icon " + e : e;
        }, e.prototype.getName = function() {
            return s.get(this.resource, "osbMetadata.displayName", this.resource.metadata.name);
        }, e.prototype.getDescription = function() {
            return s.get(this.resource, "description", "");
        }, e.prototype.getLongDescription = function() {
            return s.get(this.resource, "osbMetadata.longDescription", "");
        }, e.prototype.getCategoriesBySubCategories = function() {
            return this.catalogSrv.getCategoriesBySubCategories(this.resource.osbTags);
        }, e;
    }();
    t.ServiceItem = i;
    var c = function() {
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
            return e = -1 !== e.indexOf("icon-") ? "font-icon " + e : e;
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
    e.exports = '\x3c!-- TODO: Should not have two ordering panels, combine with services view --\x3e\n<overlay-panel show-panel="$ctrl.orderingPanelVisible" show-close="true" handle-close="$ctrl.closeOrderingPanel">\n  <order-service\n      ng-if="$ctrl.selectedServiceClass"\n      base-project-url="{{$ctrl.baseProjectUrl}}"\n      service-class="$ctrl.selectedServiceClass"\n      handle-close="$ctrl.closeOrderingPanel">\n  </order-service>\n  <create-from-builder\n      ng-if="$ctrl.selectedImageStream"\n      base-project-url="{{$ctrl.baseProjectUrl}}"\n      image-stream="$ctrl.selectedImageStream"\n      handle-close="$ctrl.closeOrderingPanel">\n  </create-from-builder>\n</overlay-panel>\n<div class="catalog-search">\n  <form role="form" class="landing-search-form search-pf has-button">\n    <div class="form-group has-clear">\n      <div class="search-pf-input-group">\n        <label for="search-input" class="sr-only">Search Catalog</label>\n        <span class="fa fa-search catalog-search-icon" aria-hidden="true"></span>\n        <input\n            id="search-input"\n            type="search"\n            class="form-control catalog-search-input"\n            placeholder="Search Catalog"\n            ng-model="$ctrl.searchText"\n            uib-typeahead="item.name for item in $ctrl.search($viewValue)"\n            typeahead-on-select="$ctrl.itemSelected($item)"\n            typeahead-template-url="catalog-search/catalog-search-result.html">\n        <button\n            type="button"\n            ng-if="$ctrl.searchText"\n            ng-click="$ctrl.searchText = \'\'"\n            class="clear">\n          <span class="sr-only">Clear Search Input</span>\n          <span class="pficon pficon-close" aria-hidden="true"></span>\n        </button>\n      </div>\n    </div>\n  </form>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="order-service wizard-pf-body">\n  <div class="wizard-pf-steps">\n    <ul class="wizard-pf-steps-indicator">\n      <li class="wizard-pf-step" ng-class="{\n        active: step.selected,\n        visited: step.visited && !step.selected\n      }" ng-repeat="step in $ctrl.steps" data-tabgroup="{{$index}}">\n        <a ng-click="$ctrl.stepClick(step)"><span class="wizard-pf-step-number">{{$index + 1}}</span><span class="wizard-pf-step-title">{{step.label}}</span></a>\n      </li>\n    </ul>\n  </div>\n  <div class="wizard-pf-main">\n    <div class="wizard-pf-main-inner-shadow-covers">\n      <div class="order-service-details">\n        <div class="order-service-details-top">\n          <div class="service-icon">\n            <span class="icon {{$ctrl.imageStream.iconClass}}"></span>\n          </div>\n          <div class="service-title-area">\n            <div class="service-title">\n              {{$ctrl.imageStream.name}}\n              {{$ctrl.istag.name}}\n            </div>\n            <div class="order-service-tags">\n              <span ng-repeat="tag in $ctrl.istag.annotations.tags.split(\',\')" class="tag">\n                {{tag}}\n              </span>\n            </div>\n          </div>\n        </div>\n        <div class="order-service-description-block">\n          <p ng-bind-html="$ctrl.istag.annotations.description | linky : \'_blank\'" class="description"></p>\n          <p ng-if="$ctrl.istag.annotations.sampleRepo">\n            Sample Repository:\n            \x3c!-- TODO: Use Git link filter, needs to be added to origin-web-common --\x3e\n            <span ng-bind-html="$ctrl.istag.annotations.sampleRepo | linky : \'_blank\'">\n          </p>\n        </div>\n      </div>\n      <div class="order-service-config">\n        <div ng-include="$ctrl.currentStep.view" class="wizard-pf-contents"></div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="config-bottom modal-footer wizard-pf-footer">\n  <button\n      type="button"\n      class="btn btn-default wizard-pf-dismiss"\n      ng-disabled="$ctrl.currentStep.id === \'results\'"\n      ng-click="$ctrl.closePanel()">\n    Cancel\n  </button>\n  <button\n      type="button"\n      class="btn btn-primary wizard-pf-next"\n      ng-if="$ctrl.currentStep.id === \'configure\'"\n      ng-disabled="!$ctrl.builderForm.$valid"\n      ng-click="$ctrl.createApp()">\n    Create\n  </button>\n  <button\n      type="button"\n      class="btn btn-primary wizard-pf-close wizard-pf-dismiss"\n      ng-if="$ctrl.currentStep.id === \'results\'"\n      ng-click="$ctrl.closePanel()">\n    Close\n  </button>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="landing">\n  <div class="landing-search-area" ng-transclude="landingsearch"></div>\n  <div class="landing-main-area">\n    <div class="landing-header-area" ng-transclude="landingheader"></div>\n    <div class="landing-body-area">\n      <div ng-transclude="landingbody"></div>\n    </div>\n  </div>\n  <div class="landing-side-bar" ng-transclude="landingside"></div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="order-service wizard-pf-body">\n  <div class="wizard-pf-steps">\n    <ul class="wizard-pf-steps-indicator" ng-if="$ctrl.wizardReady">\n      <li class="wizard-pf-step" ng-class="{\n        active: step.selected,\n        visited: step.visited && !step.selected\n      }" ng-repeat="step in $ctrl.getSteps()" data-tabgroup="{{$index}}">\n        <a ng-click="$ctrl.stepClick(step)"><span class="wizard-pf-step-number">{{$index + 1}}</span><span class="wizard-pf-step-title">{{step.label}}</span></a>\n      </li>\n    </ul>\n  </div>\n  <div class="wizard-pf-main">\n    <div class="wizard-pf-main-inner-shadow-covers">\n      <div class="order-service-details">\n        <div class="order-service-details-top">\n          <div class="service-icon">\n            <span ng-if="!$ctrl.imageUrl" class="icon {{$ctrl.iconClass}}"></span>\n            <span ng-if="$ctrl.imageUrl" class="image"><img ng-src="{{$ctrl.imageUrl}}" alt=""></span>\n          </div>\n          <div class="service-title-area">\n            <div class="service-title">\n              {{$ctrl.serviceName}}\n            </div>\n            <div ng-if="$ctrl.serviceClass.resource.osbTags" class="order-service-tags">\n              <span ng-repeat="tag in $ctrl.serviceClass.resource.osbTags" class="tag">\n                {{tag}}\n              </span>\n            </div>\n          </div>\n        </div>\n        <div class="order-service-description-block">\n          <p ng-if="$ctrl.currentStep.id !== \'plans\' && ($ctrl.selectedPlan.osbMetadata.displayName || $ctrl.selectedPlan.description)">\n            <span ng-if="$ctrl.selectedPlan.osbMetadata.displayName">\n              Plan {{$ctrl.selectedPlan.osbMetadata.displayName}}\n              <span ng-if="$ctrl.selectedPlan.description">&ndash;</span>\n            </span>\n            <span ng-if="$ctrl.selectedPlan.description">{{$ctrl.selectedPlan.description}}</span>\n          </p>\n          <p ng-if="$ctrl.description" ng-bind-html="$ctrl.description | linky : \'_blank\'" class="description"></p>\n          <p ng-if="$ctrl.longDescription" ng-bind-html="$ctrl.longDescription | linky : \'_blank\'" class="description"></p>\n          <p ng-if="$ctrl.serviceClass.resource.osbMetadata.documentationUrl">\n            <a ng-href="{{$ctrl.serviceClass.resource.osbMetadata.documentationUrl}}" target="_blank" class="learn-more-link">Learn More <i class="fa fa-external-link" aria-hidden="true"></i></a>\n          </p>\n        </div>\n      </div>\n      <div class="order-service-config">\n        <div ng-include="$ctrl.currentStep.view" class="wizard-pf-contents"></div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="config-bottom modal-footer wizard-pf-footer">\n  \x3c!--\n    Only use the `btn-cancel wizard-pf-cancel` classes when there\'s a Back\n    button, otherwise there\'s an odd gap between Cancel and Next when there\n    are only two buttons in the wizard.\n  --\x3e\n  <button\n      type="button"\n      class="btn btn-default wizard-pf-dismiss"\n      ng-class="{ \'btn-cancel wizard-pf-cancel\': $ctrl.plans.length > 1 }"\n      ng-disabled="$ctrl.currentStep.id === \'results\'"\n      ng-click="$ctrl.closePanel()">\n    Cancel\n  </button>\n  \x3c!-- Hide the button when only one plan. It will never be enabled. --\x3e\n  <button\n      type="button"\n      class="btn btn-default wizard-pf-back"\n      ng-if="$ctrl.plans.length > 1"\n      ng-disabled="$ctrl.currentStep.id !== \'configure\'"\n      ng-click="$ctrl.previousStep()">\n    <span class="fa fa-angle-left" aria-hidden="true"></span>\n    Back\n  </button>\n  <button\n      type="button"\n      class="btn btn-primary wizard-pf-next"\n      ng-if="$ctrl.currentStep.id !== \'configure\' && $ctrl.currentStep.id !== \'results\'"\n      ng-click="$ctrl.nextStep()">\n    Next\n    <span class="fa fa-angle-right" aria-hidden="true"></span>\n  </button>\n  <button\n      type="button"\n      class="btn btn-primary wizard-pf-next"\n      ng-if="$ctrl.currentStep.id === \'configure\'"\n      ng-disabled="!$ctrl.selectedProject || $ctrl.currentStep.id === \'results\' || $ctrl.forms.orderConfigureForm.$invalid"\n      ng-click="$ctrl.provisionService()">\n    Create\n  </button>\n  <button\n      type="button"\n      class="btn btn-primary wizard-pf-close wizard-pf-dismiss"\n      ng-if="$ctrl.currentStep.id === \'results\'"\n      ng-click="$ctrl.closePanel()">\n    Close\n  </button>\n</div>\n';
}, function(e, t) {
    e.exports = '<div class="catalogs-overlay-modal" role="dialog">\n  <div ng-if="$ctrl.shown" class="modal-backdrop fade in"></div>\n  <div ng-if="$ctrl.shown" class="catalogs-overlay-panel-wrapper">\n    <div class="catalogs-overlay-panel-grow-height">\n      <div class="catalogs-overlay-panel" ng-class="{\'catalogs-overlay-panel-single-column\' : $ctrl.singleColumn}">\n        <a ng-if="$ctrl.showClose" ng-click="$ctrl.closePanel()">\n          <span class="catalogs-overlay-panel-close pficon pficon-close"></span>\n        </a>\n        <div class="catalogs-overlay-panel-body" ng-transclude>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<div ng-if="$ctrl.loading" class="catalog-projects-spinner-container">\n  <div class="spinner spinner-xl"></div>\n</div>\n<div class="catalog-projects-summary-panel" ng-show="!$ctrl.loading">\n  <button ng-if="$ctrl.canCreate" class="create-button btn btn-primary" ng-click="$ctrl.openNewProjectPanel()">\n    <span class="fa fa-plus"></span>\n    <span class="create-button-text">Create Project</span>\n  </button>\n  <h2 class="summary-title secondary" ng-if="!$ctrl.projects || !$ctrl.projects.length">Getting Started</h2>\n  <h2 class="summary-title secondary" ng-if="$ctrl.projects && $ctrl.projects.length">\n    <a href="{{$ctrl.projectsUrl}}">My Projects</a>\n  </h2>\n  <div ng-if="!$ctrl.canCreate">\n    <span ng-if="!$ctrl.newProjectMessage">\n      A cluster admin can create a project for you by running the command:\n      <div class="code-block">\n        <code class="projects-instructions-link ">oadm new-project &lt;projectname&gt;\n   --admin={{$ctrl.user.metadata.name || \'&lt;YourUsername&gt;\'}}</code>\n      </div>\n    </span>\n    <span ng-if="$ctrl.newProjectMessage" ng-bind-html="$ctrl.newProjectMessage | linky : \'_blank\'"></span>\n  </div>\n  <div class="catalog-modal catalog-modal-create-project" ng-if="$ctrl.showNewProjectPanel">\n    <h4 class="catalog-modal-title">\n      Create Project\n    </h4>\n    <create-project alerts="$ctrl.alerts" is-dialog="true" redirect-action="$ctrl.onNewProject" on-cancel="$ctrl.closeNewProjectPanel"></create-project>\n    <a href="" class="catalog-modal-close" ng-click="$ctrl.closeNewProjectPanel()">\n      <span class="pficon pficon-close"></span>\n    </a>\n  </div>\n  <div ng-if="$ctrl.projects && $ctrl.projects.length" class="catalog-project-summary-list">\n    <div ng-if="$ctrl.totalProjects > $ctrl.maxDisplayProjects" class="projects-count">\n      <strong>{{$ctrl.maxDisplayProjects}}</strong>\n      of\n      <strong>{{$ctrl.totalProjects}}</strong>\n      Projects\n      <a href="{{$ctrl.projectsUrl}}" class="projects-view-all">View All</a>\n    </div>\n    <div id="catalog-projects-summary-list">\n      <div ng-repeat="project in $ctrl.projects track by (project | uid)" class="project-tile">\n        <div class="dropdown  dropdown-kebab-pf" uib-dropdown="">\n          <button class="btn btn-link uib-dropdown-toggle" type="button" id="dropdownKebab" aria-haspopup="true" aria-expanded="true" uib-dropdown-toggle>\n            <span class="fa fa-ellipsis-v"></span>\n          </button>\n          <ul class="uib-dropdown-menu dropdown-menu-right" aria-labelledby="dropdownKebab">\n            <li><a href="" ng-click="$ctrl.onViewMemebership(project)">View Membership</a></li>\n            <li><a href="" ng-click="$ctrl.editProject(project)">Edit Project</a></li>\n            <li>\n              <delete-project\n                  label="Delete Project"\n                  project-name="{{project.metadata.name}}"\n                  display-name="{{(project | displayName)}}"\n                  type-name-to-confirm="true"\n                  stay-on-current-page="true"\n                  alerts="$ctrl.alerts">\n              </delete-project>\n            </li>\n          </ul>\n        </div>\n        <h3 class="project-tile-header">\n          <span ng-if="project.statusIconClass" class="project-status {{project.statusIconClass}}"></span>\n          <a href="{{project | projectUrl : $ctrl.baseProjectUrl}}" class="project-title">{{project | displayName}}</a>\n        </h3>\n        <p class="project-date">\n          <span ng-if="project | displayName : true"><span ng-bind-html="project.metadata.name"></span> &ndash;</span>\n          created\n          <span ng-if="project | annotation : \'openshift.io/requester\'">by <span ng-bind-html="project | annotation : \'openshift.io/requester\'"></span></span>\n          <span am-time-ago="project.metadata.creationTimestamp"></span>\n        </p>\n        <div class="project-description" ng-if="project | description">\n          <truncate-long-text content="project | description" use-word-boundary="true" limit="120"></truncate-long-text>\n        </div>\n        <div class="catalog-modal catalog-modal-edit-project" ng-if="$ctrl.showEditProjectPanel && $ctrl.edittingProject === project">\n          <h4 class="catalog-modal-title">\n            Edit Project\n          </h4>\n          <edit-project project="$ctrl.edittingProject" is-dialog="true" alerts="$ctrl.alerts" redirect-action="$ctrl.onEditProject" on-cancel="$ctrl.closeEditProjectPanel"></edit-project>\n          <a href="" class="catalog-modal-close" ng-click="$ctrl.closeEditProjectPanel()">\n            <span class="pficon pficon-close"></span>\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div ng-if="$ctrl.showGetStarted">\n    <div class="getting-started-panel">\n      <h2 class="secondary" ng-if="$ctrl.projects && $ctrl.projects.length > 0">Getting Started</h2>\n      <button class="getting-started-button btn btn-default" ng-class="{\'with-projects\': $ctrl.projects && $ctrl.projects.length}" ng-click="$ctrl.handleGettingStartedClick()">\n        <span class="fa fa-info-circle fa-2"></span>\n        <span class="getting-started-button-text">Start Guided Tour</span>\n      </button>\n    </div>\n    <div class="resources-panel">\n      <h2 class="secondary">Resources</h2>\n      <p>\n        {{$ctrl.resourceDescription}}\n      </p>\n      <ul>\n        <li ng-repeat="resource in $ctrl.resourceLinks">\n          <a href="{{resource.href}}" target="_blank" title="{{resource.href}}">{{resource.title}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n';
}, function(e, t) {
    e.exports = '<span ng-if="$ctrl.hasSaasOfferings()" class="saas-offerings-container">\n  <h1 ng-if="$ctrl.saasTitle">{{$ctrl.saasTitle}}</h1>\n  <div class="saas-list" items="$ctrl.saasOfferings">\n    <div class="card" ng-repeat="item in $ctrl.saasOfferings">\n      <a href="" class="card-content" ng-click="$ctrl.handleClick(item)">\n        <span class="card-icon {{item.icon}}"><img ng-if="item.image" ng-src="{{item.image}}"></span>\n        <span class="card-title">{{item.title}}</span>\n        <truncate-long-text\n                class="card-description hidden-xs"\n                content="item.description"\n                limit="120"\n                use-word-boundary="true">\n        </truncate-long-text>\n      </a>\n    </div>\n  </div>\n</span>\n';
}, function(e, t) {
    e.exports = '<ng-form>\n    <div class="form-group">\n        <label class="col-sm-4 control-label" for="project">Add to Project</label>\n      <div class="col-sm-8">\n        <ui-select ng-model="$ctrl.selectedProject">\n          <ui-select-match>\n            {{$select.selected | displayName}}\n          </ui-select-match>\n          <ui-select-choices repeat="project in $ctrl.projects | searchProjects : $select.search track by (project | uid)">\n            <span ng-bind-html="project | displayName | highlightKeywords : $select.search"></span>\n                <span ng-if="project | displayName : true" class="small text-muted">\n                  <span ng-if="project.metadata.name">&ndash;</span>\n                  <span ng-bind-html="project.metadata.name | highlightKeywords : $select.search"></span>\n                </span>\n          </ui-select-choices>\n        </ui-select>\n      </div>\n    </div>\n</ng-form>\n\n<ng-form name="$ctrl.forms.createProjectForm"\n    ng-if="$ctrl.isNewProject()">\n  <div class="form-group">\n    <label for="name" class="col-sm-4 control-label required">Project Name</label>\n    <div class="col-sm-8" ng-class="{\'has-error\': ($ctrl.forms.createProjectForm.name.$error.pattern && $ctrl.forms.createProjectForm.name.$touched) || $ctrl.nameTaken}">\n      <input class="form-control"\n          name="name"\n          id="name"\n          placeholder="my-project"\n          type="text"\n          required\n          take-focus\n          minlength="2"\n          maxlength="63"\n          pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?"\n          aria-describedby="nameHelp"\n          ng-model="$ctrl.selectedProject.metadata.name"\n          ng-model-options="{ updateOn: \'default blur\' }"\n          ng-change="$ctrl.onNewProjectNameChange()"\n          autocorrect="off"\n          autocapitalize="off"\n          spellcheck="false">\n      <div class="help-block">A unique name for the project.</div>\n      <div class="has-error" ng-if="$ctrl.forms.createProjectForm.name.$error.minlength && $ctrl.forms.createProjectForm.name.$touched">\n        <span id="nameHelp" class="help-block">\n          Name must have at least two characters.\n        </span>\n      </div>\n      <div class="has-error" ng-if="$ctrl.forms.createProjectForm.name.$error.pattern && $ctrl.forms.createProjectForm.name.$touched">\n        <span id="nameHelp" class="help-block">\n          Project names may only contain lower-case letters, numbers, and dashes.\n          They may not start or end with a dash.\n        </span>\n      </div>\n      <div class="has-error" ng-if="$ctrl.nameTaken">\n        <span class="help-block">\n          This name is already in use. Please choose a different name.\n        </span>\n      </div>\n    </div>\n  </div>\n\n  <div class="form-group">\n    <label for="displayName" class="col-sm-4 control-label">Project Display Name</label>\n    <div class="col-sm-8">\n      <input class="form-control"\n        name="displayName"\n        id="displayName"\n        placeholder="My Project"\n        type="text"\n        ng-model="$ctrl.selectedProject.metadata.annotations[\'new-display-name\']">\n    </div>\n  </div>\n\n  <div class="form-group">\n    <label for="description" class="col-sm-4 control-label">Project Description</label>\n    <div class="col-sm-8">\n      <textarea class="form-control"\n        name="description"\n        id="description"\n        placeholder="A short description."\n        ng-model="$ctrl.selectedProject.metadata.annotations[\'openshift.io/description\']"></textarea>\n    </div>\n  </div>\n</ng-form>\n';
}, function(e, t) {
    e.exports = '<div class="services-view">\n\n  <overlay-panel show-panel="$ctrl.orderingPanelVisible" show-close="true" handle-close="$ctrl.closeOrderingPanel">\n    <order-service\n        ng-if="$ctrl.selectedServiceClass"\n        base-project-url="{{$ctrl.baseProjectUrl}}"\n        service-class="$ctrl.selectedServiceClass"\n        handle-close="$ctrl.closeOrderingPanel">\n    </order-service>\n    <create-from-builder\n        ng-if="$ctrl.selectedImageStream"\n        base-project-url="{{$ctrl.baseProjectUrl}}"\n        image-stream="$ctrl.selectedImageStream"\n        handle-close="$ctrl.closeOrderingPanel">\n    </create-from-builder>\n  </overlay-panel>\n\n  <div ng-if="$ctrl.loading" class="spinner-container">\n    <div ng-class="{\'spinner spinner-xl\': $ctrl.loading}"></div>\n  </div>\n  <div ng-if="!$ctrl.loading" class="services-view-container">\n    <h1>Browse Catalog</h1>\n\n    <ul class="nav nav-tabs nav-tabs-pf">\n      <li ng-class="{\'active\': $ctrl.currentFilter === \'all\'}">\n        <a href="" id="category-all" ng-click="$ctrl.filterByCategory(\'all\', \'all\', true)">All</a>\n      </li>\n      <li ng-repeat="category in $ctrl.categories" ng-class="{\'active\': $ctrl.currentFilter === category.id}">\n        <a href="" id="{{\'category-\'+category.id}}" ng-click="$ctrl.filterByCategory(category.id, \'all\', true)">{{category.label}}</a>\n      </li>\n    </ul>\n\n    \x3c!-- Do not show sub-category items for \'All\' or \'Other\' main categories --\x3e\n\n    <div class="services-sub-categories" ng-if="$ctrl.currentFilter !== \'other\' && $ctrl.currentFilter !== \'all\'">\n      <div ng-repeat="subCategory in $ctrl.subCategories"\n           id="{{\'services-sub-category-\'+subCategory.id}}"\n           class="services-sub-category" ng-class="{\'active\': $ctrl.currentSubFilter === subCategory.id}">\n        <a href="" class="services-sub-category-tab" ng-click="$ctrl.selectSubCategory(subCategory.id)">\n          <div class="services-sub-category-tab-image" ng-if="subCategory.imageUrl">\n            <img ng-src="{{subCategory.imageUrl}}" alt="">\n          </div>\n          <div class="services-sub-category-tab-icon {{subCategory.icon}}" ng-if="subCategory.icon && !subCategory.imageUrl"></div>\n          <div class="services-sub-category-tab-name">{{subCategory.label}}</div>\n        </a>\n        <div ng-if="$ctrl.currentSubFilter === subCategory.id" class="services-items">\n          <div class="services-items-inner">\n            <div class="services-items-inner-shadow-covers">\n              <a href="" class="services-item" ng-repeat="item in $ctrl.filteredItems" ng-click="$ctrl.handleClick(item)">\n                <div ng-if="!item.imageUrl" class="services-item-icon">\n                  <span class="{{item.iconClass}}"></span>\n                </div>\n                <div ng-if="item.imageUrl" class="services-item-icon">\n                  <img ng-src="{{item.imageUrl}}" alt="">\n                </div>\n                <div class="services-item-name">\n                  {{item.name}}\n                </div>\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    \x3c!-- Show catalog item for \'All\' and \'Other\' main categories --\x3e\n\n    <div ng-if="$ctrl.currentFilter === \'other\' || $ctrl.currentFilter === \'all\'" class="services-items">\n      <div class="services-items-inner">\n        <div class="services-items-inner-shadow-covers">\n          <a href="" class="services-item" ng-repeat="item in $ctrl.filteredItems" ng-click="$ctrl.handleClick(item)">\n            <div ng-if="!item.imageUrl" class="services-item-icon">\n              <span class="{{item.iconClass}}"></span>\n            </div>\n            <div ng-if="item.imageUrl" class="services-item-icon">\n              <img ng-src="{{item.imageUrl}}" alt="">\n            </div>\n            <div class="services-item-name">\n              {{item.name}}\n            </div>\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(0), s = function() {
        function e(e, t, n) {
            var r = this;
            this.ctrl = this, this.loaded = !1, this.closeOrderingPanel = function() {
                r.ctrl.orderingPanelVisible = !1;
            }, this.$q = e, this.Catalog = t, this.KeywordService = n;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.searchText = "";
        }, e.prototype.$onChanges = function(e) {
            var t = this;
            if (e.serviceClasses || e.imageStreams) {
                if (!this.ctrl.serviceClasses && !this.ctrl.imageStreams) return;
                var n = r.map(this.ctrl.serviceClasses, function(e) {
                    return t.Catalog.getServiceItem(e);
                });
                if (n = n.concat(r.map(this.ctrl.imageStreams, function(e) {
                    return t.Catalog.getImageItem(e);
                })), n = r.reject(n, function(e) {
                    return !e;
                }), this.allItems = r.sortBy(n, "name"), this.loaded = !0, this.searchDeferred) {
                    var s = this.filterForKeywords(this.ctrl.searchText);
                    this.searchDeferred.resolve(s), this.searchDeferred = null;
                }
            }
        }, e.prototype.itemSelected = function(e) {
            "ImageStream" === r.get(e, "resource.kind") ? (this.ctrl.selectedImageStream = e, 
            this.ctrl.selectedServiceClass = null) : (this.ctrl.selectedImageStream = null, 
            this.ctrl.selectedServiceClass = e), this.ctrl.orderingPanelVisible = !0, this.ctrl.searchText = "";
        }, e.prototype.search = function(e) {
            return e ? this.loaded ? this.filterForKeywords(e) : (this.searchDeferred = this.$q.defer(), 
            this.searchDeferred.promise) : [];
        }, e.prototype.filterForKeywords = function(e) {
            var t = this.KeywordService.generateKeywords(e), n = this.KeywordService.filterForKeywords(this.allItems, [ "name", "tags", "resource.osbTags" ], t);
            return r.take(n, 5);
        }, e;
    }();
    s.$inject = [ "$q", "Catalog", "KeywordService" ], t.CatalogSearchController = s;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), s = n(0), a = n(41), i = function() {
        function e(e, t, n, r, s, a, i) {
            this.ctrl = this, this.$scope = e, this.$filter = t, this.$location = n, this.$q = r, 
            this.BuilderAppService = s, this.DataService = a, this.Logger = i;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.steps = [ {
                label: "Configuration",
                id: "configure",
                view: "create-from-builder/create-from-builder-configure.html",
                selected: !0
            }, {
                label: "Results",
                id: "results",
                view: "create-from-builder/create-from-builder-results.html"
            } ], this.ctrl.currentStep = this.ctrl.steps[0], this.ctrl.versions = this.getVersions(), 
            this.ctrl.istag = s.first(this.ctrl.versions), this.ctrl.nameMaxLength = 24, this.ctrl.namePattern = /[a-z]([-a-z0-9]*[a-z0-9])?/, 
            this.ctrl.repositoryPattern = /^[a-z][a-z0-9+.-@]*:(\/\/)?[0-9a-z_-]+/;
        }, e.prototype.stepClick = function(e) {
            "results" !== this.ctrl.currentStep.id && e.visited && this.gotoStep(e);
        }, e.prototype.gotoStep = function(e) {
            this.ctrl.steps.forEach(function(e) {
                return e.selected = !1;
            }), this.ctrl.currentStep && (this.ctrl.currentStep.visited = !0), this.ctrl.currentStep = e, 
            this.ctrl.currentStep.selected = !0;
        }, e.prototype.closePanel = function() {
            r.isFunction(this.ctrl.handleClose) && this.ctrl.handleClose();
        }, e.prototype.fillSampleRepo = function() {
            if (this.ctrl.repository = s.get(this, "ctrl.istag.annotations.sampleRepo"), !this.ctrl.name && this.ctrl.repository) {
                var e = this.ctrl.repository.substr(this.ctrl.repository.lastIndexOf("/") + 1);
                e = e.replace(/\.git$/, ""), e = s.trunc(e, this.ctrl.nameMaxLength), e = s.kebabCase(e), 
                this.ctrl.namePattern.test(e) && (this.ctrl.name = e);
            }
        }, e.prototype.createApp = function() {
            var e = this;
            this.createProjectIfNecessary().then(function() {
                e.gotoStep(s.last(e.ctrl.steps)), e.getImageStreamTag().then(function(t) {
                    var n = e.BuilderAppService.makeAPIObjects({
                        name: e.ctrl.name,
                        repository: e.ctrl.repository,
                        namespace: e.ctrl.selectedProject.metadata.name,
                        imageStreamTag: t
                    });
                    e.createAPIObjects(n);
                }, function(t) {
                    e.ctrl.error = t;
                });
            }, function(t) {
                var n = t.data || {};
                "AlreadyExists" === n.reason ? e.ctrl.projectNameTaken = !0 : e.ctrl.error = n.message || "An error occurred creating the project.";
            });
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
        }, e.prototype.createProjectIfNecessary = function() {
            if (s.has(this.ctrl.selectedProject, "metadata.uid")) return this.$q.when();
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
        }, e.prototype.referencesSameImageStream = function(e) {
            return e.from && "ImageStreamTag" === e.from.kind && -1 === e.from.name.indexOf(":") && !e.from.namespace;
        }, e.prototype.getVersions = function() {
            var e = this;
            this.ctrl.referencedBy = {};
            var t = {}, n = {}, r = s.get(this, "ctrl.imageStream.resource.spec.tags", []);
            s.each(r, function(r) {
                if (e.referencesSameImageStream(r)) return t[r.name] = r.from.name, e.ctrl.referencedBy[r.from.name] = e.ctrl.referencedBy[r.from.name] || [], 
                void e.ctrl.referencedBy[r.from.name].push(r.name);
                var a = s.get(r, "annotations.tags", ""), i = a.split(/\s*,\s*/);
                s.includes(i, "builder") && !s.includes(i, "hidden") && (n[r.name] = r);
            });
            var a = [], i = s.get(this, "ctrl.imageStream.resource.status.tags", []);
            return s.each(i, function(e) {
                var t = n[e.tag];
                t && a.push(t);
            }), a;
        }, e.prototype.getImageStreamTag = function() {
            var e = this.ctrl.imageStream.resource.metadata.name + ":" + this.ctrl.istag.name;
            return this.DataService.get("imagestreamtags", e, {
                namespace: "openshift"
            });
        }, e;
    }();
    i.$inject = [ "$scope", "$filter", "$location", "$q", "BuilderAppService", "DataService", "Logger" ], 
    t.CreateFromBuilderController = i;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = function() {
        function e() {
            this.ctrl = this;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.searchText = "";
        }, e;
    }();
    t.LandingPageController = r;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), s = n(0), a = function() {
        function e(e, t, n, r) {
            var a = this;
            this.ctrl = this, this.watches = [], this.watchResults = function(e, t, n) {
                a.watches.push(a.DataService.watchObject(e, t.metadata.name, n, function(e, t) {
                    var n = s.get(e, "status.conditions"), r = s.find(n, {
                        type: "Ready"
                    });
                    a.ctrl.orderComplete = r && "True" === r.status, a.ctrl.error = s.find(n, {
                        type: "ProvisionFailed"
                    });
                }));
            }, this.$scope = e, this.$filter = t, this.DataService = n, this.Logger = r;
        }
        return e.prototype.$onInit = function() {
            this.ctrl.iconClass = this.ctrl.serviceClass.iconClass || "fa fa-cubes", this.ctrl.imageUrl = this.ctrl.serviceClass.imageUrl, 
            this.ctrl.serviceName = this.ctrl.serviceClass.name, this.ctrl.description = this.ctrl.serviceClass.description, 
            this.ctrl.longDescription = this.ctrl.serviceClass.longDescription, this.ctrl.plans = s.get(this, "ctrl.serviceClass.resource.plans", []), 
            this.ctrl.forms = {}, this.ctrl.selectedPlan = s.first(this.ctrl.plans), this.ctrl.selectedProject = {}, 
            this.ctrl.planIndex = 0, this.ctrl.steps = [ {
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
            this.ctrl.nameTaken = !1, this.ctrl.wizardReady = !0;
        }, e.prototype.getSteps = function() {
            return this.ctrl.steps;
        }, e.prototype.stepClick = function(e) {
            "results" !== this.ctrl.currentStep.id && e.visited && this.gotoStep(e);
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
        }, e.prototype.invalidNewProject = function() {
            return this.isNewProject() && !this.ctrl.selectedProject.validName;
        }, e.prototype.provisionService = function() {
            var e = this;
            if (this.isNewProject()) {
                var t = this.ctrl.selectedProject.metadata.name, n = this.ctrl.selectedProject.metadata.annotations["new-display-name"], r = this.$filter("description")(this.ctrl.selectedProject), s = {
                    apiVersion: "v1",
                    kind: "ProjectRequest",
                    metadata: {
                        name: t
                    },
                    displayName: n,
                    description: r
                };
                this.DataService.create("projectrequests", null, s, this.$scope).then(function(r) {
                    e.ctrl.projectDisplayName = n || t, e.createService();
                }, function(t) {
                    var n = t.data || {};
                    "AlreadyExists" === n.reason ? e.ctrl.nameTaken = !0 : e.ctrl.error = n.message || "An error occurred creating the project.";
                });
            } else this.ctrl.projectDisplayName = this.$filter("displayName")(this.ctrl.selectedProject), 
            this.createService();
        }, e.prototype.createService = function() {
            var e = this, t = this.makeServiceInstance(), n = {
                group: "servicecatalog.k8s.io",
                resource: "instances"
            }, r = {
                namespace: this.ctrl.selectedProject.metadata.name
            };
            this.DataService.create(n, null, t, r).then(function(t) {
                e.ctrl.orderInProgress = !0, e.watchResults(n, t, r), e.gotoStepID("results");
            }, function(t) {
                e.ctrl.error = t;
            });
        }, e.prototype.$onDestroy = function() {
            this.DataService.unwatchAll(this.watches);
        }, e.prototype.closePanel = function() {
            r.isFunction(this.ctrl.handleClose) && this.ctrl.handleClose();
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
        }, e.prototype.isNewProject = function() {
            return this.ctrl.selectedProject && !s.has(this.ctrl.selectedProject, "metadata.uid");
        }, e;
    }();
    a.$inject = [ "$scope", "$filter", "DataService", "Logger" ], t.OrderServiceController = a;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), s = n(3), a = function() {
        function e(e, t) {
            var n = this;
            this.ctrl = this, this.closePanel = function() {
                r.isFunction(n.ctrl.handleClose) && n.ctrl.handleClose();
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
    a.$inject = [ "$element", "$timeout" ], t.OverlayPanelController = a;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), s = n(3), a = n(0), i = function() {
        function e(e, t, n, s, i, c, o, l, d) {
            var p = this;
            this.ctrl = this, this.showNewProjectPanel = !1, this.showEditwProjectPanel = !1, 
            this.alerts = [], this.projects = [], this.watches = [], this.maxDisplayProjects = 5, 
            this.init = function() {
                p.watches.push(p.DataService.watch("projects", p.$scope, p.onProjectsUpdate)), p.AlertMessageService.getAlerts().forEach(function(e) {
                    this.ctrl.alerts[e.name] = e.data;
                }), p.ctrl.resourceDescription = p.Constants.CATALOG_HELP_RESOURCES.description, 
                p.ctrl.resourceLinks = a.clone(p.Constants.CATALOG_HELP_RESOURCES.links), a.forEach(p.ctrl.resourceLinks, function(e) {
                    r.isDefined(e.help) && (e.href = p.Constants.HELP_BASE_URL + p.Constants.HELP[e.help]);
                });
            }, this.onProjectsUpdate = function(e) {
                var t = a.toArray(e.by("metadata.creationTimestamp")), n = p.$filter("orderObjectsByDate");
                p.ctrl.projects = n(t, !0), p.ctrl.totalProjects = p.ctrl.projects.length, p.ctrl.projects = a.take(p.ctrl.projects, p.maxDisplayProjects), 
                p.ctrl.loading = !1, p.ctrl.showGetStarted = !p.ctrl.projects || p.ctrl.projects.length < 2;
            }, this.closeNewProjectPanel = function() {
                p.ctrl.showNewProjectPanel = !1, p.hideModalBackdrop();
            }, this.onNewProject = function(e) {
                p.ctrl.showNewProjectPanel = !1, p.hideModalBackdrop();
            }, this.onViewMemebership = function(e) {
                var t = p.ctrl.viewEditMembership();
                t && t(e);
            }, this.editProject = function(e) {
                p.ctrl.edittingProject = e, p.ctrl.showEditProjectPanel = !0, p.showModalBackdrop();
            }, this.closeEditProjectPanel = function() {
                p.ctrl.showEditProjectPanel = !1, p.hideModalBackdrop();
            }, this.onEditProject = function(e) {
                p.ctrl.showEditProjectPanel = !1, p.hideModalBackdrop();
            }, this.$element = e, this.$scope = t, this.$filter = n, this.ProjectsService = s, 
            this.Logger = i, this.AuthService = c, this.DataService = o, this.Constants = l, 
            this.AlertMessageService = d;
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
                    var s = [];
                    a.forEach(n.details.causes || [], function(e) {
                        e.message && s.push(e.message);
                    }), s.length > 0 && (e.ctrl.newProjectMessage = s.join("\n"));
                }
            }).finally(function() {
                e.init();
            });
        }, e.prototype.openNewProjectPanel = function() {
            this.ctrl.showNewProjectPanel = !0, this.showModalBackdrop();
        }, e.prototype.handleGettingStartedClick = function() {
            var e = this.ctrl.startGettingStartedTour();
            e && e();
        }, e.prototype.handleProjectClick = function(e) {
            var t = this.ctrl.projectSelect();
            t && t(e);
        }, e.prototype.showAllProjects = function() {
            var e = this.ctrl.showProjects();
            e && e();
        }, e.prototype.showModalBackdrop = function() {
            this.$element.append('<div class="catalog-projects-summary-modal-backrop modal-backdrop fade in"></div>');
        }, e.prototype.hideModalBackdrop = function() {
            s(".catalog-projects-summary-modal-backrop").remove();
        }, e;
    }();
    i.$inject = [ "$element", "$scope", "$filter", "ProjectsService", "Logger", "AuthService", "DataService", "Constants", "AlertMessageService" ], 
    t.ProjectsSummaryController = i;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(0), s = function() {
        function e() {
            this.ctrl = this;
        }
        return e.prototype.hasSaasOfferings = function() {
            return !r.isEmpty(this.ctrl.saasOfferings);
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
    var r = n(0), s = function() {
        function e(e, t, n, r, s, a) {
            this.ctrl = this, this.$scope = e, this.$filter = t, this.DataService = n, this.AuthService = a, 
            this.ProjectsService = r, this.Logger = s;
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
                e.ctrl.projects = r.sortBy(t.by("metadata.name"), e.$filter("displayName")), e.ctrl.selectedProject = e.$filter("mostRecent")(e.ctrl.projects), 
                e.ctrl.canCreate && e.ctrl.projects.unshift(n);
            });
        }, e;
    }();
    s.$inject = [ "$scope", "$filter", "DataService", "ProjectsService", "Logger", "AuthService" ], 
    t.SelectProjectController = s;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1), s = n(0), a = n(3), i = function() {
        function e(e, t, n, r, a) {
            var i = this;
            this.ctrl = this, this.serviceClassesLoaded = !1, this.imageStreamsLoaded = !1, 
            this.handleClick = function(e, t) {
                "ImageStream" === s.get(e, "resource.kind") ? (i.ctrl.selectedImageStream = e, i.ctrl.selectedServiceClass = null) : (i.ctrl.selectedImageStream = null, 
                i.ctrl.selectedServiceClass = e), i.ctrl.openOrderingPanel();
            }, this.closeOrderingPanel = function() {
                i.ctrl.orderingPanelVisible = !1;
            }, this.normalizeData = function(e, t) {
                var n, r = [];
                return s.each(t, function(t) {
                    "service" === e ? n = i.catalog.getServiceItem(t) : "image" === e && (n = i.catalog.getImageItem(t)), 
                    n && r.push(n);
                }), r;
            }, this.constants = e, this.catalog = t, this.$filter = n, this.$scope = r, this.$timeout = a, 
            this.ctrl.loading = !0;
        }
        return e.prototype.$onInit = function() {
            var e = this;
            this.ctrl.allItems = [], this.ctrl.currentFilter = "all", this.ctrl.currentSubFilter = null, 
            this.ctrl.orderingPanelVisible = !1, this.updateAll(), this.$scope.$on("cancelOrder", function() {
                e.ctrl.closeOrderingPanel();
            }), this.debounceResize = s.debounce(this.resizeExpansion, 50, {
                maxWait: 250
            }), r.element(window).bind("resize", this.debounceResize), a(window).on("resize.services", this.debounceResize);
        }, e.prototype.$onChanges = function(e) {
            e.serviceClasses && !e.serviceClasses.isFirstChange() && (this.ctrl.serviceClasses = e.serviceClasses.currentValue, 
            this.serviceClassesLoaded = !0, this.updateServiceClasses()), e.imageStreams && !e.imageStreams.isFirstChange() && (this.ctrl.imageStreams = e.imageStreams.currentValue, 
            this.imageStreamsLoaded = !0, this.updateImageStreams());
        }, e.prototype.$onDestroy = function() {
            a(window).off("resize.services");
        }, e.prototype.filterByCategory = function(e, t, n) {
            var r = this;
            this.ctrl.filteredItems = "all" === e && "all" === t ? this.ctrl.allItems : s.filter(this.ctrl.allItems, function(n) {
                return "all" !== e && "all" === t ? r.catalog.hasCategory(n, e) : "all" === e && "all" !== t ? r.catalog.hasSubCategory(n, t) : r.catalog.hasCategory(n, e) && r.catalog.hasSubCategory(n, t);
            }), n && (this.ctrl.subCategories = this.getSubCategories(e)), this.ctrl.currentFilter = e, 
            this.ctrl.currentSubFilter = 1 === this.ctrl.subCategories.length ? this.ctrl.subCategories[0].id : t || "all", 
            this.updateActiveCardStyles();
        }, e.prototype.selectSubCategory = function(e) {
            this.filterByCategory(this.ctrl.currentFilter, e, !1);
        }, e.prototype.getSubCategories = function(e) {
            var t = [];
            return this.ctrl.categories.map(function(n) {
                e === n.id && (t = t.concat(n.subCategories));
            }), t.length > 1 && t.unshift({
                id: "all",
                label: "All"
            }), t;
        }, e.prototype.openOrderingPanel = function() {
            this.ctrl.orderingPanelVisible = !0;
        }, e.prototype.updateAll = function() {
            this.updateServiceClasses(), this.updateImageStreams();
        }, e.prototype.updateState = function() {
            this.ctrl.loading = s.isEmpty(this.ctrl.serviceClasses) && !this.serviceClassesLoaded || s.isEmpty(this.ctrl.imageStreams) && !this.imageStreamsLoaded, 
            this.ctrl.loading || (this.ctrl.filteredItems = this.ctrl.allItems, this.ctrl.categories = this.catalog.removeEmptyCategories(this.ctrl.filteredItems), 
            this.ctrl.subCategories = this.getSubCategories("all"));
        }, e.prototype.sort = function(e) {
            return s.sortByAll(e, [ function(e) {
                return e.name.toLowerCase();
            }, "resource.kind", "resource.metadata.name" ]);
        }, e.prototype.updateServiceClasses = function() {
            var e = this.ctrl.allItems.concat(this.normalizeData("service", this.ctrl.serviceClasses));
            this.ctrl.allItems = this.sort(e), this.updateState();
        }, e.prototype.updateImageStreams = function() {
            var e = this.ctrl.allItems.concat(this.normalizeData("image", this.ctrl.imageStreams));
            this.ctrl.allItems = this.sort(e), this.updateState();
        }, e.prototype.resizeExpansion = function() {
            a(".services-sub-category").removeAttr("style");
            var e = a(".services-sub-category.active"), t = e.find(".services-items").innerHeight();
            e.css("margin-bottom", t + "px");
        }, e.prototype.updateActiveCardStyles = function() {
            this.$timeout(this.resizeExpansion, 50);
        }, e;
    }();
    i.$inject = [ "Constants", "Catalog", "$filter", "$scope", "$timeout" ], t.ServicesViewController = i;
}, function(e, t) {
    e.exports = URI;
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1);
    n(2), n(19);
    var s = n(20), a = n(21), i = n(10), c = n(22), o = n(11), l = n(12), d = n(13), p = n(14), u = n(15), m = n(16), g = n(17), h = n(18);
    n(2), t.webCatalog = "webCatalog", r.module(t.webCatalog, [ "patternfly", "ngAnimate", "ui.bootstrap", "angularMoment", "ui.select" ]).service("BuilderAppService", a.BuilderAppService).service("Catalog", c.CatalogService).filter("projectUrl", s.projectUrlFilter).component("catalogSearch", i.catalogSearch).component("createFromBuilder", o.createFromBuilder).component("landingPage", l.landingPage).component("orderService", d.orderService).component("overlayPanel", p.overlayPanel).component("projectsSummary", u.projectsSummary).component("saasList", m.saasList).component("selectProject", g.selectProject).component("servicesView", h.servicesView).run([ "$templateCache", function(e) {
        e.put("catalog-search/catalog-search-result.html", n(4)), e.put("create-from-builder/create-from-builder-configure.html", n(5)), 
        e.put("create-from-builder/create-from-builder-results.html", n(6)), e.put("order-service/order-service-plans.html", n(8)), 
        e.put("order-service/order-service-configure.html", n(7)), e.put("order-service/order-service-review.html", n(9));
    } ]);
} ], [ 42 ]);