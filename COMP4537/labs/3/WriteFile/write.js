const http = require('http');
const url = require('url');
const fs = require('fs');
http
  .createServer(function (req, res) {
    const myQuery = url.parse(req.url, true);
    const filename = '.' + myQuery.pathname;
    fs.appendFile(filename, `${myQuery.query.text} <br>` + '\n', function (err) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end(filename + ' 404 Not Found!');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`wrote some data === ${myQuery.query.text}`);
      return res.end();
    });
  })
  .listen(3000);
