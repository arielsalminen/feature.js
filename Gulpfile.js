var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');

gulp.task('build', function () {

	return gulp.src(['./feature.js'])
		
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify('feature.min.js'))

		.pipe(rename({
	      extname: '.min.js'
	    }))
    	
    	.pipe(gulp.dest('./'));
});


