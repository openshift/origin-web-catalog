export class ServicesViewController implements angular.IController {
  static $inject = ['$filter'];

  public ctrl: any = this;
  public cardViewConfig: any;
  private allServices: any;
  private $filter: any;

  constructor($filter: any) {
    this.cardViewConfig = {
      selectItems: false,
      showSelectBox: false,
      onClick: this.handleClick
    };
    this.$filter = $filter;
  }

  public filterByCategory(category: string) {
    if (category === 'all') {
      this.ctrl.services = this.allServices;
    } else {
      this.ctrl.services = this.$filter('filter')(this.allServices, {category: category}, false);
    }
    this.ctrl.featuredServices = this.$filter('filter')(this.ctrl.services, {featured: true}, false);
    this.ctrl.currentFilter = category;
  }

  public $onInit() {
    this.allServices = this.ctrl.services.map(a => Object.assign({}, a));  // clone
    console.log("services: " + this.allServices.length);
    this.ctrl.featuredServices = this.$filter('filter')(this.allServices, {featured: true}, false);
    this.ctrl.currentFilter = 'all';
  }

  public handleClick(item: any, e: any) {
    console.log('You clicked on ' + item.name);
  };

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    // console.log('$onChanges' + JSON.stringify(onChangesObj));
  }

  public $doCheck() {
    // console.log('$doCheck');
  }
}
