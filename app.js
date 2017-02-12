var app = require('./app/config/express')();

app.listen('3000', function() {
	console.log('Server starting')
})