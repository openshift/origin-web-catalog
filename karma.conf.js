var webpackConfig = require('./config/webpack.test');

module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [
      'jasmine',
      'detectBrowsers'
    ],

    reporters: [
      'dots', 'coverage'
    ],

    files: [
      'test/test-bundle.ts'
    ],

    preprocessors: {
      'test/test-bundle.ts': ['webpack', 'coverage', 'sourcemap']
    },

    webpack:webpackConfig,

    detectBrowsers: {
      enabled: true,
      usePhantomJS: false,
      postDetection: function(availableBrowsers) {
        var result = [];

        if (availableBrowsers.indexOf('Safari') > -1) {
          result.push('Safari');
        } else if (availableBrowsers.indexOf('Firefox') > -1) {
          result.push('Firefox');
        } else {
          result = availableBrowsers
        }

        return result;
      }
    },

    singleRun: true,
    captureTimeout: 60000,
    browserDisconnectTimeout : 40000,
    browserDisconnectTolerance : 1,
    browserNoActivityTimeout : 60000,

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'}
      ]
    },

    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};
