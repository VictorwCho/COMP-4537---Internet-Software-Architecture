const http = require('http');
const url = require('url');
const GET = "GET";
const POST = "POST";
const endPointRoot = "/API/V1/";
const resource = "myDictionary/";

let dictionary = [];

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
      res.end(`Request # 103, word "${word}" not found!"`)
    }

  };


  if (req.method == POST && req.url === endPointRoot + resource) {
    let jsonObj;
    req.on('data', function (chunk) {
      if (chunk != null) {
        jsonObj = JSON.parse(chunk);
      }

    console.log(typeof(jsonObj), jsonObj.word, jsonObj.definition);

    if (dictionary.some(dictionaryWord => dictionaryWord.word == jsonObj.word)) {
      console.log("it exists");

      // If the word already exists, it returns a message. ( e.g. 'blah blah ' already exists.
      // res.writeHead(404, { 'Content-Type': 'text/html' });
      // res.write(`${jsonObj.word} already exists!`);


    } else {
      dictionary.push(jsonObj);
      console.log(dictionary, "true");

      // Otherwise it adds the word and its definition to your dictionary and returns
      // another appropriate message such as:
      // Request # 102
      // New entry recorded:
      //"Book : A written or printed work consisting of pages glued or sewn together"

      // res.writeHead(102, {'Content-Type': 'text/html'});
      // res.write("New Entry Recoreded: <br>" + `${jsonObj.word} ${jsonObj.definition}`)
    }
    });

    req.on('end', function () {

      res.end("Server Response: Hey! Your POST request was a great SUCCESS!");
        });

  };

}).listen(8085);
