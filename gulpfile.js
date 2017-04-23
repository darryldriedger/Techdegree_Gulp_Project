"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
cleanCSS = require('gulp-clean-css'),
     del = require('del'),
imagemin = require('gulp-imagemin'),
 connect = require('gulp-connect'),
livereload = require('gulp-livereload')

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/*/*.js',
        'js/*.js',
        ])
    .pipe(maps.init())
    .pipe(concat('all.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task("scripts", ["concatScripts"], function() {
  gulp.src('dist/js/all.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

gulp.task('compileSass', function() {
  return gulp.src('sass/global.scss')
      .pipe(rename('all.scss'))
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/styles'));
});

gulp.task('styles', ['compileSass'], function() {
  return gulp.src('dist/styles/all.css')
      .pipe(cleanCSS())
      .pipe(rename('all.min.css'))
      .pipe(gulp.dest('dist/styles'));
});

gulp.task('images', function () {
  return gulp.src(['images/*','images/*/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/content'));
});

gulp.task('icons', function () {
  return gulp.src(['icons/*','icons/*/*'])
    .pipe(gulp.dest('dist/icons'));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['js/*/*.js','js/*.js'],['scripts']);
});

gulp.task('clean', function() {
  del.sync('dist/*');
});

gulp.task('serve', ['build'], function () {
  connect.server({
    root:'.'
  });
})

gulp.task('build', ['clean','scripts','styles','images','icons'], function () {
});

gulp.task("default", ["build"]);
