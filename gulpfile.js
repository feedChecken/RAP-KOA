//引入依赖
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var combiner = require('stream-combiner2');
var path = require('path');
var livereload = require('gulp-livereload');
//引入任务列表
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var less = require('gulp-less');
var del = require('del');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var webpack = require('gulp-webpack');
//引入插件
var LessPluginCleanCSS = require('less-plugin-clean-css'),
  LessPluginAutoPrefix = require('less-plugin-autoprefix'),
  cleancss = new LessPluginCleanCSS({
    advanced: true
  }),
  autoprefix = new LessPluginAutoPrefix({
    browsers: ["last 2 versions"]
  });
//var imagemin = require('gulp-imagemin');

//设置路径
var paths = {
  scripts: ['public/js/**/*.js'],
  images: 'public/img/**/*',
  less: ['src/less/**/*.less'],
  react: ['src/jsx/**/*.jsx'],
};


//配置清理任务
gulp.task('clean', function(cb) {
  // del(['build'], cb);
});

gulp.task('cleancss', function(cb) {
  del(['public/css'], cb);
});
//配置react任务
gulp.task('react', function() {
  var combined = combiner.obj([
    gulp.src(paths.react).pipe(babel()).pipe(browserify({
      insertGlobals: true,
      extensions: ['.jsx']
    })),
    sourcemaps.init(),
    react(),
    sourcemaps.write('.'),
    gulp.dest('public/react')
  ]);
  combined.on('error', console.error.bind(console));
  return combined;
});

//配置webpack任务
gulp.task('webpack', function() {
  var combined = combiner.obj([
    gulp.src('src/jsx/index.jsx'), webpack(require('./webpackconfig')),
    gulp.dest('./public')
  ])
})

//配置less任务
gulp.task('less', function() {
  var combined = combiner.obj([
    gulp.src(paths.less),
    less({
      plugins: [autoprefix, cleancss]
    }),
    sourcemaps.write('.'),
    // concat('result.css'),
    gulp.dest('./public/css'),
    livereload()
  ]);
  combined.on('error', console.error.bind(console));
  return combined;
});
// gulp.task('livereload', function(){
//   livereload();
// });
//配置JS任务
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    //.pipe(concat('all.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'));
});

//配置压缩图片任务
//gulp.task('images', ['clean'], function() {
//    return gulp.src(paths.images)
//        .pipe(imagemin({optimizationLevel: 5}))
//        .pipe(gulp.dest('build/img'));
//});
//配置watch任务
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.react, ['react']);
  // gulp.watch(paths.jade, ['livereload']);
});

//配置默认任务
gulp.task('default', ['less', 'watch']);
