//项目发布构建工具
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    requirejsOptimize = require('gulp-requirejs-optimize'),
    clean = require('gulp-clean');

//每次构建前先清空dist/rev
gulp.task("clean", function(){
    return gulp.src(['dist','rev'])
        .pipe(clean());
});

//打包到对应的文件目录
var sassSrc = ['app/scss/app.scss'],
    cssSrc= ['app/css/*'],
    cssDest = 'dist/css',
    cssRev = 'rev/css',
    jsSrc = 'app/js/**/**/!(common)/controller/*.js',
    jsDest = 'dist/js',
    jsRev = 'rev/js',
    fontSrc = 'app/font/*',
    fontDest = 'dist/font',
    imgSrc = 'app/img/*',
    imgDest = 'dist/img';


//字体发布
gulp.task('fontDist', function(){
    return gulp.src(fontSrc)
        .pipe(gulp.dest(fontDest))
});

//图片发布
gulp.task('imgDist', function(){
    return gulp.src(imgSrc)
        .pipe(gulp.dest(imgDest))
});

//sass编译
gulp.task('sass', function () {
    return gulp.src(sassSrc)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("app/css"))
        .pipe(reload({stream: true}));
});

//css拷贝至发布目录
gulp.task('cssCopy',function(){
        return gulp.src(cssSrc)
            .pipe(gulp.dest(cssDest));
    }
);

//压缩/合并CSS/生成版本号
gulp.task('revCssDist', function(){
    return gulp.src(['app/css/**/*.css','!app/css/bootstrap.min.css','!app/css/bootstrap-theme.min.css','!app/css/font-awesome.min.css'])
        .pipe(rev())
        .pipe(gulp.dest(cssDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(cssRev));
});

// css发布
gulp.task('cssDist',function(done){
    runSequence('sass','cssCopy','revCssDist',done);
});


//第三方插件拷贝至发布目录
gulp.task('pluginCopy', function(){
    return gulp.src('app/js/lib/**/*')
        .pipe(gulp.dest('dist/js/lib/'))
});

//config.js拷贝压缩至发布目录
gulp.task('configJsCopy',function(){
    return gulp.src('app/js/business/config.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/business'))
});

//合并requirejs依赖
gulp.task('rjs', function () {
    return gulp.src(jsSrc)
        .pipe(requirejsOptimize({
            mainConfigFile: 'app/js/business/config.js',
            exclude:['layer1','handlebars','jquery','jquery.cookie','bootstrap','laydate','echarts','validate','pagination','text']
        }))
        .pipe(gulp.dest(jsDest));
});

//压缩JS/生成版本号
gulp.task('revJsDist', function(){
    return gulp.src(['dist/js/**/*.js','!dist/js/lib/**/*.js'])
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(jsRev));
});

// js发布
gulp.task('jsDist',function(done){
    runSequence('pluginCopy','configJsCopy','rjs','revJsDist',done);
});

//html发布
gulp.task('htmlDist', function () {
    return gulp.src(['rev/**/*.json', 'app/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist'));
});


//启动开发服务
gulp.task('devServer', function () {
    browserSync.init({
        server: './app',
        open: true,
        notify: false
    });

    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch([
        'app/**/*.html',
        'app/js/**/*.js',
        'app/api/**/*.json',
        'app/img/**/*.{png|gif|jpg|jpeg}',
        'app/fonts/iconfont.{svg|ttf}']).on('change', browserSync.reload);
});

//启动发布服务
gulp.task('distServer', function () {
    browserSync.init({
        server: './dist',
        open: true,
        notify: false
    });

});

//正式构建
gulp.task('build',function(done){
    runSequence(
        'clean','fontDist','imgDist','cssDist','jsDist','htmlDist',done);
});

//发布版本运行
gulp.task('runDist',function(done){
        runSequence('build','distServer',done);
    }
);



