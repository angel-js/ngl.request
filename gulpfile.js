var gulp = require('gulp');
var eslint = require('gulp-eslint');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('lint', ['clean'], function () {
  var sources = [
    'src/**/*.js',
    'test/**/*.js'
  ];

  return gulp.src(sources)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['lint']);

gulp.task('scripts', ['test'], function () {
  var TARGET_NAME = 'ngl.request';

  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat(TARGET_NAME + '.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename(TARGET_NAME + '.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', [
  'scripts'
]);
