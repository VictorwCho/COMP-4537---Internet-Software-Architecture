const http = require('http');
const dates = require('./modules/utils');
let url = require('url');

http
  .createServer(function (req, res) {
    let myQuery = url.parse(req.url, true);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
      `<font color="blue">
    Hello ${myQuery.query['name']},
    What a beautiful day. Server current date and time is ${dates.getDate()}
    </font>`
    );
    res.end();
  })
  .listen(3000);
