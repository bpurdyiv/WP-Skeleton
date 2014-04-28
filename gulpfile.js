var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    clean = require('gulp-clean'),
    notify = require("gulp-notify"),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload');
;

var paths = {
  assetsSrc: 'app/content/themes/PurdyTheme/assets/src/',
  assetsBuild: 'app/content/themes/PurdyTheme/assets/build/',
};

gulp.task('styles', function() {
  return gulp.src(paths.assetsSrc + 'styles/**/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .on("error", notify.onError())
    .on("error", function (err) {
      gutil.beep();
      this.emit('end');
    })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(paths.assetsBuild + 'styles'))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.assetsBuild + 'styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(paths.assetsSrc + 'js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.assetsBuild + 'js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.assetsBuild + 'js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src(paths.assetsSrc + 'imgs/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.assetsBuild + 'imgs'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(paths.assetsBuild, {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch(paths.assetsSrc + 'styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(paths.assetsSrc + 'js/*.js', ['scripts']);

  // Watch image files
  gulp.watch(paths.assetsSrc + 'imgs/**/*', ['images']);

  // Create LiveReload server
  var server = livereload();

  gulp.watch(paths.assetsBuild + '**').on('change', function(file) {
        server.changed(file.path);
    });

});
