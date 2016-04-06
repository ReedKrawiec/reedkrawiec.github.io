var gulp = require('gulp'),
    babelify = require('babelify'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    image = require('gulp-image'),
    rename = require("gulp-rename");

gulp.task('babel', function () {
  return gulp.src(['babel/script.js'])
      .pipe(browserify({
          transform:['babelify']
      }))
      .pipe(uglify())
      .pipe(rename("bundled.min.js"))
      .pipe(gulp.dest('script'));
});
gulp.task('sass', function(){
  return gulp.src('sass/style.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('css'));
});
gulp.task('image_optimization', () => {
	return gulp.src('images_dev/*.*')
		.pipe(image())
		.pipe(gulp.dest('images_prod'));
});
gulp.task('default',['babel','sass']);
