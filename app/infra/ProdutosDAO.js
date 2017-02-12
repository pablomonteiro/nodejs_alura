function ProdutosDAO(connection) {
	this._connection = connection;
}

ProdutosDAO.prototype.listAll = function(success, error) {
	this._connection.any('SELECT * FROM livros')
		.then(success)
		.catch(error);
}

ProdutosDAO.prototype.save = function(livro, success, error) {
	this._connection.none('INSERT INTO livros(TITULO, DESCRICAO, PRECO) VALUES ($1, $2, $3)', 
					[livro.titulo, livro.descricao, livro.preco])
		.then(success)
		.catch(error);	
}

module.exports = function() {
	return ProdutosDAO;
}