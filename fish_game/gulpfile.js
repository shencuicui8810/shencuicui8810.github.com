var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('concat',function(){
	return gulp.src('js/*.js')
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('build'));
});
gulp.task('uglify',['concat'],function(){
	return gulp.src('build/main.min.js')
		.pipe(uglify())
		.pipe(gulp.dest('build'));
});
gulp.task('default',['concat','uglify']);








