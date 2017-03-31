import * as jQuery from 'jquery';

export class HomePageController {
  static $inject = ['$state', '$element', '$timeout', 'AuthService', 'Logger', 'Constants', 'DataService'];

  public ctrl: any = this;
  private $state: any;
  private $element: any;
  private $timeout: any;
  private authService: any;
  private logger: any;
  private constants: any;
  private dataService: any;
  private Logger: any;
  private tourInProgress: boolean = false;
  private gettingStartedTourConfig: any;

  constructor($state: any, $element: any, $timeout: any, AuthService: any, Logger: any, Constants: any, DataService: any) {
    this.$state = $state;
    this.$element = $element;
    this.$timeout = $timeout;
    this.authService = AuthService;
    this.logger = Logger;
    this.constants = Constants;
    this.dataService = DataService;
    this.Logger = Logger;
    this.ctrl.applications = [];
    this.ctrl.categories = [];
    this.ctrl.serviceClasses = {};
    this.ctrl.imageStreams = {};
  };

  public $onInit() {
    this.authService.withUser().then(() => {
      this.update();
    });

    this.gettingStartedTourConfig = {
      id: "getting-started-tour",
      steps: [
        {
          title: "Create Project",
          content: "Praesent sagittis est et arcu fringilla placerat. Cras erat ante, dapibus non mauris ac, volutpat sollicitudin ligula. Morbi gravida nisl vel risus tempor, sit amet luctus erat tempus. Curabitur blandit sem non pretium bibendum.",
          target: ".catalog-projects-summary-panel .create-button",
          placement: "left"
        },
        {
          title: "Search Resources",
          content: "Curabitur nisl quam, interdum a venenatis a, consequat a ligula. Nunc nec lorem in erat rhoncus lacinia at ac orci. Sed nec augue congue, vehicula justo quis, venenatis turpis. Nunc quis consectetur purus. Nam vitae viverra lacus.",
          target: ".landing-search-area .landing-search-form",
          placement: "bottom"
        },
        {
          title: "Build Applications",
          content: "Donec consequat dignissim neque, sed suscipit quam egestas in. Fusce bibendum laoreet lectus commodo interdum. Vestibulum odio ipsum, tristique et ante vel, iaculis placerat nulla. Suspendisse iaculis urna feugiat lorem semper, ut iaculis risus tempus.",
          target: ".build-applications-view .card-view-pf .card",
          placement: "right",
          onNext: this.showAllCatalogs
        },
        {
          title: "Browse Catalog",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          target: ".services-view-container",
          placement: "top",
          onNext: this.showLanguagesCatalogs
        },
        {
          title: "Browse by Category",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
          target: ".services-sub-categories .sub-cat-card.active",
          placement: "right",
          onPrev: this.showAllCatalogs,
          delay: 100
        },
        {
          title: "Configure a Resource",
          content: "Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus.",
          target: ".sub-cat-card.active .card-expansion .card",
          placement: "right",
        },
        {
          title: "Additional Help",
          content: "Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. ",
          target: ".resources-panel",
          placement: "left"
        },
      ]
    };
  };

  public update() {
    this.dataService.list({
      group: 'servicecatalog.k8s.io',
      resource: 'serviceclasses'
    }, {}).then( (resources: any) => {
      this.ctrl.serviceClasses = resources.by("metadata.name");
    }, () => {
      this.logger.log("Error Loading serviceclasses from servicecatalog.k8s.io: ");
      this.ctrl.serviceClasses = {};
    });

    this.dataService.list("imagestreams", {namespace: "openshift"}).then( (resources: any) => {
      this.ctrl.imageStreams = resources.by("metadata.name");
    }, () => {
      this.logger.log("Error Loading openshift imagestreams: ");
      this.ctrl.imageStreams = {};
    });

    this.ctrl.saasOfferingsTitle = "What Do You Want to Build?";
    this.ctrl.saasOfferings = this.constants.SAAS_OFFERINGS;
  };

  public navToProject = (project: any) => {
    this.$state.go('projects/' + project.metadata.name);
  };

  public navToProjects = () => {
    this.$state.go('projects');
  };

  public startGuidedTour = () => {
    this.tourInProgress = true;
  };

  public handleTourEnd = () => {
    this.tourInProgress = false;
  };

  public showAllCatalogs = () => {
    var allSelector: any = jQuery(this.$element).find('.services-categories a');
    allSelector[0].click();
  };

  public showLanguagesCatalogs = () => {
    var langSelector: any = jQuery(this.$element).find('.services-categories a')[1];
    langSelector.click();
    this.$timeout(() => {
      var subSelector: any = jQuery(this.$element).find('.services-sub-categories .sub-cat-card .inner-content')[1];
      subSelector.click();
    });
  };
}
