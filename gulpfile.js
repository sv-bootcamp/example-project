const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');

const serverJsFiles = ['./config/*.js','./src/server/**/*.js'];
const clientJsFiles = ['./src/client/**/*'];

gulp.task('start',function () {
  nodemon({
    script: './dist-server/server.js'
  , ext: ''
  , env: { 'NODE_ENV': process.env.NODE_ENV }
  });
});

gulp.task('lint', () => {
	return gulp.src(serverJsFiles)
		.pipe(eslint({configFile : './.eslintrc.json'}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('babel', () => {
	return gulp.src(serverJsFiles)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist-server'));
});

gulp.task('watch', function(){
	return gulp.watch(serverJsFiles);
});

gulp.task('default' ,[
	'babel',
	'start',
]);