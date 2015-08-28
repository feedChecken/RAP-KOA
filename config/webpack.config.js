'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var pkg = require(path.join(process.cwd(), 'package.json'));
module.exports = {
  output: {
    path: path.join(process.cwd(), './public/'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  devtool: '#source-map',

  resolve: {
    root: path.join(__dirname, '../node_modules'),
    extensions: ['', '.js', '.jsx']
  },

  resolveLoader: {
    root: path.join(__dirname, '../node_modules')
  },

  entry: pkg.entry,

  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['babel']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap&-restructuring!' +
        'autoprefixer-loader'
      )
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap!' +
        'autoprefixer-loader!' +
        'less?sourceMap'
      )
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=image/svg+xml'
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.IgnorePlugin(/^xhr2$/)
  ],
  externals: {
    jquery: 'window.jQuery',
    react: 'window.React'
  }
};
