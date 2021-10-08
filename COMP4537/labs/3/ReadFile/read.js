const http = require('http');
const url = require('url');
const fs = require('fs');
http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const filename = '.' + q.pathname;
    if (!filename.includes("file.txt")) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end(`${filename}` + ' 404 Not Found!');
    }
    fs.readFile('file.txt', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
  }).listen();