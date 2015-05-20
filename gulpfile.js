var gulp       = require('gulp');
var del        = require('del');
var rename     = require('gulp-rename');
var babel      = require('gulp-babel');
var plumber    = require('gulp-plumber');
var replace    = require('gulp-regex-replace');
var stripDebug = require('gulp-strip-debug');

gulp.task('lib-clean', function(cb){
    del('./lib', cb);
});

gulp.task('lib-compile', ['lib-clean'], function () {
    return gulp.src([
            './src/**/*.js',
            './src/**/*.jsx',
            '!./src/preprocessor.js',
            '!./src/__tests__/**'
        ])
        .pipe(plumber())
        .pipe(babel({}))
        .pipe(replace({regex: "\\.jsx", replace: ''}))
        .pipe(rename({ extname: '.js' }))
        //.pipe(stripDebug())
        .pipe(gulp.dest('./lib'))
    ;
});

gulp.task('lib', ['lib-clean', 'lib-compile']);