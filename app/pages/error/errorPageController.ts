import * as angular from 'angular';

let URI = require('uri.js/src/URI.js');
require('uri.js/src/URITemplate.js');
require('uri.js/src/URI.fragmentURI.js');

export class ErrorPageController {

  static $inject = ['$window'];

  public ctrl: any = this;
  private $window : any;

  constructor($window: any) {
    this.$window = $window;
  };

  public $onInit() {
    var params = URI(window.location.href).query(true);
    var error = params.error;
    var win: any = window;

    switch (error) {
      case 'access_denied':
        this.ctrl.errorMessage = "Access denied";
        break;
      case 'not_found':
        this.ctrl.errorMessage = "Not found";
        break;
      case 'invalid_request':
        this.ctrl.errorMessage = "Invalid request";
        break;
      case 'API_DISCOVERY':
        this.ctrl.errorLinks = [{
          href: window.location.protocol + "//" + win.OPENSHIFT_CONFIG.api.openshift.hostPort + win.OPENSHIFT_CONFIG.api.openshift.prefix,
          label: "Check Server Connection",
          target: "_blank"
        }];
        break;
      default:
        this.ctrl.errorMessage = "An error has occurred";
    }

    if (params.error_description) {
      this.ctrl.errorDetails = params.error_description;
    }
  };

  public reloadConsole() {
    console.log("reloading console");
    this.$window.location.href = "/";
  };
}
