var gulp     = require('gulp'),
    mocha    = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    exit     = require('gulp-exit'),
    config   = require('config'),
    app      = require('./app');

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

gulp.task('serve', function() {
  var port = config.get('App.Port');
  app.listen(port);
  console.log('Server is running at http://localhost:' + port);
});
