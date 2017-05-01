let mix = require('webpack-mix').mix

mix.js(['src/assets/js/app.js'],'dist/js/app.js')
	.sass('src/assets/sass/style.scss', 'dist/css/app.css')
