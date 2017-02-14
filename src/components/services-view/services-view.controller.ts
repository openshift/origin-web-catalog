export class ServicesViewController implements angular.IController {
  public ctrl: any = this;
  public cardViewConfig: any;

  constructor() {
    console.log('ServicesViewController constructor');

    this.cardViewConfig = {
      selectItems: false,
      showSelectBox: false
    };
  }

  public $onInit() {
    console.log('$onInit');
  }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    // console.log('$onChanges' + JSON.stringify(onChangesObj));
  }

  public $doCheck() {
    console.log('$doCheck');
  }
}
