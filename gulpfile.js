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
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');
;

var paths = {
  assets: 'app/content/themes/PurdyTheme/assets/',
  styles: 'app/content/themes/PurdyTheme/assets/styles',
  js: 'app/content/themes/PurdyTheme/assets/js',
  imgs: 'app/content/themes/PurdyTheme/assets/imgs',
  watch: ['','','']
};

gulp.task('styles', function() {
  return gulp.src(paths.assets + 'styles/src/**/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(paths.assets + 'styles/build'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.assets + 'styles/build'))
    //Delete me if no work
    .pipe(livereload())
    .pipe(notify({ message: 'Styles Task Complete'}));
});

gulp.task('scripts', function() {
  return gulp.src(paths.assets + 'js/src/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.assets + 'js/build'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.assets + 'js/build'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src(paths.assets + 'imgs/src/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.assets + 'imgs/build'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
  return gulp.src([paths.assets + 'styles/build', paths.assets + 'js/build', paths.assets + 'imgs/build'], {read: false})
    pipe(clean());
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch(paths.assets + 'styles/src/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(paths.assets + 'js/src/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch(paths.assets + 'imgs/src/**/*', ['images']);

  // Create LiveReload server
  // var server = livereload();

  // // Watch any files in Theme Folder, reload on change
  // gulp.watch([paths.watch]).on('change', function(file) {
  //   server.changed(file.path);
  // });
});
