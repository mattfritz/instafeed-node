var gulp     = require('gulp'),
    mocha    = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    exit     = require('gulp-exit');

var paths = {
      test: ['./test/*.js'],
      app:  ['app.js']
    };

var mochaConfig = {
      reporter: 'progress',
      timeout: 2000
    };

gulp.task('default', ['test']);

gulp.task('test', function() {
  return gulp.src(paths.app)
    .pipe(istanbul())
    .on('finish', function() {
      gulp.src(paths.test)
        .pipe(mocha(mochaConfig))
        .pipe(istanbul.writeReports())
        .pipe(exit());
    });
});


