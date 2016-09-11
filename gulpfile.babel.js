import browserify from 'browserify'
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import sass from 'gulp-sass'
import gutil from 'gulp-util'
import source from 'vinyl-source-stream'

const platforms = [
  ['safari', 'safari.safariextension'],
  ['chromium', 'chromium']
]
const entries = ['start', 'end']

new Map(platforms).forEach((dir, platform) => {
  entries.forEach(entry => {
    gulp.task(`build:${platform}:js:${entry}`, () => {
      browserify({entries: `${entry}.js`})
        .transform('babelify')
        .transform('envify')
        .bundle()
        .on('error', (e) => {
          gutil.log(`${e.name}: ${e.message}`)
        })
        .pipe(source(`${entry}.js`))
        .pipe(gulp.dest(`platform/${dir}`))
    })
  })
  
  const jsTasks = entries.map(e => `build:${platform}:js:${e}`)
  gulp.task(`build:${platform}:js`, jsTasks)
  
  gulp.task(`build:${platform}:css`, () => {
    gulp.src('index.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest(`platform/${dir}`))
  })
  
  gulp.task(`watch:${platform}`, () => {
    gulp.watch('*.js', [`build:${platform}:js`])
    gulp.watch('index.scss', [`build:${platform}:css`])
  })
})
