const { dest, parallel, series, src, watch } = require('gulp')

// Configuration
const devUrl         = 'http://localhost' // The local devURL for BrowserSync
// const enableTests = false          // Set to false for production

// Gulp plugins
const browserSync = require('browser-sync').create()
const eslint      = require('gulp-eslint')
// const imagemin    = require('gulp-imagemin')
const plumber     = require('gulp-plumber')
const sass = require('gulp-sass')(require('sass'));
const sourcemaps  = require('gulp-sourcemaps')
const webpack     = require('webpack-stream')
//const zip         = require('gulp-zip')

// Source Folders
const baseDir     = '.'
// const imageFiles  = baseDir + '/images/**/*.{png,gif,jpg}'
const jsFiles     = baseDir + '/js/**/*.{js,jsx}'
const sassFiles   = baseDir + '/scss/**/*.scss'

// Build Folders
const buildFolder =      'dist'
const buildCssFolder   = buildFolder + '/css'
// const buildImageFolder = buildFolder + '/images'
const buildJsFolder    = buildFolder + '/js'

// Application State
const state = {
  // Shouldn't try to minify JS if there are errors
  shouldMinify: true
}

/**
 * Handles errors with notifications
 */
const handleErrors = (err) => {
  console.dir(err)
  return false
}

/**
 * Lints the source
 */
const lint = () => {
  state.shouldMinify = true

  return src([jsFiles])
    .pipe(eslint())
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(eslint.format())
    //.pipe(eslint.failAfterError())
    // .on('error', (err) => {
    //   state.shouldMinify = false
    //   return handleErrors(err)
    // })
}

/**
 * Compresses image files for production
 */
// const images = () => {
//   return src(imageFiles)
//     .pipe(plumber({ errorHandler: handleErrors }))
//     .pipe(imagemin())
//     .pipe(dest(buildImageFolder))
//     .pipe(browserSync.stream());
// };

/**
 * Minifies JS files for production
 */
const scripts = series(lint, (cb) => {
  if (!state.shouldMinify) return cb

  return src(baseDir + '/js/main.js')
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(dest(buildJsFolder))
    .pipe(browserSync.stream())
})

/**
 * Compiles SCSS to CSS and minifies CSS
 */
const styles = () => {
  return src(sassFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./', {
      includeContent: true,
      sourceRoot: './'
    }))
    .pipe(dest(buildCssFolder))
    .pipe(browserSync.stream({ watch: '**/*.css' }))
}

/**
 * Starts up browserSync
 */
const sync = () => {
  browserSync.init({
    proxy: devUrl,
    notify: false,
    open: false
  })
}

/**
 * Builds the app
 */
const build = series((cb) => {
  cb()
}, parallel(
  // images,
  styles,
  scripts
))

const cleanup = (cb) => { cb() }

/**
 * Watches for changes in files and does stuffF
 */
const develop = parallel(sync, build, () => {
  watch([jsFiles], scripts)
  watch([sassFiles], styles)
  // const imageWatcher = watch([imageFiles], images)
  // imageWatcher.on('change', fileDeleter)
})

/**
 * Zips up the web folder
 */
// const packUp = series(build, () => {
//   var today = new Date()

//   return src('web/**/*')
//     .pipe(zip(
//       today.getFullYear().toString() + '-' +
//       today.getMonth().toString() + '-' +
//       today.getDay().toString() + '_' +
//       today.getHours().toString() +
//       today.getMinutes().toString() +
//       '-web.zip'
//     ))
//     .pipe(dest('./'))
// })

exports.cleanup = cleanup
// exports.zip     = packUp
exports.develop = develop
exports.build   = build
exports.default = develop
