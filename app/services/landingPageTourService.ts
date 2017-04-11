import * as angular from 'angular';
import * as jQuery from 'jquery';

interface ILandingPageTourService {
  startTour(tourConfig: any);
}

export class LandingPageTourService implements ILandingPageTourService {
  public static $inject = ['$document', '$timeout', 'Constants', 'GuidedTourService'];

  private $document: any;
  private $timeout: any;
  private Constants: any;
  private GuidedTourService: any;
  private tourConfig: any;

  constructor ($document: any, $timeout: any, Constants: any, GuidedTourService: any) {
    this.$document = $document;
    this.$timeout = $timeout;
    this.Constants = Constants;
    this.GuidedTourService = GuidedTourService;

    this.tourConfig = {
      id: "getting-started-tour",
      steps: []
    };

    let stepConstants = Constants.LANDING_PAGE_TOUR_STEPS || {};

    this.addStep(stepConstants.createProject,
      {
        title: "Create Project",
        content: "Projects allow you to organize and manage your content. Projects require a unique name, and optionally can include a display name, and description",
        target: ".catalog-projects-summary-panel .create-button",
        targetScrollElement: '.landing-side-bar',
        placement: "left"
      });

    this.addStep(stepConstants.search,
      {
        title: "Search Resources",
        content: "Search by name, description, keyword, or label to quickly locate items in the catalog that you want to add to your project.",
        target: ".landing-search-area .landing-search-form",
        placement: "bottom",
        fixedElement: true
      });

    this.addStep(stepConstants.saasList,
      {
        title: "Build Applications",
        content: "Build applications from a quickstart or popular framework.",
        target: ".saas-list .card",
        targetScrollElement: '.landing',
        placement: "right",
      });

    this.addStep(stepConstants.catalogs,
      {
        title: "Browse Catalog",
        content: "If you don’t know exactly what you are looking for, you can browse all available catalog items under the first tab in the catalog.",
        target: "#category-all",
        targetScrollElement: '.landing',
        placement: "top",
        preShow: this.showAllCatalogs
      });

    this.addStep(stepConstants.category,
      {
        title: "Browse by Category",
        content: "A secondary level of categorization is available to further narrow your search.",
        target: ".services-view-container ul li:nth-child(2)",
        targetScrollElement: '.landing',
        placement: "right",
        preShow: this.showLanguagesCatalogs,
        delay: 100
      });

    this.addStep(stepConstants.catalogItem,
      {
        title: "Configure a Resource",
        content: "Clicking on a catalog item will open a panel allowing you to configure and create within a project.",
        target: ".services-sub-category.active .services-items .services-item",
        targetScrollElement: '.landing',
        placement: "right"
      });

    this.addStep(stepConstants.help,
      {
        title: "Additional Help",
        content: "Additional resources can be found here or you can always access the help icon in the masthead for more information.",
        target: ".resources-panel",
        targetScrollElement: '.landing-side-bar',
        placement: "left"
      });
  }

  public startTour () {
    this.GuidedTourService.startTour(this.tourConfig);
  }

  private addStep(configSetting: any, defaultStep: any) {
    if (configSetting && configSetting.show === false) {
      return;
    } else {
      this.tourConfig.steps.push(angular.merge({}, defaultStep, configSetting));
    }
  }

  private showAllCatalogs = () => {
    jQuery(this.$document).find('.services-view-container #category-all')[0].click();
  };

  private showLanguagesCatalogs = () => {
    jQuery(this.$document).find('.services-view-container ul li:nth-child(2) a')[0].click();
    this.$timeout(() => {
      jQuery(this.$document).find('.services-sub-category-tab')[1].click();
    });
  };
}
