"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    del = require("del"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    streamqueue = require("streamqueue"),
    cleanCSS = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    merge = require("merge-stream"),
    htmlreplace = require("gulp-html-replace"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create();

// Copy Bootstrap SCSS(SASS) from node_modules to /assets/scss/bootstrap
gulp.task("bootstrap:scss", function () {
    return gulp
        .src(["./node_modules/bootstrap/scss/**/*"])
        .pipe(gulp.dest("./assets/scss/bootstrap"));
});

// Compile SCSS(SASS) files
gulp.task(
    "scss",
    gulp.series("bootstrap:scss", function compileScss() {
        return gulp
            .src(["./assets/scss/*.scss"])
            .pipe(
                sass
                    .sync({
                        outputStyle: "expanded"
                    })
                    .on("error", sass.logError)
            )
            .pipe(autoprefixer())
            .pipe(gulp.dest("./assets/css"));
    })
);

// Minify CSS
gulp.task(
    "css:minify",
    gulp.series("scss", function cssMinify() {
        return gulp
            .src("./assets/css/app.css")
            .pipe(cleanCSS())
            .pipe(
                rename({
                    suffix: ".min"
                })
            )
            .pipe(gulp.dest("./assets/css"))
            .pipe(browserSync.stream());
    })
);

// Minify Js
gulp.task('js:minify', function () {
    return streamqueue({ objectMode: true },
        gulp.src('./assets/js/loadjs.min.js'),
        gulp.src('./assets/js/intersection-observer.js'),
        gulp.src('./assets/js/jquery-3.5.0.min.js'),
        gulp.src('./assets/js/jquery-ui.min.js'),
        gulp.src('./assets/js/bootstrap.min.js'),
        gulp.src('./assets/js/slick.min.js'),
        gulp.src('./assets/js/lazysizes.min.js'),
        gulp.src('./assets/js/app.js')
    ).pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./assets/js'))
        .pipe(browserSync.stream());
});

// Replace HTML block for Js and Css file upon build and copy to /dist
gulp.task("replaceHtmlBlock", function () {
    return gulp
        .src(["*.html"])
        .pipe(
            htmlreplace({
                js: "assets/js/app.min.js",
                css: "assets/css/app.min.css"
            })
        )
        .pipe(gulp.dest("dist/"));
});

// Configure the browserSync task and watch file path for change
gulp.task("watch", function browserDev(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(
        [
            "assets/scss/*.scss",
            "assets/scss/**/*.scss",
            "!assets/scss/bootstrap/**"
        ],
        gulp.series("css:minify", function cssBrowserReload(done) {
            browserSync.reload();
            done(); //Async callback for completion.
        })
    );
    gulp.watch(
        "assets/js/app.js",
        gulp.series("js:minify", function jsBrowserReload(done) {
            browserSync.reload();
            done();
        })
    );
    gulp.watch(["*.html"]).on("change", browserSync.reload);
    done();
});

// Default task
gulp.task("default", gulp.series("watch"));
