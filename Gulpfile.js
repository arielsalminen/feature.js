var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var jest   = require('gulp-jest').default;

var pjson = require('./package.json');

gulp.task('test', function () {
    return gulp.src('./').pipe(jest());
});

gulp.task('build', ['test'], function () {
  return gulp.src(['./feature.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify('feature.min.js'))
    .pipe(insert.prepend('/*! FEATURE.JS ' + pjson.version + ', http://featurejs.com */\n'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./'));
});
