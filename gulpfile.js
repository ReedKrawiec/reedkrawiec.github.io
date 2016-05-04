var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    webpack = require('gulp-webpack'),
    autoprefixer = require('gulp-autoprefixer'),
    image = require('gulp-image'),
    pug = require('gulp-pug'),
    plumber = require('gulp-plumber'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require("gulp-rename");

var onError = function(err){
  console.log(err);
};

gulp.task('js',()=> {
  var name_holder;
  return gulp.src(['src/babel/*.*'])
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(rename(function (path) {
        name_holder = path.basename;
      }))
      .pipe(webpack(require ('./webpack.config.js')))
      .pipe(rename(function (path) {
        path.basename = name_holder+".min";
      }))
      .pipe(gulp.dest('public/script'));
});
gulp.task('sass', ()=>{
  return gulp.src('src/scss/*.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename((path)=>{
      path.basename += ".min";
    }))
    .pipe(gulp.dest('public/css'));
});
gulp.task("html",()=>{

  var templateData = {
  firstName: 'Kaanon'
},
options = {
  ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
  partials : {
    footer : '<footer>the end</footer>'
  },
  batch : ['./src/hbs_partials'],
  helpers : {

  }
};
return gulp.src('src/**/**.hbs')
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(handlebars(templateData, options))
  .pipe(rename((path)=>{
    path.extname=".html";
  }))
  .pipe(gulp.dest('public'));
});
gulp.task('image_optimization', () => {
	return gulp.src('src/images_dev/*.*')
		.pipe(image())
		.pipe(gulp.dest('public/images_prod'));
});
gulp.task('default',['js','sass','html']);

gulp.task('watch',()=>{
  gulp.watch('src/scss/**/**.scss',['sass']);
  gulp.watch('src/babel/**/**.*',["js"]);
  gulp.watch('src/**/**.hbs',['html']);
});
