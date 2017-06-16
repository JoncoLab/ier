'use strict';

var gulp = require("gulp"),
    autoPrefix = require("gulp-autoprefixer"),
    cssComb = require("gulp-csscomb"),
    image = require("gulp-image"),
    compileSass = require("gulp-sass"),
    rigger = require("gulp-rigger"),
    rimraf = require("rimraf"),
    jsMinify = require("gulp-minify"),
    zip = require("gulp-zip"),
    ftp = require("vinyl-ftp"),
    path = {
        src: {
            html: [
                'src/*.html',
                'src/*.php'
            ],
            css: 'src/styles/*.scss',
            php: 'src/scripts/php/*.php',
            img: 'src/images/*.png',
            svg: 'src/SVG/*.svg',
            fonts: 'src/fonts/*.ttf',
            js: 'src/scripts/js/*.js',
            zip: [
                'build/*',
                'build/**/*',
                'build/**/**/*'
            ],
            assets: [
                'src/assets/*.html',
                'src/assets/*.php'
            ]
        },

        build: {
            html: 'build/',
            css: 'build/styles/',
            php: 'build/scripts/php/',
            img: 'build/images/',
            svg: 'build/SVG/',
            fonts: 'build/fonts/',
            js: 'build/scripts/js/',
            zip: 'zip/',
            assets: 'build/assets'
        },

        watch: {
            pages: [
                'src/*.html',
                'src/*.php',
                'src/fonts/*.ttf',
                'src/admin/*.html',
                'src/admin/*.php',
                'src/assets/*.html',
                'src/assets/*.php'
            ],
            scripts: [
                'src/scripts/php/*.php',
                'src/scripts/js/*.js',
                'src/admin/scripts/php/*.php',
                'src/admin/scripts/js/*.js'
            ],
            styles: [
                'src/styles/*.scss',
                'src/styles/templates/*.scss',
                'src/admin/styles/*.scss',
                'src/admin/styles/templates/*.scss'
            ],
            images: 'src/images/*.png',
            svg: 'src/SVG/*.svg',
            docs: 'src/docs/*'
        },

        ftp: {
            html: '/',
            css: '/styles/',
            php: '/scripts/php/',
            img: '/images/',
            svg: '/SVG/',
            fonts: '/fonts/',
            js: '/scripts/js/',
            assets: '/assets/'
        },

        admin: {
            src: {
                html: [
                    'src/admin/*.html',
                    'src/admin/*.php'
                ],
                css: 'src/admin/styles/*.scss',
                php: 'src/admin/scripts/php/*.php',
                js: 'src/admin/scripts/js/*.js'
            },

            build: {
                html: 'build/admin/',
                css: 'build/admin/styles/',
                php: 'build/admin/scripts/php/',
                js: 'build/admin/scripts/js/'
            },

            ftp: {
                html: '/admin/',
                css: '/admin/styles/',
                php: '/admin/scripts/php/',
                js: '/admin/scripts/js/'
            }
        },

        clean: 'build*'
    },
    connectToFtp = ftp.create({
        host: 'joncolab.ftp.ukraine.com.ua',
        user: 'joncolab_ier',
        pass: '1234',
        parallel: 20
    });

//Збірка html
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(connectToFtp.newer(path.ftp.html))
        .pipe(connectToFtp.dest(path.ftp.html))
        .pipe(gulp.dest(path.build.html));
    gulp.src(path.admin.src.html)
        .pipe(rigger())
        .pipe(connectToFtp.newer(path.admin.ftp.html))
        .pipe(connectToFtp.dest(path.admin.ftp.html))
        .pipe(gulp.dest(path.admin.build.html));
});

//Збірка динамічних підвантажуваних сторінок
gulp.task('assets:build', function () {
    gulp.src(path.src.assets)
        .pipe(rigger())
        .pipe(connectToFtp.newer(path.ftp.assets))
        .pipe(connectToFtp.dest(path.ftp.assets))
        .pipe(gulp.dest(path.build.assets));
});

