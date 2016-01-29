'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
connect = require('gulp-connect'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
shell = require('gulp-shell'),
del = require('del'),
gulpIf = require('gulp-if'),
argv = require('yargs').argv,
sourcemaps = require('gulp-sourcemaps'),
concat = require('gulp-concat'),
browserSync = require('browser-sync'),
image = require('gulp-image');

var SITE_DIR='./_site';

gulp.task('assets:styles', function(){
  var options = {includePaths: ['./node_modules/bootstrap/scss']};
  if(argv.prod){
    options.outputStyle = 'compressed';
  }
  return gulp.src(['./assets/styles/*.scss', './node_modules/githubjs/src/github.css'])
    .pipe(sourcemaps.init())
    .pipe(sass(options).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

gulp.task('assets:scripts', function(){
  return gulp.src([
    './node_modules/underscore/underscore.js',
    './node_modules/githubjs/src/github.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './assets/scripts/*.js'
  ]).pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulpIf(argv.prod, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./js'));
});

gulp.task('assets:images', function(){
  gulp.src('./assets/images/*')
    .pipe(image())
    .pipe(gulp.dest('./images'));
});

gulp.task('assets', ['assets:styles', 'assets:scripts', 'assets:images']);

gulp.task('jekyll:build', ['assets'], shell.task(['bundle exec jekyll build --trace']));

gulp.task('build', ['jekyll:build']);

gulp.task('rebuild', ['build'], browserSync.reload)

// watch and reload
gulp.task('serve', ['build'], function() {
  browserSync({
    server: {
      baseDir: SITE_DIR,
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  });
  gulp.watch(
    ['./assets/**/*', './_posts/**/*', './_layouts/**/*', './_includes/**/*', './_pages/**/*', './*.html'],
    ['rebuild']);
});

gulp.task('clean', function(){
  return del([SITE_DIR, './js', './css', './images']);
});

gulp.task('default', ['serve']);
