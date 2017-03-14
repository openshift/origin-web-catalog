var webpackConfig = require('./config/webpack.test');

module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [
      'jasmine'
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

    browsers: [
      'Firefox'
    ],

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
