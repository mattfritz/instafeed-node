var gulp     = require('gulp'),
    mocha    = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    exit     = require('gulp-exit');

var sources = {
  test: ['./test/*.js'],
  app:  ['app.js']
};

var testRunner = function() {
  gulp.src('./test/test.js', {read: false})
    .pipe(mocha({
      reporter: 'progress',
      timeout: 2000
    }))
    .pipe(exit());
};

gulp.task('default', ['test']);

gulp.task('test', function() {
  return testRunner();
});

gulp.task('coverage', function() {
  return gulp.src(sources.app)
    .pipe(istanbul())
    .on('finish', function() {
      testRunner();
    });
});


