import * as angular from 'angular';
import * as _ from 'lodash';

interface IKeywordsService {
  generateKeywords(filterText: string): any;
  filterForKeywords(objects: any, filterFields: string[], keywords: any[]);
}

export class KeywordService implements IKeywordsService {
  public generateKeywords(filterText: string) {
    if (!filterText) {
      return [];
    }

    var keywords = _.uniq(filterText.match(/\S+/g));

    // Sort the longest keyword first.
    keywords.sort(function(a: string, b: string){
      return b.length - a.length;
    });

    // Convert the keyword to a case-insensitive regular expression for the filter.
    return _.map(keywords, function(keyword: string) {
      return new RegExp(_.escapeRegExp(keyword), "i");
    });
  }

  public filterForKeywords(objects: any, filterFields: string[], keywords: any[]) {
    var filteredObjects = objects;
    if (_.isEmpty(keywords)) {
      return filteredObjects;
    }

    // Find resources that match all keywords.
    angular.forEach(keywords, function(regex: any) {
      var matchesKeyword = function(obj: any) {
        var i;
        for (i = 0; i < filterFields.length; i++) {
          var value = _.get(obj, filterFields[i]);
          if (value && regex.test(value)) {
            return true;
          }
        }

        return false;
      };

      filteredObjects = _.filter(filteredObjects, matchesKeyword);
    });
    return filteredObjects;
  }
}
