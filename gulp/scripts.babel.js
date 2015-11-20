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
  // 'src/icon-toggle/icon-toggle.js',
  // 'src/menu/menu.js',
  // 'src/progress/progress.js',
  // 'src/radio/radio.js',
  // 'src/slider/slider.js',
  'src/snackbar/snackbar.babel.js',
  // 'src/spinner/spinner.js',
  // 'src/switch/switch.js',
  // 'src/tabs/tabs.js',
  // 'src/textfield/textfield.js',
  // 'src/tooltip/tooltip.js',
  // Complex components (which reuse base components)
  // And finally, the ripples
  //'src/ripple/ripple.js'
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