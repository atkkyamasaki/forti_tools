var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sass = require('gulp-ruby-sass');
// var pleeease = require('gulp-pleeease');
var autoprefixer = require('gulp-autoprefixer');
require('es6-promise').polyfill();

gulp.task('default', 'autoprefixer');
// gulp.task('default', ['autoprefixer', 'partials']);

gulp.task('html', function () {
  return gulp.src('./**/*.html');
});

gulp.task('autoprefixer', ['sass'], function() {
  return gulp.src('css/*.css')
      .pipe(autoprefixer({
           browsers: ['Chrome >= 57', 'Edge >= 38', 'Firefox >= 52', 'ie >= 11', 'Opera >= 43'],
           cascade: false
       }))
      .pipe(gulp.dest('css/'));
});

// gulp.task('pleeease', ['sass'], function() {
//   return gulp.src('css/*.css')
//       .pipe(pleeease({
//           autoprefixer: {
//               browser: ['last 2 versions', 'ie >= 11', 'chrome >= 55', 'firefox >= 52', 'opera >= 44']
//           },
//           minifier: false,
//           rem: false
//       }))
//       .pipe(gulp.dest('css/'));
// });

gulp.task('sass', function() {
    sass('sass/main.scss', {style: 'expanded'})
        .pipe(gulp.dest('./css/'));
});

gulp.task('partials', function() {
    return gulp.src(['partial/**/*.html', 'js/directive/**/*.html'])
        .pipe($.tap(function(file) {
            file.contents = Buffer.concat([
                new Buffer("    $templateCache.put('" + file.path.replace(__dirname, '').replace(/\\/g, '/') + "', "),
                new Buffer("'" + file.contents.toString().replace(/\r?\n/g, '').replace(/>\s+</g, '><').replace(/'/g, "\\'") + "'"),
                new Buffer(");")
            ]);
        }))
        .pipe($.order())
        .pipe($.concat('partials.js'))
        .pipe($.tap(function(file) {
            file.contents = Buffer.concat([
                new Buffer("angular.module(appName).run(function($templateCache) {\n"),
                file.contents,
                new Buffer("\n});")
            ]);
        }))
        .pipe(gulp.dest('js/'));
});