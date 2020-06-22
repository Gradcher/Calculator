/* с помощью require мы подключаем модули */
const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpStylelint = require('gulp-stylelint');
const concat = require('gulp-concat');
const minicifJS = require('gulp-terser');
const del = require('del');
const autoPrefixer = require('gulp-autoprefixer');
// const imagemin = require('gulp-imagemin');
// const webp = require('imagemin-webp');
// const extReplace = require('gulp-ext-replace');

const filesScss = [
  './SCSS/**/_StandartProperty.scss',
  './SCSS/**/_Fonts.scss',
  './SCSS/**/styles.scss',
  './SCSS/**/_Media.scss',
];
/* Указываем файлы в том порядке в котором они должны будут объединяться в 1 файл.

media добавится к верхнему файлу style.
Файлы будут добавлятся снизу ввсерх
Первым подключается style так как стоит первым */

const filesJs = ['./src/main.js'];

/* здесь будет обработка всех scss стилей(таск) */
gulp.task(
  'styles',
  () =>
    gulp
      .src(filesScss) // взяли файлы, которые нужно обработать
      .pipe(sass({ includePaths: require('node-normalize-scss').includePaths })) // добавили правила normalize к файлу
      .pipe(
        sass().on('error', sass.logError)
      ) /* sass() - преобразование sass в css
     on('error', sass.logError) - если преобразование
     не получилось то мы получим ошибку, выведенную на экран */
      .pipe(concat('styles.css')) // конкатенация файлов
      .pipe(
        autoPrefixer({
          cascade: false,
        })
      ) // добавляет префиксы для старых браузеров
      .pipe(sass({ outputStyle: 'compressed' })) // делает минификацию css файлов
      .pipe(gulp.dest('./build/CSS')) // поместили новый файл в папку
);
/* gulp.src(filesCss) - то что на входе(точка входа)
  Внутрь помещается файл, который мы хотим обработать */

/* concat('convertCss.css') - файлы будут объединенны в указный файл  */

/* gulp.dest('./build/newСss') - куда размещать на выходе обработанный файл(точка выхода) */

/* .pipe - связующие звено между задачами
(Действие по подключению модулей) */

/* линтер следим за указанным файлом */
gulp.task('lintCss', () =>
  gulp.src('./SCSS/**/*.scss').pipe(
    gulpStylelint({
      reporters: [{ formatter: 'string', console: true }],
    })
  )
);

/* здесь будет обработка всех js скриптов(таск) */
gulp.task('scripts', () =>
  gulp
    .src(filesJs)
    .pipe(concat('finishedJS.js'))
    .pipe(minicifJS())
    .pipe(gulp.dest('./build/JS'))
);

gulp.task('clean', () => del(['./build/*']));
/* /* - все файлы, каталоги внутри папки build */
/* очищает все в указанной папке */

// gulp.task('exportWebP', () => {
//   return gulp
//     .src('./Images/*')
//     .pipe(
//       imagemin([
//         webp({
//           quality: 100,
//         }),
//       ])
//     )
//     .pipe(extReplace('.webp'))
//     .pipe(gulp.dest('./build/compressWepb/'));
// });
// /*  **-любые файлы */

gulp.task('watch', () => {
  gulp.watch('./SCSS/**/*.scss', gulp.series('styles'));
  gulp.watch('./src/**/*.js', gulp.series('scripts'));
  gulp.watch('./SCSS/**/*.scss', gulp.series('lintCss'));
  // gulp.watch('./Images/**', gulp.series('exportWebP'));
});
// /**/ означает что у нас в folderCSS могут быть вложены другие каталоги

/* gulp.task('task-name', функция);
task-name ссылается на функцию(задачу),
которую мы будем использовать для запуска задачи.
Задачу можно запустить командой gulp task-name в терминале */

/* gulp.series() - нужен для того чтобы последовательно выполнять таски или функции
gulp.parallel() - одновременное выполнение тасков
или функций */

gulp.task(
  'default',
  gulp.series('clean', gulp.parallel('styles', 'scripts'), 'watch')
);
/* gulp.parallel('styles', 'scripts', 'exportWebP'), */

/* Благодаря названию default мы можем вызвать
наш таск просто прописыв gulp */
