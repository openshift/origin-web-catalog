'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var path = require('path');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 * Example: When the `npm run build` command is executed, the ENV will be set to `build`
 */

var ENV = process.env.npm_lifecycle_event === undefined ? 'test' : process.env.npm_lifecycle_event;
var isTest = ENV.indexOf('test') != -1;
var isProd = ENV.indexOf('build') != -1;

var prodEntry = {
  'origin-web-catalogs': './src/index.ts',
};

var prodExternals = {
  'angular': 'angular',
  'angular-patternfly': 'angular-patternfly',
  'patternfly': 'patternfly',
  'bootstrap': 'bootstrap',
  'jquery': '$',
  'lodash': '_',
  'urijs': 'URI'
};

var serverEntry = {
  'catalogs-app': './app/app.ts'
};

module.exports = {
  module: {
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /.ts$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
          'ng-annotate-loader',
          'ts-loader'
        ]
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({fallback:'style-loader', use: 'css-loader!less-loader?indentedSyntax=true&sourceMap=true'})
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /hawtio-core/,
        loaders: ['imports-loader?Logger=js-logger/src/logger,angular,this=>window',
          'exports-loader?hawtioPluginLoader']
      },
      {
        test: /messenger/,
        loaders: ['imports-loader?angular',
          'exports-loader?Messenger']
      },
      {
        test: /origin-web-common/,
        loader: 'imports-loader?Messenger=messenger/build/js/messenger,Logger=js-logger/src/logger,hawtioPluginLoader=hawtio-core/dist/hawtio-core,angular,URI=urijs/src/URI,hopscotch=hopscotch/dist/js/hopscotch,this=>window'
      }
    ]
  }
};


module.exports.entry = isProd ? prodEntry : serverEntry;

module.exports.externals = isProd ? prodExternals : {};

/**
 * Plugins
 * Reference: http://webpack.github.io/docs/configuration.html#plugins
 * List: http://webpack.github.io/docs/list-of-plugins.html
 */
module.exports.plugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: () => [autoprefixer],
      resolve: {},
      ts: {
        configFileName: 'tsconfig.json'
      },
      tslint: {
        configuration: require('./../tslint.json')
      }
    },
    debug: true
  }),
  new ExtractTextPlugin('[name].css'),
  new ngAnnotatePlugin({
    add: true
  }),
  new webpack.ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery',
    '_': 'lodash',
    'URI': 'URI',
    'OPENSHIFT_CONFIG': 'OPENSHIFT_CONFIG'
  })
];

if (!isProd) {
  module.exports.plugins.push(
    new HtmlWebpackPlugin({
      template: './app/index.html',
      inject: 'body'
    })
  );
}

// Add !test specific plugins
if (!isTest) {
  module.exports.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor-bundle']
    })
  )
}

if (isProd) {
  module.exports.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/styles',
        to: 'less'
      }
    ])
  )
}

module.exports.resolve = {
  extensions: [
    '.webpack.js',
    '.web.js',
    '.js',
    '.ts'
  ],
  modules: ["node_modules", "bower_components"],
  descriptionFiles: ["package.json", "bower.json"]
};


// turn off performance warnings
module.exports.performance = { hints: false };

// /**
//  * Dev server configuration
//  * Reference: http://webpack.github.io/docs/configuration.html#devserver
//  * Reference: http://webpack.github.io/docs/webpack-dev-server.html
//  */
// module.exports.devServer = {
//   contentBase: './src',
//   stats: 'minimal'
// };
