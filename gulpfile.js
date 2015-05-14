var gulp = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

var paths = {
    'app': {
        'sass': 'app/sass/**/*.scss',
        'html': 'app/**/*.html'
    },
    'dist': {
        'sass': 'dist/css',
        'html': 'dist'
    }
}

gulp.task('clean', function() {
    del(paths.dist.html);
});

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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist.sass))
        .pipe(reload({ stream: true }));
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: paths.dist.html
    });

    gulp.watch(paths.app.sass, ['sass']);
    gulp.watch(paths.app.html, ['html']).on('change', reload);
});

gulp.task('default', ['html', 'sass']);
