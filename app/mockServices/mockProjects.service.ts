import * as angular from 'angular';

interface IProjectsService {
  canCreate(): angular.IPromise < any >;
  get(projectName: string): angular.IPromise < any >;
  update(projectName: string, data: any): angular.IPromise < any >;
}

export class ProjectsService implements IProjectsService {
  public static $inject = ['$q'];

  private $q : any;

  constructor ($q: angular.IQService) {
    this.$q = $q;
  }

  public canCreate() {
    let deferred = this.$q.defer();

    setTimeout(() => {
      deferred.resolve(true);
    }, 300);

    return deferred.promise;
  }

  public get(projectName: string) {
    let deferred = this.$q.defer();
    var project: any = {};
    var context: any = {};

    setTimeout(() => {
      deferred.resolve([project, context]);
    }, 300);

    return deferred.promise;
  }

  public update(projectName: string, data: any) {
    let deferred = this.$q.defer();
    var project: any = {};
    var context: any = {};

    setTimeout(() => {
      deferred.resolve([project, context]);
    }, 300);

    return deferred.promise;
  }

}
