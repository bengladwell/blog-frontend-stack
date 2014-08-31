"use strict";

var gulp = require('gulp'),
  mbf = require('main-bower-files'),
  concat = require('gulp-concat'),
  handlebars = require('gulp-handlebars'),
  wrap = require('gulp-wrap'),
  browserify = require('gulp-browserify'),
  jshint = require('gulp-jshint'),
  less = require('gulp-less'),
  livereload = require('gulp-livereload');
  
gulp.task('handlebars', function () {
  return gulp.src('src/hbs/**/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('module.exports = Handlebars.template(<%= contents %>);'))
    .pipe(gulp.dest('src/js/templates/'));
});

gulp.task('browserify', ['handlebars'], function () {
  gulp.src(['src/js/app.js'])
    .pipe(browserify())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('bower', function () {
  gulp.src(mbf({includeDev: true}).filter(function (f) { return f.substr(-2) === 'js'; }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('jshint', function () {
  return gulp.src(['src/js/**/*.js', '!src/js/templates/**/*.js'])
    .pipe(jshint(process.env.NODE_ENV === 'development' ? {devel: true} : {}))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('bootstrap', function () {
  gulp.src('bower_components/bootstrap/fonts/*')
    .pipe(gulp.dest('public/fonts/vendor/bootstrap/'));
});

gulp.task('less', function () {
  gulp.src('src/less/main.less')
    .pipe(less({
      compress: process.env.NODE_ENV === 'development' ? false : true
    }))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('watch', ['handlebars', 'browserify', 'less'] ,function () {
  gulp.watch('src/js/**/*.js', [ 'browserify' ]);
  gulp.watch('src/less/**/*.less', [ 'less' ]);
  gulp.watch('src/hbs/**/*.hbs', [ 'handlebars' ]);
  livereload.listen();
  gulp.watch('public/**').on('change', livereload.changed);
});
