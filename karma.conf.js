module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [
      'jasmine'
    ],

    reporters: [
      'progress', 'coverage'
    ],

    files: [
      'src/tests.webpack.js'
    ],

    preprocessors: {
      'src/tests.webpack.js': ['webpack', 'sourcemap']
    },

    browsers: [
      'PhantomJS'
    ],

    singleRun: true,

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'}
      ]
    },

    webpack: require('./webpack.config'),

    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  });
};
