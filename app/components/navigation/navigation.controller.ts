import * as angular from 'angular';

export class NavigationController implements angular.IController {
  static $inject = ['$transitions', '$rootScope', '$state', '$timeout', 'Constants', 'GuidedTourService'];

  public ctrl: any = this;
  public applicationName: string;
  public navCollapsed: boolean = true;
  private $transitions: any;
  private $rootScope: any;
  private $state: any;
  private $timeout: any;
  private Constants: any;
  private GuidedTourService: any;
  private tourConfig: any;

  constructor($transitions: any, $rootScope: any, $state: any, $timeout: any, Constants: any, GuidedTourService: any) {
    this.$transitions = $transitions;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.Constants = Constants;
    this.GuidedTourService = GuidedTourService;
  };

  public $onInit() {
    this.ctrl.applicationName = 'OPENSHIFT WEB CATALOGS';

    var _ctrl: any = this.ctrl;
    this.$transitions.onSuccess({to: true}, function(state: any) {
      var toState: any = state.$to();
      var stateName: string = toState.name;

      angular.forEach(_ctrl.navigationItems, function(navItem: any) {
        navItem.isActive = stateName.indexOf(navItem.uiSref) === 0;
      });
    });

    this.ctrl.user = this.$rootScope.user;

    this.$rootScope.$watch('user', function(newValue: any) {
      _ctrl.user = newValue;
    });

    this.tourConfig = this.Constants.GUIDED_TOURS ? this.Constants.GUIDED_TOURS.landing_page_tour : undefined;
  };

  public doLogout() {
    this.$state.go('logout');
 }

  public startTour() {
    this.$state.go('home');
    this.$timeout(() => {
      if (this.tourConfig && this.tourConfig.enabled && this.tourConfig.steps) {
        this.GuidedTourService.startTour(this.tourConfig.steps);
      }
    }, 500);
  }
}
