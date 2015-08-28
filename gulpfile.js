var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var objectAssign = require('object-assign');
var livereload = require('gulp-livereload');
var combiner = require('stream-combiner2');
gulp.task('webpack', function(cb) {
    return webpack(objectAssign({}, require('./config/webpack.config.js')), function(err,stats) {
      if (err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
        // output options
      }));
      cb();
    });livereload()
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('./dist');
})

gulp.task('default', ['webpack','watch']);
