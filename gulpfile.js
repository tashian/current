var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [
        path.join(__dirname, 'less', 'includes'),
        path.join(__dirname, 'node_modules'),
      ]
    }))
    .pipe(gulp.dest('./public/css'));
});
