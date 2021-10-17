const http = require('http');
const url = require('url');
const GET = "GET";
const POST = "POST";
const endPointRoot = "/api/definitions/";

let dictionary = [];
let requestNum = 0;

http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
  });

  if (req.method == GET) {
    const q = url.parse(req.url, true);
    const splitPath = q.pathname.split("/");
    const word = splitPath.pop();

    if (dictionary.some(dictionaryWord => dictionaryWord.word == word)) {
      let dictionaryObject = dictionary.find(dictionaryObject => dictionaryObject.word == word);
      res.end(`${dictionaryObject.word}: ${dictionaryObject.definition}`);
    } else {
      res.end(`Request #: ${requestNum}<br> The word: "${word}" was not found!"`);
    }

  };


  if (req.method == POST && req.url === endPointRoot) {
    let jsonObj;
    req.on('data', function (chunk) {
      if (chunk != null) {
        jsonObj = JSON.parse(chunk);
        dictionary.push(jsonObj);

      // message to notify word was saved.
      res.end(`Request #: ${requestNum}<br> The word: ${jsonObj.word} was stored successfully!`);

      } else if (dictionary.some(dictionaryWord => dictionaryWord.word == jsonObj.word)) {
      console.log("it exists");

      // If the word already exists, it returns a message. ( e.g. 'blah blah ' already exists.
      res.end(`Request #: ${requestNum}<br> The word: ${jsonObj.word} already exists!`);
    }
    });
  };
  requestNum += 1;

}).listen(3000);
