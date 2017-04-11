import * as angular from 'angular';
import {AuthService} from './mockAuth.service';
import {AuthCfgConstant} from './mockAuthCfg.constant';
import {LoggerService} from './mockLogger.service';
import {APIService} from './mockAPI.service';
import {ConstantsService} from './mockConstants.service';
import {DataService} from './mockData.service';
import {ProjectsService} from './mockProjects.service';
import {AlertMessageService} from './mockAlertMessage.service';
import {KeywordService} from './mockKeywords.service';

export class MockServicesModule {

  static $inject = ['$window'];

  public moduleName: string = 'mockServices';
  private $window: any;

  constructor($window: any) {
    this.$window = $window;

    angular
      .module(this.moduleName, [])
      .factory('Constants', ConstantsService)
      .constant('AUTH_CFG', AuthCfgConstant)
      .service('AuthService', AuthService)
      .service('APIService', APIService)
      .service('ProjectsService', ProjectsService)
      .service('AlertMessageService', AlertMessageService)
      .service('Logger', LoggerService)
      .service('DataService', DataService)
      .service('KeywordService', KeywordService);
  }

  public useMockServices() {
    return this.$window.MOCK_ORIGIN_SERVICES;
  }
}


