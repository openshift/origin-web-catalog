import * as angular from 'angular';

export class NavigationController implements angular.IController {
  static $inject = ['$transitions', '$rootScope'];

  public ctrl: any = this;
  public navigationItems: any;
  public applicationName: string;
  private $transitions: any;
  private $rootScope: any;


  constructor($transitions: any, $rootScope: any) {
    this.$transitions = $transitions;
    this.$rootScope = $rootScope;
  };

  public $onInit() {
    this.ctrl.applicationName = 'OPENSHIFT WEB CATALOGS';
    this.ctrl.navigationItems = [
      {
        title: 'Services',
        iconClass: 'pficon pficon-service',
        uiSref: 'services'
      },
      {
        title: 'Projects',
        iconClass: 'pficon pficon-project',
        uiSref: 'projects'
      }
    ];

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
  };

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    // console.log('$onChanges' + JSON.stringify(onChangesObj));
  }

  public $doCheck() {
    // console.log('$doCheck');
  }
}
