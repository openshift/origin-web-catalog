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

  public $onInit() {
    var addData = {ctrl: this};
    this.allServices = this.ctrl.services.map(a => Object.assign({}, a, addData));  // clone
    this.ctrl.featuredServices = this.$filter('filter')(this.allServices, {featured: true}, false);
    this.ctrl.currentFilter = 'all';
    this.ctrl.currentSubFilter = 'all';
    this.ctrl.serviceCategories = this.getServiceCategories();
  }

  public getServiceCategories() {
    let uniqueCategories = [];
    let uniqueCategoriesVals = this.allServices.map(item => item.category)
        .filter((value, index, self) => self.indexOf(value) === index);
    uniqueCategoriesVals.forEach((value, index, self) => {
      let obj = {'label': '', 'value': ''};
      obj.label = (value === 'cicd') ? 'CI/CD' : value.charAt(0).toUpperCase() + value.slice(1);
      obj.value = value;
      uniqueCategories[index] = obj;
    });
    return uniqueCategories;
  };

  public filterByCategory(category: string, subCategory: string) {
    if (category === 'all') {
      this.ctrl.services = this.allServices;
    } else {
      if (subCategory === undefined || subCategory === 'all') {
        this.ctrl.services = this.$filter('filter')(this.allServices, {category: category}, true);
        this.ctrl.serviceSubCategories = this.getServiceSubCategories(category);
      } else {
        this.ctrl.services = this.$filter('filter')(this.allServices, {category: category, subCategory: subCategory}, true);
      }
    }
    this.ctrl.featuredServices = this.$filter('filter')(this.ctrl.services, {featured: true}, true);
    this.ctrl.currentFilter = category;
    this.ctrl.currentSubFilter = (subCategory !== undefined) ? subCategory : 'all';
  }

  public getServiceSubCategories(category: string) {
    let uniqueCategories = [];
    let uniqueCategoriesVals = this.ctrl.services.map(item => item.subCategory)
        .filter((value, index, self) => self.indexOf(value) === index);
    uniqueCategoriesVals.forEach((value, index, self) => {
      let obj = {'label': '', 'value': ''};
      obj.label = value.charAt(0).toUpperCase() + value.slice(1);
      obj.value = value;
      uniqueCategories[index] = obj;
    });
    return uniqueCategories;
  };

  public outputNode(item: any) {
    console.log('You clicked on ' + item.name);
  }
  public handleClick(item: any, e: any) {
    item.ctrl.outputNode(item);
  };

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    // console.log('$onChanges' + JSON.stringify(onChangesObj));
  }

  public $doCheck() {
    // console.log('$doCheck');
  }
}
