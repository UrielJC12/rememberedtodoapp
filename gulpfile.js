const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');

// Compilar SCSS a CSS
function buildStyles() {
    return src('src/scss/**/*.scss', { base: 'src/scss' })
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'));
}

// Vigilar cambios en archivos SCSS
function watchStyles() {
    watch('src/scss/**/*.scss', buildStyles);
    console.log(' Observando cambios en SCSS...');
}

// Compilar una sola vez
exports.build = buildStyles;

// Modo desarrollo: compilar y observar
exports.watch = watchStyles;

// Default: compilar y observar
exports.default = series(buildStyles, watchStyles);