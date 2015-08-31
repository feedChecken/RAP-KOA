var webpackConfig = require('./webpack.config');
var webpack = require('webpack');
var socketio = require('socket.io');
var serverConfig = require('./serverConfig');
var printResult = require('./printResult');
var http = require('http');
module.exports = function(server, app) {
  var args = {};
  args.hot = true;
  var io;
  var _stats;
  if (args.hot) {
    var entry = webpackConfig.entry;
    for (var k in entry) {
      entry[k] = [].concat(entry[k], [
        'webpack/hot/only-dev-server',
        'webpack-dev-server/client?http://' + serverConfig.host + ':' + serverConfig.port
      ]);
    }
    var loaders = webpackConfig.module.loaders;
    loaders.forEach(function(loader) {
      if (loader.test.toString().indexOf('.jsx') > -1) {
        loader.loaders.unshift('react-hot');
      }
    });
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
  compiler.plugin("invalid", invalidPlugin);
  // app.use(require('./middleware')(compiler));
  var webpackMiddleware = require('koa-webpack-dev-middleware');
  app.use(webpackMiddleware(compiler), {
    publicPath: "/public/"
  })
  app.use(require('koa-serve-index')("../public", {
    hidden: true,
    view: 'details'
  }));

  if (args.hot) {
    io = socketio.listen(server, {
      "log level": 1
    });
    io.sockets.on("connection", function(socket) {
      socket.emit("hot");
      if (!_stats) return;
      _sendStats(socket, _stats.toJson(), true);
    }.bind(server));
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
