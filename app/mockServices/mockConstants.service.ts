import * as _ from 'lodash';

export class ConstantsService {
  public constants: any;
  constructor () {
    let win: any = window;

    let publisherSynonyms = {
      'Vendor B': 'Vendor B, Inc.',
      'Vendor B, Inc': 'Vendor B, Inc.',
      'Vendor B, Co.': 'Vendor B, Inc.'
    };
    _.set(win, 'OPENSHIFT_CONSTANTS.PUBLISHER_SYNONYMS', publisherSynonyms);

    return _.clone(win.OPENSHIFT_CONSTANTS || {});
  }
}


