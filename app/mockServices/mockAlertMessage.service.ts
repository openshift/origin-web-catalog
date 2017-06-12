interface IAlertMessageService {
  isAlertPermanentlyHidden(alertID: any, namespace: any): any;
  permanentlyHideAlert(alertID: any, namespace: any): any;
}

export class AlertMessageService implements IAlertMessageService {
  private hiddenAlerts: any = [];

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
