var gulp = require('gulp');
var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');

/**
 * Serve
 */
gulp.task('serve', ['index'], function (done) {
    browserSync({
        open: true,
        port: 9000,
        server: {
            baseDir: 'wwwroot/',
            index: "index.html",

            /*
            middleware: function (req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              next();
            }
            */

            middleware: [
              modRewrite([
                '^([^.]+)$ /index.html [L]'
              ])
            ]
        }
    }, done);
});