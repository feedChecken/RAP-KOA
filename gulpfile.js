var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var objectAssign = require('object-assign');
var livereload = require('gulp-livereload');
var combiner = require('stream-combiner2');
var WebpackDevServer = require('webpack-dev-server');
gulp.task('webpack', function(cb) {
    return webpack(objectAssign({}, require('./config/webpack.config.js')), function(err,stats) {
      if (err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
        // output options
      }));
      cb();
    });livereload()
});
gulp.task("webpack-dev-server", function(callback) {
    var compiler = webpack(objectAssign({}, require('./config/webpack.config.js')));

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
      console.log('00000000000000000');
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/");
        // keep the server alive or continue?
        callback();
    });
});
// gulp.task('watch', function(){
  // livereload.listen();
// })

gulp.task('default', ['webpack-dev-server']);
