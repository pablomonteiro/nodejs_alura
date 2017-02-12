module.exports = function(app) {

	app.get('/', function(req, res) {
		var produtosDAO = new app.infra.ProdutosDAO(app);
		
		produtosDAO.listAll(
			function(results) {
				res.format({
					html: function() {
						res.render('home/index', {lista:results});
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