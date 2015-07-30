"use strict";

//npm install --save-dev gulp-shell,

var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'), //part of gulp no need to install
    shell = require('gulp-shell'),
    browserSync = require('browser-sync').create();


 gulp.task('less', function () {
  gulp.src('./sites/all/themes/steve/less/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(prefix({ map: true }))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./sites/all/themes/steve/css'))
    .pipe(browserSync.stream())
    .pipe(shell([
      'drush cache-clear theme-registry'
    ]));
        console.log('caches cleared');

});

 gulp.task('watchless', function() {
    console.log('asdasd cleared');
   browserSync.init({
          proxy: "dev.steve.local"
    });
   gulp.watch('./sites/all/themes/steve/less/**/*.less', ['less']).on('change', browserSync.reload);
    console.log('caches cleared');

 })




 gulp.task("default", ["less"]); 