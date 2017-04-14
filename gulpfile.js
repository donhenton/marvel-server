var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var del = require('del');
var livereload = require('gulp-livereload');
var tap = require('gulp-tap');
var nodemon = require('gulp-nodemon');
var path = require('path');
var gutil = require('gulp-util');
var exec = require('child_process').exec;
var reportError = new require('./app/utils/utils')().reportError;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var reactify = require('reactify');
var argv = require('yargs').argv;
var notify = require("./build_utils/build_utils").notify;

var appDependencies = require('./package.json').dependencies;
var REACT_FILES = [ './front-end/react/**/*.js'];
var SASS_FILES = [ './sass/**/*.scss']; 
var EJS_FILES = [ './app/views/**/*.ejs']; 
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var envify = require('envify');
var fs = require('fs')
 

/* livereload loads this page you only get one  
 * 
 * the chrome livereload plugin needs to be installed
 * 
 */
var pageURL = 'http://localhost:3000';
var targetLocation = './public_html/built/';

var sassProcess =
        
            
            function () {
                
             return gulp.src('./sass/styles.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            // .pipe(uglifycss())
            .pipe(gulp.dest(targetLocation+'css/'))
            

}
         

gulp.task('sass-dev', function () {
    sassProcess() ;

});

gulp.task('clean', function (  ) {

    del([(targetLocation+"css/"),(targetLocation+"js/")]);

});


function Bundle(envType, debugType) {


    var Bundler = browserify({
        entries: './front-end/react/index.js',
        transform: [["babelify", {"presets": ["es2015", "react"]}], 
            ["envify", {NODE_ENV: envType, 'global': true, '_': 'purge' }]],
        extensions: ['.js'],
        debug: debugType,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    return Bundler
            .bundle()
            .on('error', notify);
}

gulp.task('react-build', function () {
    Bundle('development',true)
           .pipe(source('bundle.js'))
           .pipe(gulp.dest(targetLocation+'js/'))
           .on('finish', function ( ) {
                gutil.log("build bundle end");
                 livereload.reload(pageURL);
            });
    ;
});

 


/////////
///////////////////////////////////////////////////////////////////////////////
/**
 * task for reloading for backend, eg route changes
 * takes 3-4 seconds, will also pick up public css and js
 * but is slower for refresh compared to frontend task for css and public js
 * this run will NOT fire for front end react changes
 * that is done via frontend-watch
 * 
 */
gulp.task('backend', function () {

    livereload.listen();

    nodemon(
            {
                script: 'server.js',
                 
                //  watch: ['*.scss','*.js','*.ejs'],
                ext: 'js, css, ejs',
                ignore: ['./gulpfile.js','./bundle.js'],
                tasks: function (changedFiles)
                {
                    var tasks = [];

                    if (changedFiles)
                    {
                        changedFiles.forEach(function (file)
                        {
                            gutil.log(path.basename(file)+" ");
                            if (path.extname(file) === '.scss' && !~tasks.indexOf('sass-dev'))
                            {
                                tasks.push('sass-dev');
                            }
                            if (path.dirname(file).match('\/front-end\/') && path.extname(file) === '.js' && !~tasks.indexOf('react-build'))
                            {
                                gutil.log("1 "+path.basename(file)+" "+path.dirname(file).match('\/front-end\/'));
                                tasks.push('react-build');
                            }
                            //

                        });
                    }
                    return tasks;

                }

            }).on('restart', function ()
    {
        gutil.log('restarted!');
        livereload.reload(pageURL);

    });
});
/* end backend task ------------------------------------- */
/* begin frontend task ---------------------------------- */
/*
 * 
 * this is a monitoring task which watch changes that DON'T
 * involve server reboot, so will be faster on refresh
 */



 

gulp.task('frontend-watch', function () {

    watch(SASS_FILES, function (events, done) {

        sassProcess()
                .on('finish', function ( ) {
                    gutil.log("processing change in css");
                    livereload.reload(pageURL);
                });

    });

    watch(REACT_FILES, function (events, done) {

        gulp.start('react-build');
    });
    
     watch(EJS_FILES, function (events, done) {

        livereload.reload(pageURL);
    });


});

gulp.task('frontend-serve', function (cb) {
    exec('node ./server.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });

    livereload.listen();

});


gulp.task('backend', ['react-build','backend', 'frontend-watch']);
gulp.task('release', ['sass-build', 'react-build']); // run as gulp release --production=true for compression
gulp.task('default', ['sass-dev','react-build','frontend-watch' ,'frontend-serve' ]);
/* end fronend task ---------------------------------------- */


