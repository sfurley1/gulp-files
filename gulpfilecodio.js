"use strict";

//insert the name of your bootstrap theme
var themeName = 'steve';

//All these plugins need installing inside terminal run the line below
//npm install gulp-less gulp-sourcemaps gulp-autoprefixer gulp-concat browser-sync gulp-shell --save-dev


var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    shell = require('gulp-shell'),
    browserSync = require('browser-sync').create();


 gulp.task('less', function () {
  gulp.src('./sites/all/themes/' + themeName + '/less/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(prefix({ map: true }))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./sites/all/themes/' + themeName + '/css'))
    .pipe(browserSync.stream())

    //optional clear caches or add any other shell commands
    //.pipe(shell([
      //'drush cache-clear theme-registry'
    //]));
});

// run
// gulp watch
// This will watch for less style changes and update your css file plus add autoprefixes plus adds source mapping so you can locate header.less etc
// Source mapping is not supported in firebug
 gulp.task('watch', function() {
   browserSync.init({
         ui: {
            port: 3000
        }
    });
   gulp.watch('./sites/all/themes/' + themeName + '/less/**/*.less', ['less'], function(){
    browserSync.reload();
   });

 })
