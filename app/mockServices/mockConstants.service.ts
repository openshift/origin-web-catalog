import * as _ from 'lodash';

export class ConstantsService {
  public constants: any;
  constructor () {
    let win: any = window;
    return _.clone(win.OPENSHIFT_CONSTANTS || {});
  }
}


