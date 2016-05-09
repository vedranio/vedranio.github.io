var gulp = require('gulp');
var less = require('gulp-less');
// var browserSync = require('browser-sync').create();
var browserSync = require('browser-sync');


//compile less to css
gulp.task('less', function(){
  return gulp.src('less/**/*.less')		//grab all less files
    .pipe(less()) 							          //run the less task on them
    .pipe(gulp.dest('css'))				    //and put the output in the css folder
    .pipe(browserSync.reload({				    //let gulp inject css into the browser
      stream: true
    }))
})


//watch files for changes
gulp.task('serve', ['less', 'browserSync'], function(){
  gulp.watch('less/**/*.less', ['less']); 
  gulp.watch('*.html', browserSync.reload); 
})


//update the browser
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
  })
})


