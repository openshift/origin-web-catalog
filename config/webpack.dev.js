var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

window = {};

try {
  require('../app/config.local.js');
} catch (e) {
  require('../app/config.js');
}

var useHTTPS = !window.MOCK_ORIGIN_SERVICES;

module.exports = webpackMerge(commonConfig, {
  devtool: 'eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: (useHTTPS ? 'https' : 'http') + '://localhost:9000/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    stats: 'minimal',
    port: 9000,
    https: useHTTPS
  }
});
