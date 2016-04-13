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
    image = require('gulp-image'),
    cache = require('gulp-cached'),
    remember = require('gulp-remember');

var SITE_DIR = './_site';

gulp.task('assets:styles', function () {
    var options = {includePaths: ['./node_modules/bootstrap/scss']};
    if (argv.prod) {
        options.outputStyle = 'compressed';
    }
    return gulp.src([
        './assets/styles/*.scss',
        './node_modules/githubjs/src/github.css'
    ]).pipe(sourcemaps.init())
        .pipe(sass(options).on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});

gulp.task('assets:scripts', function () {
    return gulp.src([
        './assets/scripts/polyfills/*.js',
        './node_modules/swagger-ui/dist/lib/lodash.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/swagger-ui/dist/lib/jquery.ba-bbq.min.js',
        './node_modules/swagger-ui/dist/lib/jquery.slideto.min.js',
        './node_modules/swagger-ui/dist/lib/jquery.wiggle.min.js',
        './node_modules/swagger-ui/dist/lib/handlebars-2.0.0.js',
        './node_modules/swagger-ui/dist/lib/backbone-min.js',
        './node_modules/swagger-ui/dist/lib/js-yaml.min.js',
        './node_modules/swagger-ui/dist/swagger-ui.js',
        './node_modules/swagger-ui/dist/lib/highlight.9.1.0.pack.js',
        './node_modules/swagger-ui/dist/lib/highlight.9.1.0.pack_extended.js',
        './node_modules/swagger-ui/dist/lib/jsoneditor.min.js',
        './node_modules/swagger-ui/dist/lib/marked.js',
        './node_modules/swagger-ui/dist/lib/swagger-oauth.js',
        './assets/scripts/app.js'
    ]).pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulpIf(process.env.JEKYLL_ENV == 'production', uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./js'));
});

gulp.task('assets:images', function () {
    return gulp.src([
        './assets/images/*',
        './node_modules/swagger-ui/dist/images/collapse.gif',
        './node_modules/swagger-ui/dist/images/expand.gif',
        './node_modules/swagger-ui/dist/images/explorer_icons.png',
        './node_modules/swagger-ui/dist/images/logo_small.png',
        './node_modules/swagger-ui/dist/images/throbber.gif',
        './node_modules/swagger-ui/dist/images/wordnik_api.png'
    ]).pipe(cache('images'))
        .pipe(image())
        .pipe(gulp.dest('./images'));
});

gulp.task('assets', ['assets:styles', 'assets:scripts', 'assets:images']);

gulp.task('jekyll:build', ['assets'], shell.task(['bundle exec jekyll build']));

gulp.task('build', ['jekyll:build']);

gulp.task('rebuild', ['build'], browserSync.reload)

// watch and reload
gulp.task('serve', ['build'], function () {
    browserSync({
        server: {
            baseDir: SITE_DIR,
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    });
    var watcher = gulp.watch(['./assets/**/*', './_posts/**/*', './_layouts/**/*', './_includes/**/*', './pages/**/*', './*.html', './*.json', './_data/**/*'], ['rebuild']);
    watcher.on('change', function (evt) {
        if (evt.type === 'deleted') {
            delete cache.caches['images'][evt.path];
            remember.forget('images', evt.path);
        }
    });
});

gulp.task('clean', function () {
    return del([SITE_DIR, './js', './css', './images']);
});

gulp.task('default', ['serve']);
