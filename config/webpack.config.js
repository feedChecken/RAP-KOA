var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    index: ['./src/index.js']
  },
  output: {
    path: './dist',
    publicPath: '/assets/',
    filename: "[name].js"
  },
  resolve: {
    root: path.join(__dirname, '../node_modules'),
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    root: path.join(__dirname, '../node_modules')
  },
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
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true
    })
  ]
}
