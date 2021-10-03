const http = require('http');
const url = require('url');
const fs = require('fs');
http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const filename = "." + q.pathname;
    fs.appendFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end(q.pathname + " 404 Not Found!");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`${myQuery.params['text']}`);
        return res.end();
    });
}).listen(8888);
