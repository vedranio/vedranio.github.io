var gulp = require('gulp');
var less = require('gulp-less');
// var browserSync = require('browser-sync').create();
var browserSync = require('browser-sync');


//compile less to css

gulp.task('less', function(){
  return gulp.src('src/less/**/*.less')		//grab all less files
    .pipe(less()) 							//run the less task on them
    .pipe(gulp.dest('src/css'))				//and put the output in the css folder
    .pipe(browserSync.reload({				//let gulp inject css into the browser
      stream: true
    }))
})



//watch files for changes

gulp.task('serve', ['less', 'browserSync'], function(){

  // browserSync.init({
  //   server: "src"
  // });



  //getting browsersync to work
  gulp.watch('src/less/**/*.less', ['less']); 
  gulp.watch('src/*.html', browserSync.reload); 
  // gulp.watch("src/*.html").on('change', browserSync.reload); //alternative
  // gulp.watch('src/js/**/*.js', browserSync.reload);
  // add other watchers here
})


//update the browser

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
  })
})



