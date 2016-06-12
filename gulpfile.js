var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    minifyHtml = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var cssSrc = ['scss/app.scss'],
    cssDest = 'dist/css',
    jsSrc = 'app/js/**/*.js',
    jsDest = 'dist/js',
    fontSrc = 'app/fonts/*',
    fontDest = 'dist/fonts',
    imgSrc = 'app/img/*',
    imgDest = 'dist/img',
    cssRevSrc = 'rev/css',
    condition = true;

// Serve
gulp.task('serve', function () {
    browserSync.init({
        server: './app',
        open: true,
        notify: false
    });

    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch([
        'app/**/*.html',
        'app/js/**/*.js',
        'app/api/**/*.json',
        'app/img/**/*.{png|gif|jpg|jpeg}',
        'app/fonts/iconfont.{svg|ttf}']).on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("app/css"))
        .pipe(reload({stream: true}));
});

gulp.task('revFont', function(){
    return gulp.src(fontSrc)
        .pipe(rev())
        .pipe(gulp.dest(fontDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/font'));
});

gulp.task('revImg', function(){
    return gulp.src(imgSrc)
        .pipe(rev())
        .pipe(gulp.dest(imgDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/img'));
});

//压缩JS/生成版本号
gulp.task('miniJs', function(){
    return gulp.src('app/js/lib/*.js')
        //.pipe(gulpif(
        //    condition, uglify()
        //))
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});
//压缩JS/生成版本号
gulp.task('pubjs', function(){
    return gulp.src('app/js/**/*.js')
        //.pipe(gulpif(
        //    condition, uglify()
        //))
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

//压缩/合并CSS/生成版本号
gulp.task('miniCss', function(){
    return gulp.src('app/css/*.css')
        .pipe(rev())
        .pipe(gulp.dest(cssDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

//压缩Html/更新引入文件版本
gulp.task('miniHtml', function () {
    return gulp.src(['rev/**/*.json', 'app/**/*.html'])
        .pipe(revCollector())
        .pipe(gulpif(
            condition, minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            })
        ))
        .pipe(gulp.dest('dist'));
});
//压缩Html/更新引入文件版本
gulp.task('pubHtml', function () {
    return gulp.src(['rev/**/*.json', 'app/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist'));
});

//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['revFont', 'revImg'],
        ['revCollectorCss'],
        ['miniCss', 'miniJs'],
        ['miniHtml', 'delRevCss'],
        done);
});

//正式构建
gulp.task('build', function (done) {
    runSequence(
        ['revFont', 'revImg'],
        //  ['lintJs'],
        //['revCollectorCss'],
        ['miniCss', 'miniJs'],
        ['miniHtml'],
        done);
});
//正式构建
gulp.task('public', function (done) {
    runSequence(
        ['revFont', 'revImg'],
        //  ['lintJs'],
        //['revCollectorCss'],
        ['miniCss', 'pubjs'],
        ['pubHtml'],
        done);
});


gulp.task('default', ['serve','sass']);

