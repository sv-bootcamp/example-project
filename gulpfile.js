var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var jasmine = require('gulp-jasmine');
var connect = require('gulp-connect');
var opn = require('opn');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task('build', function() {
   return browserify({
      entries: 'src/client/Main.js',
      extensions: ['.js'],
      debug: true
   })
   .transform(babelify)
   .bundle()
   .pipe(source('bundle.js'))
   .pipe(gulp.dest('client'));
});

gulp.task('startserver', function() {
    return connect.server({
      port: 3000,
      root: './src/client/',
      fallback: 'index.html'
    });
});

gulp.task('openbrowser', function() {
    return opn('http://localhost:3000');
});

gulp.task('default', function() {
   runSequence( 'build', 'startserver', 'openbrowser' );
});
