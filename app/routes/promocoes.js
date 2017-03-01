module.exports = function(app) {

	app.get('/promocoes/form', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.listAll(
			function(results) {
				res.format({
					html: function() {
						res.render('promocoes/promocoes', {livros:results, message: ""});
					},
					json: function() {
						res.json(results);
					}
				});
			},
			function(error) {
				console.log(error);
				res.render('promocoes/promocoes');
				res.status = 500;
			});
	});

	app.post('/promocoes', function(req, res) {
		var promocao = req.body;
		app.get('io').emit('promocaoNova', promocao);
		res.redirect('/promocoes/form');
	});
}