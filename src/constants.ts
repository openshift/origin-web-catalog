import * as _ from 'lodash';

_.set(window, 'OPENSHIFT_CONSTANTS.HELP_BASE_URL', "https://docs.openshift.org/latest/");
var HELP: any = {
  "new_app":                 "dev_guide/application_lifecycle/new_app.html",
  "application_health":      "dev_guide/application_health.html",
  "authorization":           "architecture/additional_concepts/authorization.html",
  "deployments":             "dev_guide/deployments/how_deployments_work.html",
  "default":                 "welcome/index.html"
  };
_.set(window, 'OPENSHIFT_CONSTANTS.HELP', HELP);

// Assigns global constants
var saasOfferings: any = [
  {id: 1, title:  'Microservices Application', icon: 'fa fa-cubes',  url: 'https://www.redhat.com/en/technologies/virtualization', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.'},
  {id: 2, title:  'Mobile Application', icon: 'fa fa-user',  url: 'https://www.redhat.com/en/technologies/mobile', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.'},
  {id: 3, title:  'Integration Application', icon: 'fa fa-plug',  url: 'https://www.redhat.com/en/technologies/cloud-computing', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.'},
  {id: 4, title:  'Business Process Application', icon: 'fa fa-cubes',  url: 'https://www.redhat.com/en/technologies/management', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.  This is way too long! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.'},
];

var categories: any = [
  {id: 'languages', label: 'Languages', subCategories: [
    {id: 'java', label: 'Java', tags: ['java'], icon: 'font-icon icon-openjdk'},
    {id: 'javascript', tags: ['javascript', 'nodejs', 'js'], label: 'JavaScript', icon: 'font-icon icon-js'},
    {id: 'dotnet', label: '.NET', tags: ['dotnet'], icon: 'font-icon icon-dotnet'},
    {id: 'perl', label: 'Perl', tags: ['perl'], icon: 'font-icon icon-perl'},
    {id: 'ruby', label: 'Ruby', tags: ['ruby'], icon: 'font-icon icon-ruby'},
    {id: 'php', label: 'PHP', tags: ['php'], icon: 'font-icon icon-php'},
    {id: 'python', label: 'Python', tags: ['python'], icon: 'font-icon icon-python'},
    {id: 'golang', label: 'Go', tags: ['golang', 'go'], icon: 'font-icon icon-go-gopher'}
  ]},
  {id: 'databases', label: 'Databases', subCategories: [
    {id: 'mongodb', label: 'Mongo', tags: ['mongodb'], icon: 'font-icon icon-mongodb'},
    {id: 'mysql', label: 'mySQL', tags: ['mysql'], icon: 'font-icon icon-mysql-database'},
    {id: 'postgresql', label: 'Postgres', tags: ['postgresql'], icon: 'font-icon icon-postgresql'},
    {id: 'mariadb', label: 'MariaDB', tags: ['mariadb'], icon: 'font-icon icon-mariadb'}
  ]},
  {id: 'middleware', label: 'Middleware', subCategories: [
    {id: 'integration', label: 'Integration', tags: ['amq', 'fuse', 'jboss-fuse', 'sso']},
    {id: 'process-automation', label: 'Process Automation', tags: ['decisionserver', 'processserver']},
    {id: 'analytics-data', label: 'Analytics & Data', tags: ['datagrid', 'datavirt']},
    {id: 'runtimes', label: 'Runtimes & Frameworks', tags: ['eap', 'httpd', 'tomcat']}
  ]},
  {id: 'cicd', label: 'CI/CD', subCategories: [
    {id: 'jenkins', label: 'Jenkins', tags: ['jenkins'], icon: 'font-icon icon-jenkins'},
    {id: 'pipelines', label: 'Pipelines', tags: ['pipelines'], icon: 'fa fa-clone'}
  ]}
];

_.set(window, 'OPENSHIFT_CONSTANTS.SERVICE_CATALOG_CATEGORIES', categories);
_.set(window, 'OPENSHIFT_CONSTANTS.SAAS_OFFERINGS', saasOfferings);

var enableTechPreview =  {
  pod_presets: false
};
_.set(window, 'OPENSHIFT_CONSTANTS.ENABLE_TECH_PREVIEW_FEATURE', enableTechPreview);

var resources: any = {
  links: [
    {
      title: 'Documentation',
      help: ''
    },
    {
      title: 'Interactive Learning Portal',
      href: 'https://learn.openshift.com'
    },
    {
      title: 'Local Development ',
      href: 'https://www.openshift.org/minishift'
    },
    {
      title: 'YouTube',
      href: 'https://www.youtube.com/user/rhopenshift'
    },
    {
      title: 'Blog',
      href: 'https://blog.openshift.com'
    }
  ]
};

_.set(window, 'OPENSHIFT_CONSTANTS.CATALOG_HELP_RESOURCES', resources);

var showAllCatalogs = function() {
  $('body').find('.services-view-container .nav-tabs a')[0].click();
};

var showCategories = function() {
  $($('body').find('.services-view-container .nav-tabs li')[1]).find('a')[0].click();
  setTimeout(function() {
    $('body').find('.services-sub-category-tab')[1].click();
  });
};

var homePageTourSteps = {
  id: "getting-started-tour",
  steps: [
    {
      title: "Create Project",
      content: "Projects allow you to organize and manage your content. Projects require a unique name, and optionally can include a display name, and description",
      target: ".catalog-projects-summary-panel .create-button",
      targetScrollElement: '.landing-side-bar',
      placement: "left"
    },
    {
      title: "Search Catalog",
      content: "Search by name, description, keyword, or label to quickly locate items in the catalog that you want to add to your project.",
      target: ".landing-search-area .landing-search-form",
      placement: "bottom",
      fixedElement: true
    },
    {
      title: "Browse Catalog",
      content: "If you don’t know exactly what you are looking for, you can browse all available catalog items under the first tab in the catalog.",
      target: ".services-view-container h1",
      placement: "bottom",
      xOffset: 20,
      delay: 300,
      preShow: showAllCatalogs
    },
    {
      title: "Browse by Category",
      content: "A secondary level of categorization is available to further narrow your search.",
      target: ".services-view-container .nav-tabs li:nth-child(2)",
      placement: "right",
      delay: 200,
      preShow: showCategories
    },
    {
      title: "Configure a Resource",
      content: "Clicking on a catalog item will open a panel allowing you to configure and create within a project.",
      target: ".services-sub-category.active .services-items .services-item",
      placement: "right"
    },
    {
      title: "Additional Help",
      content: "Additional resources can be found here or you can always access the help icon in the top banner for more information.",
      target: ".resources-panel",
      targetScrollElement: '.landing-side-bar',
      placement: "left"
    }
  ]
};

var guidedTours = {
  landing_page_tour: {
    enabled: true,
    auto_launch: false,
    steps: homePageTourSteps
  }
};

_.set(window, 'OPENSHIFT_CONSTANTS.GUIDED_TOURS', guidedTours);

// Example publisher synonyms to normilize vendor names shown in publisher filter in Browse Catalog
_.set(window, 'OPENSHIFT_CONSTANTS.PUBLISHER_SYNONYMS',
  {
    // 'Red Hat': 'Red Hat, Inc.'
    // 'Red Hat, Inc': 'Red Hat, Inc.'
  }
);
