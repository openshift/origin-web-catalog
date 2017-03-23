import * as angular from 'angular';
import {AuthService} from './mockAuth.service';
import {LoggerService} from './mockLogger.service';
import {ConstantsService} from './mockConstants.service';
import {DataService} from './mockData.service';

export class MockServicesModule {

  static $inject = ['$window'];

  public moduleName: string = 'mockServices';
  private $window: any;

  constructor($window: any) {
    this.$window = $window;

    let hawtioPluginLoader = require('hawtio-core/dist/hawtio-core');

    angular
      .module(this.moduleName, [])
      .service('AuthService', AuthService)
      .provider('Logger', LoggerService)
      .factory('Constants', ConstantsService)
      .service('DataService', DataService);

    hawtioPluginLoader.addModule(this.moduleName);
  }

  public useMockServices() {
    return this.$window.MOCK_ORIGIN_SERVICES;
  }
}




