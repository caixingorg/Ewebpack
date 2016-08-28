var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-csso'),
    sourcemaps = require('gulp-sourcemaps'),
    md5 = require('gulp-md5-plus'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    del = require('del'),
    gulpif = require('gulp-if'),
    sprity = require('sprity'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

gulp.task('clean',function (done) {
    return del(['./public/scripts/**/*','./public/styles/**/*','./public/images/**/*'])
        
});
//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    return gulp.src(['src/views/*.html','src/app/*/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('views'))
        
});
//将图片拷贝到目标目录
gulp.task('copyImages', function (done) {
    return gulp.src(['src/images/**/*'])
    .pipe(gulp.dest('public/images'))
    
});
//雪碧图操作，应该先拷贝图片并压缩合并css
// gulp.task('sprites', function () {
//   return sprity.src({
//     src: './src/images/**/*.{png,jpg}',
//     style: './sprite.css',
//   })
//   .pipe(gulpif('*.png', gulp.dest('./public/images/sprite'), gulp.dest('./public/styles/sprite')))
// });

//用于编译sass
gulp.task('sass', function () {
  return gulp.src('src/styles/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/styles/css'))
    .pipe(gulp.dest('./public/styles'));
});


//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5css',function (done) {
    return gulp.src('src/styles/css/*.css')
        .pipe(md5(10, 'views/*.html'))
        .pipe(gulp.dest('./public/styles'))
        
});

var myDevConfig = Object.create(webpackConfig);
var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("buildjs",function(callback) {
    return devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5js',function (done) {
    return gulp.src('public/scripts/*.js',!'public/scripts/*.js.map')
        .pipe(md5(10, 'views/*.html'))
        .pipe(gulp.dest('./public/scripts'))
        
});


//发布
gulp.task(
  'default',
  gulp.series('clean','fileinclude','sass','md5css','buildjs','md5js')
);

















