var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync  = require('browser-sync').create();
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");



// Minify index
gulp.task("htmlFile", function() {
    gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
});

// Minify sass 
gulp.task("sass", function() {
    gulp.src("src/sass/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});


// Watch Sass & Serve
gulp.task("browserSync", ["sass"], function() {
    browserSync.init({
        server:{
            baseDir:"./src"
        } 
        
        });
});



// Minify images

gulp.task("imageMin", function() {
    gulp.src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/reSizeImage"))
});

// Minify JavaScript

gulp.task("scrpit", function() {
    gulp.src("src/scrpit/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/scrpit"))
});


 gulp.task("default", ["browserSync","sass", "imageMin","htmlFile", "scrpit"]);
gulp.task("watch",function(){
    gulp.watch(["src/scss/*.scss"], ["sass"]);
    gulp.watch("src/*.html").on("change", browserSync.reload);
    gulp.watch("src/images/*" , ["imageMin"])
    gulp.watch("src/scrpit/*.js", ["scrpit"])
    
})
 