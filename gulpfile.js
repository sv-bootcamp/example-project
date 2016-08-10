var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var jasmine = require('gulp-jasmine');
var connect = require('gulp-connect');
var opn = require('opn');

gulp.task('build', function() {
   return browserify({
      entries: 'src/client/scripts/main.jsx',
      extensions: ['.jsx'],
      debug: true
   })
   .transform(babelify)
   .bundle()
   .pipe(source('bundle.js'))
   .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);