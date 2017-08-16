var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var inject = require('gulp-inject-string');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var fs = require('fs');
var rename = require('gulp-rename');
var gulpStylelint = require('gulp-stylelint');
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');

gulp.task('build', function(callback) {
  return runSequence(
    'lint:scss',
    'clean',
    'scss',
    'image:resize',
    'image:minify',
    'image:inject',
    'inject:html',
    'inject:css',
    'html:min',
    'inject:build-comment',
    'rename-and-move',
    callback
  );
});

gulp.task('clean', function() {
  return del([
    'build',
    'index.html'
  ])
});

gulp.task('image:resize', function() {
  return gulp.src('assets/large-photos/**')
    .pipe(imageResize({
        height : 200,
        imageMagick: true
    }))
    .pipe(gulp.dest('assets/small-photos'));
});

gulp.task('image:minify', function() {
  return gulp.src('assets/**/*')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true})
    ],{
      verbose: true
    }))
    .pipe(gulp.dest('assets'))
});

gulp.task('image:inject', function() {
  var photoFilenames = fs.readdirSync('assets/large-photos');
  var sortedPhotoFilenames = photoFilenames.sort();
  var imageElementString = '';
  var imageElementTemplate = fs.readFileSync('src/photo-element-template.html').toString();

  for (var index = 0; index < sortedPhotoFilenames.length; index++) {
    var filename = sortedPhotoFilenames[index];

    if (!filename || filename.startsWith('.')) {
      continue;
    }

    var imageElement = imageElementTemplate.replace(/filename/g, filename);
    imageElementString += imageElement;
  }

  return gulp.src('src/main.html')
    .pipe(inject.replace('<!-- Inject Photos  -->', imageElementString))
    .pipe(gulp.dest('build'));
});

gulp.task('lint:scss', function() {
  return gulp
    .src('src/**/*.scss')
    .pipe(gulpStylelint({
        reporters: [{
            formatter: 'string', console: true
        }]
    }));
})

gulp.task('scss', function() {
  return gulp.src('src/**/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('build'));
});

gulp.task('html:min', function() {
  return gulp.src('build/shell.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('inject:html', function() {
  return gulp.src('src/shell.html')
    .pipe(inject.after('<body>', fs.readFileSync('build/main.html').toString()))
    .pipe(gulp.dest('build'));
});

gulp.task('inject:css', function() {
  return gulp.src('build/shell.html')
    .pipe(inject.after('<style>', fs.readFileSync('build/main.css').toString()))
    .pipe(gulp.dest('build'));
});

gulp.task('inject:build-comment', function() {
  return gulp.src('build/shell.html')
    .pipe(inject.prepend('<!-- Generated: ' + Date() + ' -->\n'))
    .pipe(gulp.dest('build'));
});

gulp.task('rename-and-move', function() {
  return gulp.src('build/shell.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  return gulp.watch(['src/*'], function() {
    runSequence('build', 'reload');
  });
});

gulp.task('connect', function() {
  return connect.server({
    root: [__dirname],
    livereload: true
  });
});
 
gulp.task('reload', function () {
  return gulp.src('src/**')
    .pipe(connect.reload());
});
 
gulp.task('develop', function() {
  return runSequence(
    'build', 
    'watch', 
    'connect'
  );
});

