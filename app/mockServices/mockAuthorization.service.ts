interface IAuthorizationService {
  canIAddToProject(projectName: string) : boolean;
}
import * as angular from 'angular';

export class AuthorizationService implements IAuthorizationService {
  public static $inject = ['$q'];

  private $q : any;

  constructor ($q: angular.IQService) {
    this.$q = $q;
  }

  public getProjectRules() : angular.IPromise < any > {
    return this.$q.when({});
  }

  public canIAddToProject (projectName: string) {
    // can add to any project except 'my-proj-a'
    return !(projectName === 'my-proj-a');
  };
}
