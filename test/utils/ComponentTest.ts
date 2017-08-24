import * as angular from 'angular';
import IRootScopeService = angular.IRootScopeService;
import ICompileService = angular.ICompileService;
import * as $ from 'jquery';

export class ComponentTest<TController> {
  public element: ng.IAugmentedJQuery;
  public scope: ng.IScope;
  public isoScope: ng.IScope;
  public rawElement: any;
  private rootScope: ng.IScope;
  private compile: ng.ICompileService;

  constructor(private template: string) {
    angular.mock.inject(($rootScope: IRootScopeService, $compile: ICompileService) => {
      this.rootScope = $rootScope;
      this.compile = $compile;
    });
  }

  public createComponent(attributes: any): void {
    this.scope = this.rootScope.$new();
    for (var key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        this.scope[key] = attributes[key];
      }
    }
    this.element = this.compile(this.template)(this.scope);
    this.scope.$digest();
    this.isoScope = this.element.isolateScope();
    this.rawElement = this.element[0];
  }

  public eventFire (el: any, etype: any) {
    // Workaround for redirect issue with tests running in safari
    if (etype === 'click') {
      if ($(el).attr("href") === '') {
        $(el).attr("href", "javascript:void(0)");
      }
    }

    if (el.fireEvent) {
      (el.fireEvent('on' + etype));
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

  public fireKeyPressEvent (element: any, keyCode: number) {
    var win: any = window;
    var keyboardEvent: any = new win.KeyboardEvent(
      'keypress',
      {
        bubbles: true,
        cancelable: true,
        shiftKey: false
      }
    );

    delete keyboardEvent.keyCode;
    delete keyboardEvent.which;
    Object.defineProperty(keyboardEvent, 'keyCode', {'value': keyCode});
    Object.defineProperty(keyboardEvent, 'which', {'value': keyCode});

    element.dispatchEvent(keyboardEvent);

  }

}
