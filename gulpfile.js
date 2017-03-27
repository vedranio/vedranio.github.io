var gulp = require('gulp');
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var sitemap = require('gulp-sitemap');


// optimise images
gulp.task('images', function(){
  return gulp.src('resources/images/**/*.+(png|jpg)')
  .pipe(imagemin())
  .pipe(gulp.dest('resources/images'))
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

//build/update the sitemap
gulp.task('sitemap', function () {
    gulp.src(['./*.html', './side_projects/**/*.html'], {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'http://www.vedran.io'
        }))
        .pipe(gulp.dest('./'));
});



//watch files for changes
gulp.task('serve', ['less', 'images', 'sitemap', 'browserSync'], function(){
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
