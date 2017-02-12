var http = require('http');

var configuracao = {
	hostname: 'localhost',
	port: 3000,
	path: '/produtos',
	method: 'post',
	headers: {
		'Accept': 'application/json',
		'Content-type':'application/json'
		//'Accept': 'text/html'
	}
};

/* Teste para visualizar os dados em json
http.get(configuracao, function(res) {
	console.log(res.statusCode);
	res.on('data', function(body) {
		console.log('Corpo:'+body);
	})
});
*/


//Teste para salvar um produto utilizando formato JSON.
var produto = {
	titulo: '',
	descricao: 'Descricao do livro',
	preco: 12
};

var client = http.request(configuracao, function(res) {
	console.log(res.statusCode);
	res.on('data', function(body) {
		console.log('Corpo:'+body);
	})
});

client.end(JSON.stringify(produto));