//Збірка php
gulp.task('php:build', function () {
    gulp.src(path.src.php)
        .pipe(rigger())
        .pipe(connectToFtp.newer(path.ftp.php))
        .pipe(connectToFtp.dest(path.ftp.php))
        .pipe(gulp.dest(path.build.php));
    gulp.src(path.admin.src.php)
        .pipe(rigger())
        .pipe(connectToFtp.newer(path.admin.ftp.php))
        .pipe(connectToFtp.dest(path.admin.ftp.php))
        .pipe(gulp.dest(path.admin.build.php));
});

//Збірка JS
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(connectToFtp.newer(path.ftp.js))
        .pipe(jsMinify({
            ext: {
                min: '.js'
            },
            noSource: '*.js'
        }))
        .pipe(connectToFtp.dest(path.ftp.js))
        .pipe(gulp.dest(path.build.js));
    gulp.src(path.admin.src.js)
        .pipe(connectToFtp.newer(path.admin.ftp.js))
        .pipe(jsMinify({
            ext: {
                min: '.js'
            },
            noSource: '*.js'
        }))
        .pipe(connectToFtp.dest(path.admin.ftp.js))
        .pipe(gulp.dest(path.admin.build.js));
});

//Збірка СSS
gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(connectToFtp.newer(path.ftp.css))
        .pipe(compileSass().on('error', compileSass.logError))
        .pipe(cssComb())
        .pipe(autoPrefix({
            browsers: ['last 40 versions', '> 90%'],
            remove: false
        }))
        .pipe(connectToFtp.dest(path.ftp.css))
        .pipe(gulp.dest(path.build.css));
    gulp.src(path.admin.src.css)
        .pipe(compileSass().on('error', compileSass.logError))
        .pipe(cssComb())
        .pipe(autoPrefix({
            browsers: ['last 40 versions', '> 90%'],
            remove: false
        }))
        .pipe(connectToFtp.newer(path.admin.ftp.css))
        .pipe(connectToFtp.dest(path.admin.ftp.css))
        .pipe(gulp.dest(path.admin.build.css));
});

//Збірка картинок
gulp.task('img:build', function () {
    gulp.src(path.src.img)
        .pipe(image())
        .pipe(connectToFtp.newer(path.ftp.img))
        .pipe(connectToFtp.dest(path.ftp.img))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('svg:build', function () {
    gulp.src(path.src.svg)
        .pipe(connectToFtp.newer(path.ftp.svg))
        .pipe(connectToFtp.dest(path.ftp.svg))
        .pipe(gulp.dest(path.build.svg));
});

//Збірка шрифтів
gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(connectToFtp.newer(path.ftp.fonts))
        .pipe(connectToFtp.dest(path.ftp.fonts))
        .pipe(gulp.dest(path.build.fonts));
});

//Збірка сайту в архів для хостингу
gulp.task('zip:build', function () {
    gulp.src(path.src.zip)
        .pipe(zip('build.zip'))
        .pipe(gulp.dest(path.build.zip));
});

//Загальна збірка
gulp.task('project:build', [
    'html:build',
    'js:build',
    'css:build',
    'img:build',
    'svg:build',
    'php:build',
    'fonts:build',
    'assets:build'
]);

gulp.task('watch', function () {
    gulp.watch(path.watch.pages, [
        'html:build',
        'fonts:build',
        'assets:build'
    ]);
    gulp.watch(path.watch.styles, ['css:build']);
    gulp.watch(path.watch.scripts, [
        'js:build',
        'php:build'
    ]);
    gulp.watch(path.watch.images, ['img:build']);
    gulp.watch(path.watch.svg, ['svg:build']);
    gulp.watch(path.watch.docs, ['docs:build']);
});

//Очистка
gulp.task('clean', function (callback) {
    rimraf(path.clean, callback);
});

//Запуск роботи з проектом
gulp.task('default', ['project:build', 'watch']);