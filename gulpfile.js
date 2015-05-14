var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify')

var paths = {
    'app': {
        'sass': 'app/sass/**/*.scss',
        'js:app': 'app/js/**/*.js',
        'html': 'app/**/*.html'
    },
    'dist': {
        'sass': 'dist/css',
        'js:app': 'dist/js',
        'js:vendor': 'dist/js',
        'html': 'dist'
    },
    'js:vendor': [
        'bower_components/handlebars/handlebars.min.js',
        'bower_components/handlebars/handlebars.min.runtime.js',
        'bower_components/history.js/scripts/compressed/history.js'
    ]
}

gulp.task('clean', function() {
    del(paths.dist.html);
});

gulp.task('js:vendor', function() {
    return gulp.src(paths['js:vendor'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(paths.dist['js:vendor']))
});

gulp.task('js:app', function() {
    return gulp.src(paths.app['js:app'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.dist['js:app']))
});

gulp.task('js', ['js:vendor', 'js:app']);

gulp.task('html', function() {
    var options = {
        conditionals: true,
        spare: true
    };

    return gulp.src(paths.app.html)
        .pipe(minifyHTML(options))
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task('sass', function () {
    gulp.src(paths.app.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist.sass))
        .pipe(reload({ stream: true }));
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: paths.dist.html
    });

    gulp.watch(paths.app.sass, ['sass']);
    gulp.watch(paths.app['js:app'], ['js:app']).on('change', reload);
    gulp.watch(paths.app.html, ['html']).on('change', reload);
});

gulp.task('default', ['html', 'sass', 'js:vendor', 'js:app']);
