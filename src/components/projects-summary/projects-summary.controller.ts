import * as angular from 'angular';

export class ProjectsSummaryController implements angular.IController {
  static $inject = ['$element', '$scope', '$document', '$timeout'];

  public ctrl: any = this;
  private $element: any;
  private $document: any;
  private $scope: any;
  private $timeout: any;

  constructor ($element: any, $scope: any, $document: any, $timeout: any) {
    this.$element = $element;
    this.$scope = $scope;
    this.$document = $document;
    this.$timeout = $timeout;
  }

  public $onInit () {
  }

  public $postLink() {
  }

  public $onDestroy () {

  }

  public closePanel = () => {
  };
}

