import * as angular from 'angular';
import {AuthService} from './mockAuth.service';

export class MockServicesModule {

  static $inject = ['$window'];

  public moduleName: string = 'mockServices';
  private $window: any;

  constructor($window: any) {
    this.$window = $window;

    let hawtioPluginLoader = require('hawtio-core/dist/hawtio-core');

    angular
      .module(this.moduleName, [])
      .service('AuthService', AuthService);

    hawtioPluginLoader.addModule(this.moduleName);
  }

  public useMockServices() {
    return this.$window.MOCK_ORIGIN_SERVICES;
  }
}




