var express = require('express');
var port = process.env.PORT || 8080;
var app = express();

const http = require('http');

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));


//const server = http.createServer((request, response) => {
//	if(request.method == 'GET') {
//		if(request.url === '/library') {
//			response.statusCode = 200;
//			response.end('"hello": "world"');
//		}
//	}
//}).listen(port);

exports.getJSON = function(options, onResult) {
	var req = http.request(options, function(res) {
		output = '';
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			output += chunk;
		});
		
		res.on('end', function() {
			var obj = JSON.parse(output);
			onResult(res.statusCode, obj);
		});
	});
	
	req.on('error', function(err) {
		res.send(err.message);
	});
}

app.listen(port);
console.log('Server running at http://127.0.0.0:' + port);
