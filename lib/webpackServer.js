var webpack = require('webpack');
var config = require('../config/serverConfig');
config.port = config.port || 8000;
config.cwd = __dirname;
var io;

function initWebpack(io){
  var webpackConfig;
  try {
    webpackConfig = require('./webpack.dev.config.js');
  } catch (e) {
    webpackConfig = require('./webpack.dev.config.js');

    var merge = _getMergeConfig();
    if (typeof merge === 'function') {
      webpackConfig = merge(webpackConfig);
    } else {
      webpackConfig = assign({}, webpackConfig, merge);
    }
  }

  if (config.hot) {
    var entry = webpackConfig.entry;
    for (var k in entry) {
      entry[k] = [].concat(entry[k], [
        'webpack/hot/only-dev-server',
        'webpack-dev-server/client?http://localhost:8000'
      ]);
    }

    var loaders = webpackConfig.module.loaders;
    loaders.forEach(function(loader) {
      if (loader.test.toString().indexOf('.jsx') > -1) {
        loader.loaders.unshift('react-hot');
      }
    });

    webpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );

    delete webpackConfig.externals.react;
  }

  var compiler = webpack(webpackConfig);

  var invalidPlugin = function() {
    if (io) io.sockets.emit("invalid");
  };

  compiler.plugin("compile", invalidPlugin);
  compiler.plugin("invalid", invalidPlugin);

  function _getMergeConfig() {
    try {
      return require(join(process.cwd(), 'webpack.dev.config.merge.js'));
    } catch (e) {
      try {
        return require(join(process.cwd(), 'webpack.config.merge.js'));
      } catch (e) {
        return {};
      }
    }
  }
  return compiler;
}



module.exports = initWebpack;
