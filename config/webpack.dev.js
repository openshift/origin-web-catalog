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
var port = window.DEV_SERVER_PORT || 9001;

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: (useHTTPS ? 'https' : 'http') + '://localhost:' + port + '/',
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
    port: port,
    https: useHTTPS
  }
});
