// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var connect = require('gulp-connect');


// Compile Sass
gulp.task('style', function() {
    return gulp.src('sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('css/'));
});

// Watch Sass File For Changes
gulp.task('watch', function() {
    gulp.watch('sass/main.scss', ['style']);
});

// Use localhost
gulp.task('connect', function() {
  connect.server();
});

gulp.task('default', ['connect', 'watch', 'style']);