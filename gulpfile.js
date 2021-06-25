const   {task, watch, src, dest, parallel, series} = require('gulp'),
        browserSync = require('browser-sync'),
        sass = require('gulp-sass'),
        uglify = require('gulp-uglify'),
        babel = require('gulp-babel'),
        fileinclude = require('gulp-file-include'),
        prefixer = require('gulp-autoprefixer'),
        imagemin = require('gulp-imagemin'),
        sourcemaps = require('gulp-sourcemaps'),
        cssnano = require('gulp-cssnano'),
        rimraf = require('rimraf'),
        rename = require('gulp-rename'),
        stream = browserSync.stream
        

//----------------------------------- Path ----------------------------//

const  path = {
    build: {
        html: 'build/',
        css: 'build/css',
        img: 'build/img',
        js: 'build/js',
        fonts: 'build/fonts',
    },
    src: {
        html: 'src/html/*.html',
        scss: 'src/scss/*.scss',
        img: 'src/img/**',
        js: 'src/js/*.js',
        jsLib: 'src/js-lib/*.js',
        fonts: 'src/fonts/**'
    },
    watch: {
        html: 'src/html/**/*.html',
        scss: 'src/scss/**',
        js: 'src/js/**',
        img: 'src/img/**',
        fonts: 'src/fonts/**'
    },
    clean: './build'
};

//----------------------------------- Html ----------------------------//

const html = function() {
    return src(path.src.html)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest(path.build.html))
        .pipe(stream())
};

//----------------------------------- Style ----------------------------//

const styles = function () {
    return src(path.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer()) 
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.build.css))
        .pipe(stream());
};

const styles_without_min = function (){
    return src(path.src.scss)
    .pipe(sass())
    .pipe(prefixer())
    .pipe(dest(path.build.css))
}

//----------------------------------- Fonts ----------------------------//

const fonts = function() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(stream());
};

//----------------------------------- JS ----------------------------//

const main_scripts = function() {
    return src(path.src.jsLib) 
        .pipe(uglify()) 
        .pipe(rename({suffix: '.min'})) 
        .pipe(dest(path.build.js))
        .pipe(stream());
}
const lib_scripts = function() {
    return src(path.src.js) 
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify()) 
        .pipe(rename({suffix: '.min'})) 
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.build.js))
        .pipe(stream());
}

const scripts = parallel( main_scripts , lib_scripts )

const scripts_without_min = function () {
    return src(path.src.js) 
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest(path.build.js))
};

//----------------------------------- Image ----------------------------//

const image = function () {
    return src(path.src.img) 
        .pipe(imagemin())
        .pipe(dest(path.build.img))
        .pipe(stream());
};

//----------------------------------- Serve ----------------------------//

const build = parallel(html, styles, fonts, scripts, image)

const without_min = parallel(styles_without_min, scripts_without_min)

const webserver = function() {
    return browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
};

const serve = () => {
    build()
    webserver()
    watch(path.watch.html, html);
    watch(path.watch.scss, styles);
    watch(path.src.fonts, fonts);
    watch(path.src.js, scripts);
    watch(path.src.img, image);
}

const clean = function (done) {
    rimraf(path.clean, done);
};

//----------------------------------- Exports ----------------------------//

exports.clean = clean

exports.build = series(clean, build, without_min)

exports.default = serve