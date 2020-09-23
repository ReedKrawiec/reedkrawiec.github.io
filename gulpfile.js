let gulp = require('gulp');
let rename = require('gulp-rename');
let sourcemaps   = require('gulp-sourcemaps');
let connect = require('gulp-connect');

let postcss      = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let sass = require('gulp-sass');
let cssnano = require('cssnano');

let gulp_webpack = require('gulp-webpack');
let webpack = require("webpack");

let imagemin = require("gulp-imagemin")

let css_path = "src/css/*.*";
let css_path_final = 'public/assets/css';

let js_path = "src/scripts/*.*";
let js_path_final = "public/assets/scripts";

let html_path = "src/**/*.html";
let html_path_final = 'public';

let images_path = "src/images/*.*";
let images_path_final = "public/assets/images_prod";

let css = function(){

  return gulp.src(css_path)
  .pipe(rename((path)=>{
    path.basename += ".min";
  }))
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) , cssnano()]))
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest(css_path_final))
  .pipe(connect.reload());
}

let html = function(){
  return gulp.src(html_path)
  .pipe(gulp.dest(html_path_final))
  .pipe(connect.reload());
}

let js = function(){


  return gulp_webpack({
      devtool:"source-map",
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts','.tsx', '.js'],
      },
      entry: {
        main: __dirname + "/src/scripts/main.tsx"
      },
      output: {
          path: __dirname + "/public/scripts",
          filename: "[name].min.js"
      },
      plugins: [
          new webpack.optimize.UglifyJsPlugin({
              mangle:false
          }),
          new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify("dev")
            }
          })
        ],
      module: {
        loaders: [
          {
            test: /\.scss$/,
            loaders: [
                'style',
                'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                'sass'
            ]
          },
          { test: /\.ts$|\.tsx$/, loader: 'ts-loader' },
          {
            test: /\.jsx?$|\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    })
    .pipe(gulp.dest(js_path_final))
    .pipe(connect.reload());
  }
    
gulp.task('images', function(cb) {
    return gulp.src(images_path)
    .pipe(imagemin())
    .pipe(gulp.dest(images_path_final))
})
gulp.task('css', css)  

gulp.task('html', html)

gulp.task('js', js)

//["js","html","css"]
gulp.task('default',gulp.parallel("js","html","css"));

gulp.task('watch',()=>{
  gulp.watch('src/css/**/**.scss',css);
  gulp.watch('src/scripts/**/**.*',js);
  gulp.watch('src/**/**.html',html);
  //gulp.watch('src/assets/**/**.**',['move_assets']);
  connect.server({
    root: 'public',
    livereload: true
  });
});