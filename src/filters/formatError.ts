import * as _ from 'lodash';

export function formatErrorFilter () {

  return function(error: any) {
    if (!error) {
      return;
    }
    var setMessagefailures = _.spread(function(message: any, failure: any) {
      _.extend(error, {
        data: {
          message: message
        }
      });
      var failures = [];
      _.each(_.split(failure, "\n"), function(message: any) {
        failures.push({
          data: {
            message: message
          }
        });
      });
      error.failure = failures;
    });
    setMessagefailures(_.split(error.message, ":", 2));

    return error;
  };
}
