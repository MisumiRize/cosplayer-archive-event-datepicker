import browserify from 'browserify'
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import sass from 'gulp-sass'
import gutil from 'gulp-util'
import source from 'vinyl-source-stream'

const platforms = ['chromium']
const entries = ['start', 'end']

entries.forEach((entry) => {
  gulp.task(`build:js:${entry}`, () => {
    browserify({entries: `${entry}.js`})
      .transform('babelify')
      .transform('envify')
      .bundle()
      .on('error', (e) => {
        gutil.log(`${e.name}: ${e.message}`)
      })
      .pipe(source(`${entry}.js`))
      .pipe(gulp.dest('platform/chromium'))
  })
})

const jsTasks = entries.map(e => `build:js:${e}`)
gulp.task('build:js', jsTasks)

gulp.task('build:css', () => {
  gulp.src('index.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('platform/chromium/index.css'))
})

gulp.task('watch', () => {
  gulp.watch('*.js', ['build:js'])
  gulp.watch('index.scss', ['build:css'])
})
