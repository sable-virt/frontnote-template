var config = require('./frontplate.json');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});
var browser = require('browser-sync');

var path = {
    html: {
        src: config.BASE_PATH + '*.html',
        dest: config.DEST_PATH
    },
    //sass
    sass: {
        src: config.BASE_PATH + '/sass/**/*.scss',
        dest: config.BASE_PATH + '/assets/css'
    },
    //js
    js: {
        src: config.BASE_PATH + '/js/**/*.js',
        dest: config.BASE_PATH + '/js'
    },
    asset: {
        src: config.BASE_PATH + '/assets/**/*',
        dest: config.DEST_PATH + '/assets'
    },
    release: {
        src: config.DEST_PATH + '/**/*',
        dest: '../frontnote/template'
    }
};

/**
 * CSS系タスク
 */
gulp.task('style', function () {
    return gulp.src(path.sass.src)
        .pipe($.plumber())
        .pipe($.sass(config.sass))
        .pipe($.autoprefixer(config.autoprefixer.browser))
        .pipe(gulp.dest(path.sass.dest))
        .pipe(browser.reload({stream: true}));
});


/**
 * JS系タスク
 */
gulp.task('script', function () {
    return gulp.src(path.js.src)
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
        .pipe(browser.reload({stream: true}));
});

/**
 * HTML系タスク
 */
gulp.task('html', function () {
    return gulp.src(path.html.src)
        .pipe($.plumber())
        .pipe($.htmlhint())
        .pipe($.htmlhint.reporter())
        .pipe(browser.reload({stream: true}));
});

/**
 * サーバー起動
 */
gulp.task('serv', function () {
    browser.init(null, {
        server: {
            baseDir: config.BASE_PATH
        }
    });
});
/**
 * サーバーリロード
 */
gulp.task('reload', function () {
    browser.reload();
});

gulp.task('clean', function () {
    return gulp.src(path.asset.dest)
        .pipe($.clean());
});

gulp.task('build',['clean','style'], function() {
    return gulp.src(path.asset.src)
        .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
        .pipe($.if('*.css', $.cssmin()))
        .pipe($.if('*.png|*.jpg|*.gif', $.imagemin()))
        .pipe(gulp.dest(path.asset.dest));
});

gulp.task('release', function() {
    return gulp.src(path.release.src)
        .pipe(gulp.dest(path.release.dest));
});

/**
 * デフォルトタスク
 */
gulp.task('default', ['serv'], function () {
    gulp.watch(path.js.src, ['script','reload']);
    gulp.watch(path.sass.src, ['style']);
    gulp.watch(path.html.src, ['html']);
});