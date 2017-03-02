var express	   = require('express');
var load 	   = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');


module.exports = function() {

	var app = express();

	app.use(express.static('./app/public'));

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json()); // habilitar para receber dados em formato JSON.
	app.use(bodyParser.json());
	app.use(expressValidator());

	load('routes', {cwd: 'app'}) //cwd(current work directory)
		.then('infra')
		.into(app);

	app.use(function(req, res, next) {
		res.status(404).render('exceptions/404');
		next();
	});
/*
	app.use(function(error, req, res, next) {
		res.status(500).render('exceptions/500');
		next();
	});
*/
	return app;
}