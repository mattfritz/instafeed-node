var gulp     = require('gulp'),
    mocha    = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    exit     = require('gulp-exit'),
    nodemon  = require('gulp-nodemon');

var paths = {
      test: ['./test/*.js'],
      app:  ['app.js']
    };

var mochaConfig = {
      reporter: 'progress',
      timeout: 2000
    };

gulp.task('default', ['test', 'serve']);

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
  nodemon({ script: 'server.js', ext: 'html js' })
    .on('change', ['test'])
    .on('restart', function() {
      console.log("Restarted server");
    });
});
