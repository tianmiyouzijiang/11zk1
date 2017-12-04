var gulp = require('gulp');
var webserver = require('gulp-webserver');
var minijs = require('gulp-uglify');
var minicss = require('gulp-minify-css');
var minihtml = require('gulp-htmlmin');
//使用gulp进行接口的开发；使用gulp启动服务进行页面的渲染；
gulp.task('server',function() {
    gulp.src('.')
        .pipe(webserver({
            port:8080,
            host:'localhost',
            open:true,
            livereload:true,
            fallback:'index.html'
        }))
})
gulp.task('webserver',function() {
    gulp.src('./')
        .pipe(webserver({
            port:8090,
            host:'localhost',
            middleware:function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin',"*")
                if(req.url === '/getdata') {
                    res.end(require('fs').readFileSync('js/data.json'));
                }
            }
        }))
})
//使用gulp实现js文件的压缩；
gulp.task('minijs',function() {
    gulp.src('./js/*.js')
    .pipe(minijs())
    .pipe(gulp.dest('./base/js'))
})
//使用gulp实现css文件的压缩；
gulp.task('minicss',function() {
    gulp.src('./css/*.css')
    .pipe(minicss())
    .pipe(gulp.dest('./base/css'))
})
//使用gulp实现html文件的压缩；
gulp.task('minihtml',function() {
    gulp.src('./*.css')
    .pipe(minihtml())
    .pipe(gulp.dest('./base/html'))
})
gulp.task('default',['server','webserver','minijs','minicss','minihtml'])