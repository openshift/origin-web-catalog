import * as angular from 'angular';

interface IAuthService {
  /** User Login Verification. */
  withUser() : angular.IPromise < any >;
}

/** Backend service communications. */
export class AuthService implements IAuthService {
  public static $inject = ['$rootScope', '$q'];

  private $rootScope : any;
  private $q : any;

  constructor ($rootScope: any, $q: angular.IQService) {
    this.$rootScope = $rootScope;
    this.$q = $q;
  }

  public withUser () {
    var user: any = {
      apiVersion: 'v1',
      groups: null,
      identities: ['anypassword:dev'],
      kind: 'User',
      metadata: {
        creationTimestamp: '2017-02-28T13:54:53Z',
        name: 'mock developer',
        resourceVersion: '1127',
        selfLink: '/oapi/v1/usersdev',
        uid: '7afe3d30-fdbd-11e6-a552-080027242396'
      }
    };
    this.$rootScope.user = user;

    return this.$q.when(user);
  };

  public isLoggedIn() {
    return false;
  }
}
