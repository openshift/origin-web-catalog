
export class ProjectsPageController {
  static $inject = ['AuthService'];

  public ctrl: any = this;
  public authService: any;

  constructor(AuthService: any) {
    this.authService = AuthService;
  }


  public $onInit() {
    this.authService.withUser().then(function () {
      console.log('fetch the projects');
    });
  };
}
