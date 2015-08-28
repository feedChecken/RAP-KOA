var webpackConfig = require('./webpack.config');
var webpack = require('webpack');
var socketio = require('socket.io');
var serverConfig = require('./serverConfig');
module.exports = function*(server) {
  var args = {};
  args.hot = true;
  var io;
  var _stats;
  if (args.hot) {
    var entry = webpackConfig.entry;
    for (var k in entry) {
      entry[k] = [].concat(entry[k], [
        'webpack/hot/only-dev-server',
        'webpack-dev-server/client?http://localhost:'+serverConfig.port
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
  compiler.plugin('done', function(stats) {
    printResult(stats);
    if (args.hot) {
      _sendStats(io.sockets, stats.toJson());
      _stats = stats;
    }
  });
  var invalidPlugin = function() {
    if (io) io.sockets.emit("invalid");
  };
  compiler.plugin("compile", invalidPlugin);
  compiler.plugin("invalid", invalidPlugin)
  if (args.hot) {
    io = socketio.listen(server, {
      "log level": 1
    });
    io.sockets.on("connection", function(socket) {
      socket.emit("hot");
      if (!_stats) return;
      _sendStats(socket, _stats.toJson(), true);
    }.bind(this));
  }
}

function _sendStats(socket, stats, force) {
  if (!force && stats && (!stats.errors || stats.errors.length === 0) && stats.assets && stats.assets.every(function(asset) {
      return !asset.emitted;
    })) return socket.emit("still-ok");;
  socket.emit("hash", stats.hash);
  if (stats.errors.length > 0)
    socket.emit("errors", stats.errors);
  else if (stats.warnings.length > 0)
    socket.emit("warnings", stats.warnings);
  else
    socket.emit("ok");
}

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
