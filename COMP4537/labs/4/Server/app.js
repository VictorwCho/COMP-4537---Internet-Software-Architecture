const http = require('http');
const url = require('url');
const GET = "GET";
const POST = "POST";

let dictionary = {};
let requestNum = 0;

http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });

  if (req.method == GET) {
    requestNum = requestNum + 1;
    const qObject = url.parse(req.url, true);

    let myData = `${JSON.stringify(qObject.query.word)}`;

    if (myData in dictionary) {
      res.end(`Request #: ${requestNum}<br> Word: ${myData}<br> Definition: ${dictionary[myData]}`);

    } else {
      res.end(`Request #: ${requestNum}<br> The word: ${myData} was not found!"`);
    }
  }

  if (req.method == POST) {
    let body = "";
    let data = "";
    req.on('data', function (chunk) {

        body += chunk;
        data = JSON.parse(body);
    });

    req.on('end', function() {
    const qObject = url.parse(req.url, true);

      requestNum = requestNum + 1;
      let myData = `${JSON.stringify(qObject.query.word)}`;
      let myDeff = `${JSON.stringify(qObject.query.definition)}`;

      if (myData in dictionary) {
        res.end(`Request #: ${requestNum}<br> The word: ${myData} already exists!`);
      }
      else {
        dictionary[myData] = myDeff;
        // res.end(`${JSON.stringify(dictionary.myData)}`);
        res.end(`Request #: ${requestNum}<br> The word: ${myData} was stored successfully!`);
    }
    });
  }
}).listen();
