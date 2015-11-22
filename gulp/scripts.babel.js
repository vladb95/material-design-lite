'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import babel from 'gulp-babel';

const $ = gulpLoadPlugins();

const JSSOURCES = [
  // Component handler
  //'src/mdlComponentHandler.js',
  // Base components
  'src/checkbox/checkbox.babel.js',
  'src/icon-toggle/icon-toggle.babel.js',
  // 'src/menu/menu.babel.js',
  'src/progress/progress.babel.js',
  'src/radio/radio.babel.js',
  // 'src/slider/slider.babel.js',
  'src/snackbar/snackbar.babel.js',
  // 'src/spinner/spinner.babel.js',
  // 'src/switch/switch.babel.js',
  // 'src/tabs/tabs.babel.js',
  // 'src/textfield/textfield.babel.js',
  // 'src/tooltip/tooltip.babel.js',
  // Complex components (which reuse base components)
  // And finally, the ripples
  //'src/ripple/ripple.babel.js'
];

gulp.task('scripts', () => {
    gulp.src(JSSOURCES)
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError())
    	.pipe($.sourcemaps.init())
    	.pipe(babel())
      .pipe($.concat('material.js'))
      .pipe($.sourcemaps.write("."))
      .pipe(gulp.dest('dist'));
});
