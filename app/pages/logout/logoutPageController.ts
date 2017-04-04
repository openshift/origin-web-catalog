export class LogoutPageController {

  static $inject = ['Logger', 'AuthService', 'AUTH_CFG'];

  public ctrl: any = this;
  private Logger: any;
  private AuthService: any;
  private AUTH_CFG: any;

  constructor(Logger: any, AuthService: any, AUTH_CFG: any) {
    this.Logger = Logger;
    this.AuthService = AuthService;
    this.AUTH_CFG = AUTH_CFG;
  };

  public $onInit() {
    if (this.AuthService.isLoggedIn()) {
      this.Logger.debug("LogoutController, logged in, initiating logout");
      this.ctrl.logoutMessage = "Logging out...";

      this.AuthService.onLogout(this.loggedOut);
      this.AuthService.startLogout();
    } else if (this.AUTH_CFG.logout_uri) {
      this.Logger.debug("LogoutController, logout completed, redirecting to AUTH_CFG.logout_uri", this.AUTH_CFG.logout_uri);
      this.ctrl.logoutMessage = "Logging out...";
      window.location.href = this.AUTH_CFG.logout_uri;
    } else {
      this.Logger.debug("LogoutController, not logged in, logout complete");
      this.ctrl.logoutMessage = 'You are logged out. Return to the <a href="./">console</a>.';
    }
  }

  private loggedOut = () => {
    if (this.AUTH_CFG.logout_uri) {
      this.Logger.debug("LogoutController, logout completed, redirecting to AUTH_CFG.logout_uri", this.AUTH_CFG.logout_uri);
      window.location.href = this.AUTH_CFG.logout_uri;
    } else {
      this.Logger.debug("LogoutController, logout completed, reloading the page");
      window.location.reload(false);
    }
  }
}

