const http = require('http');
const url = require('url');
const fs = require('fs');
http
  .createServer(function (req, res) {
    const myQuery = url.parse(req.url, true);
    const filename = '.' + myQuery.pathname;
    fs.appendFile("file.txt", `${myQuery.query.text} <br>` + '\n', function (err) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end(`${filename} 404 Not Found!`);
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`"${myQuery.query.text}"` + " has been saved in a text file because you triggered a request!");
      return res.end();
    });
  }).listen();
