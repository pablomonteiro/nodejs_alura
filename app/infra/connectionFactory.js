var pgp = require('pg-promise')({});
var _connectionPath_Production = process.env.DATABASE_URL;
var _connectionPath_Development = 'postgres://postgres:123@localhost:5432/casadocodigo_nodejs';
var _connectionPath_Test = 'postgres://postgres:123@localhost:5432/casadocodigo_nodejs_test';
var client;

function createDBConnection() {
	if(process.env.NODE_ENV == "test") {
		client = pgp(_connectionPath_Test);
	} else if(process.env.NODE_ENV == "development") {
		client = pgp(_connectionPath_Development);
	} else {
		client = pgp(_connectionPath_Production);
	}
	client.connect();
	console.log('Conexão realizada com sucesso!');
}

function getSingleConnection() {
	if(!client) {
		createDBConnection();
	}
	return client;
}

module.exports = function() {
	return getSingleConnection;
}