module.exports = function(app) {

	app.get('/', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		
		produtosDAO.listAll(
			function(results) {
				res.format({
					html: function() {
						res.render('home/index', {livros:results});
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

}