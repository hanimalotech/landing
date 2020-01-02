var gulp = require("gulp");
var watch = require("gulp-watch");
var sass = require("gulp-sass");
var prefix = require("autoprefixer");
var plumber = require("gulp-plumber");
// var sourcemaps = require('gulp-sourcemaps');
// var livereload = require('gulp-livereload');
// var local      = false;
var browserSync = require("browser-sync").create();
var postcss = require("gulp-postcss");

gulp.task("sass", function() {
  return (
    gulp
      .src(["src/scss/style.scss"])
      .pipe(plumber())
      .pipe(
        postcss([prefix()], {
          syntax: require("postcss-scss")
        })
      )
      // .pipe(prefix({
      //   browsers: ['last 2 versions'],
      //   cascade: true
      // }))
      .pipe(
        sass({
          outputStyle: "compressed"
        }).on("error", sass.logError)
      )
      .pipe(gulp.dest("assets/css"))
      .pipe(browserSync.stream())
  );
});

gulp.task("default", ["serve"]);

gulp.task("watch", function() {
  gulp.watch("src/scss/*.scss", ["sass"]);
});

gulp.task("serve", ["sass"], function() {
  browserSync.init({
    proxy: "http://hanimalo-landing:8888"
  });

  gulp.watch("src/scss/*.scss", ["sass"]);
  gulp.watch("**/*.html").on("change", browserSync.reload);
});
