var webpackConfig = require('./config/webpack.test');

module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [
      'jasmine'
    ],

    reporters: [
      'progress', 'coverage'
    ],

    files: [
      'test/test-bundle.ts'
    ],

    preprocessors: {
      'test/test-bundle.ts': ['webpack', 'coverage', 'sourcemap']
    },

    webpack:webpackConfig,

    browsers: [
      'Chrome'
    ],

    singleRun: true,

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'}
      ]
    },

    webpackMiddleware: {
      noInfo: 'errors-only'
    },

    plugins: [
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
      require('karma-coverage')
    ]
  });
};
