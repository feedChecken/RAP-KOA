'use strict';
var socketio = require('socket.io');
var http = require('http');
var assign = require('object-assign');
var join = require('path').join;
var path = require('path');
var printResult = require('./lib/printResult');
var config = require('./config/serverConfig');
config.port = config.port || 8000;
config.cwd = __dirname;
var staticPath = path.join(__dirname,'/public')
var io;
var koa = require('koa');
var app = koa();
var _stats;
var router = require('./lib/route');
var compiler = require('./lib/webpackServer')(io);

app.use(require('koa-static')(staticPath));
app.use(require('./lib/middleware')(compiler));

app.use(router.routes());

app.use(require('koa-serve-index')(config.cwd, {
  hidden: true,
  view: 'details'
}));




var server = http.createServer(app.callback());
server.listen(config.port, function() {
  console.log('listened on %s', config.port);
});




if (config.hot) {
  io = socketio.listen(server, {
    "log level": 1
  });
  io.sockets.on("connection", function(socket) {
    socket.emit("hot");
    if (!_stats) return;
    _sendStats(socket, _stats.toJson(), true);
  }.bind(this));
  compiler.plugin('done', function(stats) {
    printResult(stats);
    if (config.hot) {
      _sendStats(io.sockets, stats.toJson());
      _stats = stats;
    }
  });


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
}
