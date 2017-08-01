var express = require('express');
var port = process.env.PORT || 8080;
var app = express();

const http = require('http');

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

require('./app/routes.js')(app);

const server = http.createServer((request, response) => {
	if(request.method == 'GET') {
		if(request.url === '/library') {
			response.statusCode = 200;
			response.end('"hello": "world"');
		}
	}
}).listen(port);
console.log('Server running at http://127.0.0.0:' + port);
