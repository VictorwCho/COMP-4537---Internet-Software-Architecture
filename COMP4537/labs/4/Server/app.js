const http = require('http');
const url = require('url');
const GET = "GET";
const POST = "POST";
const endPointRoot = "http://localhost:8085/";

let dictionary = [];

http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
  });

  if (req.method == GET) {
    const q = url.parse(req.url, true);
    console.log(q.query["word"]);
    console.log("The Server recived your request");

  };


  if (req.method == POST) {
    console.log(req);
    const obj = JSON.parse(req.url);
    console.log(obj);
    dictionary.push(obj);
    console.log(dictionary);
    req.on('end', function () {
      res.end("server response was a SUCCESS");

        });

  };

}).listen(8085);
