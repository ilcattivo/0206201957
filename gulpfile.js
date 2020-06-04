const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

// Static Server + watching scss/html files
gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: 'src',
    },
  });
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('styles', function () {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
