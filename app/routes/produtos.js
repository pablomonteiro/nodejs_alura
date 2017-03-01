module.exports = function(app) {
	app.get('/produtos', function(req, res) {

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		
		produtosDAO.listAll(
			function(results) {
				res.format({
					html: function() {
						res.render('produtos/lista', {lista:results});
					},
					json: function() {
						res.json(results);
					}
				});
			},
			function(error) {
				console.log(error);
			});
	});

	app.get('/produtos/novo', function(req, res) {
		res.render('produtos/formulario', {errosValidacao:[], produto: {}});
	});

	app.post('/produtos', function(req, res) {

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		var produto = req.body;

		var validadorTitulo = req.assert('titulo', 'Título Obrigatório!').notEmpty();
		var validadorPreco = req.assert('preco', 'Preço Inválido!').isFloat();
		var erros = req.validationErrors();
		if(erros) {
			res.status(400);
			res.format({
				html: function() {
					res.render('produtos/formulario', {errosValidacao:erros, produto: produto});
				},
				json: function() {
					res.json({errosValidacao:erros});
				}
			});
			
			return;
		}
		produtosDAO.save(produto, 
			function(data) {
				res.redirect('/produtos');
			}, 
			function(error) {
				console.log(error);
			});
	});

	return app;
}