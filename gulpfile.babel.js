'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';

import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import Cache from 'gulp-file-cache';
import del from 'del';


let cache = new Cache();

const DIR = {
    SRC: 'src',
    DEST: 'dist'
};


const SRC = {
    //JS: DIR.SRC + '/js/*.js',
    //CSS: DIR.SRC + '/css/*.css',
    //HTML: DIR.SRC + '/*.html',
    //IMAGES: DIR.SRC + '/images/*',
    CLIENT: DIR.SRC + '/client/*.js',
    SERVER: DIR.SRC + '/server/*.js'
};

const DEST = {
    JS: DIR.DEST + '/js',
    CSS: DIR.DEST + '/css',
    HTML: DIR.DEST + '/',
    IMAGES: DIR.DEST + '/images',
    CLIENT: DIR.DEST + '/client/*.js',
    SERVER: './'
};


gulp.task('babel', () => {
    return gulp.src(SRC.SERVER)
           .pipe(cache.filter())
           .pipe(babel({
              presets: ['es2015']
           }))
           .pipe(cache.cache())
           .pipe(gulp.dest(DEST.SERVER));
});

gulp.task('babel_client', () => {
    return gulp.src(SRC.CLIENT)
           .pipe(cache.filter())
           .pipe(babel({
              presets: ['es2015']
           }))
           .pipe(cache.cache())
           .pipe(gulp.dest(DEST.CLIENT));
});


gulp.task('start', ['babel', 'babel_client'], () => {
    return nodemon({
        script: 'server.js'
    });
});

gulp.task('clean', () => {
    return del.sync([DIR.DEST]);
});

gulp.task('default', ['clean', 'start'], () => {
    gutil.log('Gulp is running');
});


