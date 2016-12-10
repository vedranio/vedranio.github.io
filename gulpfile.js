var gulp = require('gulp');
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

// optimise images
gulp.task('images', function(){
  return gulp.src('images/**/*.+(png|jpg)')
  .pipe(imagemin())
  .pipe(gulp.dest('images'))
})


//compile less to css
gulp.task('less', function(){
  return gulp.src('less/**/*.less')		//grab all less files
    .pipe(less()) 							          //run the less task on them
    .pipe(gulp.dest('css'))				    //and put the output in the css folder
    .pipe(browserSync.reload({				    //let gulp inject css into the browser
      stream: true
    }))
})

//compile components' less to css
gulp.task('component_less', function(){
  return gulp.src('js/components/**/*.less')    //grab the less file for each component
    .pipe(less())                               //run the less task on them
    .pipe(gulp.dest('js'))                     //and put the output in the css folder
    .pipe(browserSync.reload({                  //let gulp inject css into the browser
      stream: true
    }))
})

gulp.task('compile_js', function () {
  return gulp.src('js/components/**/*.js')
        .pipe(babel({presets: [ "react" ]}))
        .pipe(gulp.dest('js'));
});


//watch files for changes
gulp.task('serve', ['component_less','less', 'compile_js', 'images', 'browserSync'], function(){
  gulp.watch('less/**/*.less', ['less']); 
  gulp.watch('js/components/**/*.less',['component_less']);
  gulp.watch('js/components/**/*.js',['compile_js']);
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



