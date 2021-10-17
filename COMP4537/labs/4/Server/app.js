const http = require('http');
const url = require('url');
const GET = "GET";
const POST = "POST";
const endPointRoot = "/api/definitions/";
const resource = "myDictionary/";

let dictionary = [];
let requestNum = 0;

http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
  });
  console.log(req.headers);

  if (req.method == GET) {
    const q = url.parse(req.url, true);
    const splitPath = q.pathname.split("/");
    const word = splitPath.pop();

    if (dictionary.some(dictionaryWord => dictionaryWord.word == word)) {
      let dictionaryObject = dictionary.find(dictionaryObject => dictionaryObject.word == word);
      console.log(dictionaryObject);
      res.end(`${dictionaryObject.word}: ${dictionaryObject.definition}`);
    } else {
      res.end(`Request #: ${requestNum}<br> The word: "${word}" was not found!"`);
    }

  };


  if (req.method == POST && req.url === endPointRoot + resource) {
    let jsonObj;
    req.on('data', function (chunk) {
      if (chunk != null) {
        jsonObj = JSON.parse(chunk);

      // message to notify word was saved.
      res.end(`Request #: ${requestNum}<br> The word: ${jsonObj.word} was stored successfully!`);
      }

    console.log(typeof(jsonObj), jsonObj.word, jsonObj.definition);

    if (dictionary.some(dictionaryWord => dictionaryWord.word == jsonObj.word)) {
      console.log("it exists");

      // If the word already exists, it returns a message. ( e.g. 'blah blah ' already exists.
      res.end(`Request #: ${requestNum}<br> The word: ${jsonObj.word} already exists!`);

    } else {

      dictionary.push(jsonObj);
      console.log(dictionary, "true");

      // Otherwise it adds the word and its definition to your dictionary and returns
      // another appropriate message such as:
      // Request # 102
      // New entry recorded:
      //"Book : A written or printed work consisting of pages glued or sewn together"

      res.end(`Request #: ${requestNum}<br> New Entry Recoreded: <br> + Word:  ${jsonObj.word} <br> Defintion: ${jsonObj.definition}`);
    }
    });
    req.on('end', function () {

      res.end("Server Response: Hey! Your POST request was a great SUCCESS!");
        });

  };
  requestNum += 1;

}).listen(3000);
