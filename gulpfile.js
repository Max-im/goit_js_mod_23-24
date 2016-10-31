var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	spritesmith	 = require('gulp.spritesmith'), // Подключаем сборщик спрайтов
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('src/sass/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку src/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});



gulp.task('sprite', function(){
	var spriteData = gulp.src('src/myFiles/sprite/*.png') //путь к картинкам для спрайта
		.pipe(spritesmith({
			imgName: 'iconSprite.png',
			cssName: 'spriteStyle.scss',
			algorithm: 'binary-tree'
		}));
	spriteData.img.pipe(gulp.dest('src/img')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('src/sass')); // путь, куда сохраняем стили
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - src
		}
		// ,
		// notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		// 'src/libs/jquery/dist/jquery.min.js', // Берем jQuery
		// 'src/libs/jcarousel/dist/jquery.jcarousel.min.js', // Берем jCarousel
		//'src/libs/temp.js', // Берем Шаблонизатор Джона Резника
		// 'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('src/js')); // Выгружаем в папку src/js
});


// переделать указывать путь руками как в js!!!
gulp.task('css-libs', function() {
	return gulp.src([
//	'src/libs/magnific-popup/dist/magnific-popup.css' // Берем Magnific Popup
	]) // Выбираем файл для минификации
		.pipe(concat('libs.min.css')) //Собираем их в кучу в новом файле libs.min.css
		.pipe(cssnano()) // Сжимаем
		.pipe(gulp.dest('src/css')); // Выгружаем в папку src/css
});

gulp.task('min-css',['css-libs'], function(){
	return gulp.src('src/css/style.css')
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('src/css')); // Выгружаем в папку src/css
})

gulp.task('watch', ['browser-sync', 'min-css', 'sass', 'scripts', 'sprite' ], function() {
	gulp.watch('src/sass/**/*.scss', ['sass', browserSync.reload]); // Наблюдение за sass файлами в папке sass
	gulp.watch('src/css/style.css', ['min-css']); // Наблюдение за css файлами в папке css
	gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('src/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') // Берем все изображения из src
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});





gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'src/css/style.min.css',
		'src/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

	var buildJSON = gulp.src('src/json/*.json') // Переносим josn в продакшен
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
