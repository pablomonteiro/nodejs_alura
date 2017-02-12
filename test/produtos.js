var express = require('../app/config/express')();
var request = require('supertest')(express);

describe("Produto Controller", function() {

	process.env.NODE_ENV = "test";

	beforeEach(function(done) {
		var conn = express.infra.connectionFactory();
		conn.any('DELETE FROM Livros')
			.then(done())
			.catch(function(error) {
				console.log(error)
			});
	});

	it("#listagem json", function(done) {
        request.get("/produtos")
        	.set("Accept", "application/json")
        	.expect("Content-type", /json/)
        	.expect(200, done);
	});

	it("#cadastro de produto sem titulo", function(done) {
		request.post("/produtos")
			.send({titulo:"", descricao:"Descrição do livro"})
			.expect(400, done);
	});

	it("#cadstrando produto válido", function(done) {
		request.post("/produtos")
			.send({titulo: "Titulo 1", descricao:"descricao do livro", preco:2.4})
			.expect(302, done);
	});

});