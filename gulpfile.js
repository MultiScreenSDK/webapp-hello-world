'use strict';

var gulp        = require('gulp'),
    less        = require('gulp-less'),
    del         = require('del'),
    express     = require('express'),
    path        = require('path');


var mobile = {
    src : {
        less : ['./app/mobile/**/*.less'],
        scripts : ['./app/mobile/**/*.js'],
        static : ['./app/mobile/**/*.{html,js,jpg,png,gif}','./app/shared/**/*.{html,js,jpg,png,gif,ico,map}']
    },
    dest : './dist/mobile'
};

var tv = {
    src : {
        less : ['./app/tv/**/*.less'],
        scripts : ['./app/tv/**/*.js'],
        static : ['./app/tv/**/*.{html,js,jpg,png,gif}','./app/shared/**/*.{html,js,jpg,png,gif,ico,map}']
    },
    dest : './dist/tv'
};

gulp.task('styles', function () {

    gulp.src(mobile.src.less)
        .pipe(less({}))
        .pipe(gulp.dest(mobile.dest));
    gulp.src(tv.src.less)
        .pipe(less({}))
        .pipe(gulp.dest(tv.dest));
});

gulp.task('scripts', function () {

    gulp.src(mobile.src.scripts)
        .pipe(gulp.dest(mobile.dest));
    gulp.src(tv.src.scripts)
        .pipe(gulp.dest(tv.dest));
});

gulp.task('static', function () {

    gulp.src(mobile.src.static)
        .pipe(gulp.dest(mobile.dest));
    gulp.src(tv.src.static)
        .pipe(gulp.dest(tv.dest));
});


gulp.task('clean', function (cb) {
    del(['dist/**'], cb);
});


gulp.task('server',['build'], function(){
    var app = express();
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(path.join(__dirname, './dist')));
    app.listen(app.get('port'), function(){
        console.log('development server listening on port ' + app.get('port'));
    });
});

gulp.task('watch', ['server'], function () {
    gulp.watch([mobile.src.less, tv.src.less], ['styles']);
    gulp.watch([mobile.src.scripts, tv.src.scripts], ['scripts']);
    gulp.watch([mobile.src.static, tv.src.static], ['static']);
});


gulp.task('clean', function() {
    return gulp.src( paths.dist , { read: false }).pipe(clean());
});

gulp.task('build', ['styles','scripts','static']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
