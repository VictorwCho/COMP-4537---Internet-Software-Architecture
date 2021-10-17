const http = require('http');
const url = require('url');
const GET = "GET";
const POST = "POST";
const endPointRoot = "/api/definitions/";

let dictionary = {};
let requestNum = 0;

http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
  });

  if (req.method === GET) {
    requestNum = requestNum + 1;
    const qObject = url.parse(req.url, true);
    console.log(qObject.query['word']);

    if (qObject.query['word'] in dictionary) {
      res.end(`Request #: ${requestNum}<br> Word: ${qObject.query['word']}<br> Definition: ${dictionary[qObject.query['word']]}`);

    } else {
      res.end(`Request #: ${requestNum}<br> The word: "${qObject.query['word']}" was not found!"`);
    }

  };


  if (req.method == POST && req.url === endPointRoot) {
    let body = "";
    req.on('data', function (chunk) {
      if (chunk != null) {
        body = body + chunk;
      }
    });

    req.on('end', function() {
      let qObject = url.parse(body, true);
      requestNum = requestNum + 1;
      if (qObject.query["word"] in dictionary) {
        res.end(`Request #: ${requestNum}<br> The word: ${qObject.query['word']} already exists!`);
      } else {
        dictionary[qObject.query["word"]] = qObject.query["definition"];
        res.end(`Request #: ${requestNum}<br> The word: ${qObject.query['word']} was stored successfully!`);
        console.log(dictionary);
    }
    });
  };

}).listen(3000);
