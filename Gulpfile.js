var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var eslint = require('gulp-eslint');
var jest   = require('gulp-jest').default;

var pjson = require('./package.json');

gulp.task('test', function () {
    return gulp.src('./').pipe(jest());
});

gulp.task('build', ['test'], function () {
  return gulp.src(['./feature.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(uglify())
    .pipe(insert.prepend('/*! FEATURE.JS ' + pjson.version + ', http://featurejs.com */\n'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./'));
});
