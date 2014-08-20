var gulp  = require('gulp'),
    mocha = require('gulp-mocha'),
    exit  = require('gulp-exit');

gulp.task('default', function () {
  return gulp.src('./test/test.js', {read: false})
    .pipe(mocha({
      reporter: 'progress',
      timeout: 2000
    }))
    .pipe(exit());
});
