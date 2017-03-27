interface IAlertMessageService {
  addAlert(alert: any) : any;
  getAlerts() : any;
  clearAlerts(): any;
  isAlertPermanentlyHidden(alertID: any, namespace: any): any;
  permanentlyHideAlert(alertID: any, namespace: any): any;
}

export class AlertMessageService implements IAlertMessageService {
  private alerts: any;
  private hiddenAlerts: any = [];

  constructor () {
    this.alerts = [];
  }

  public addAlert(alert: any) {
    this.alerts.push(alert);
  }

  public getAlerts() {
    return this.alerts;
  }

  public clearAlerts() {
    this.alerts = this.alerts.splice(0, this.alerts.length);
  }

  public isAlertPermanentlyHidden(alertID: any, namespace: any) {
    var key = this.alertHiddenKey(alertID, namespace);
    return this.hiddenAlerts.indexOf(key);
  }

  public permanentlyHideAlert(alertID: any, namespace: any) {
    var key = this.alertHiddenKey(alertID, namespace);
    this.hiddenAlerts.push(key);
  }

  private alertHiddenKey (alertID: any, namespace: any) {
    if (!namespace) {
      return 'hide/alert/' + alertID;
    }

    return 'hide/alert/' + namespace + '/' + alertID;
  };
}
