var gulp = require('gulp');
var path = require('path');
var selenium = require('selenium-standalone');
var webdriver = require('gulp-webdriver');
var webserver = require('gulp-webserver');

var stream;

gulp.task('serve', function() {
  return stream = gulp.src('dist')
    .pipe(webserver({ port: 8080 }));
});

// Runs end-to-end tests using webdriverio and selenium against
// a local application instance.
gulp.task('e2e', ['selenium', 'serve'], function (done) {
  return gulp.src('wdio.conf.js')
    .pipe(webdriver({
      wdioBin:  path.join(__dirname, 'node_modules', '.bin', 'wdio'),
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }))
    .once('end', function () {
      selenium.child.kill();
      stream.emit('kill');
      process.exit();
    });
});

// Start up a selenium server for e2e testing.
gulp.task('selenium', function (done) {
  selenium.install({
    logger: function (message) { }
  }, function (err) {
    if (err) return done(err);

    selenium.start(function (err, child) {
      if (err) return done(err);
      selenium.child = child;
      done();
    });
  });
});