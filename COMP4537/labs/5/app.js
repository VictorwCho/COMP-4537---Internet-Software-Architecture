const express = require('express');
const mysql = require('mysql');
const PORT = process.env.port || 8888;
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'robertwi_root',
  password: 'comp4537lab5',
  database: 'robertwi_comp4537_lab5',
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.post('/comp4537/labs/5/api', (req, res) => {
  let body = '';

  req.on('data', function (chunk) {
    if (chunk != null) {
      body += chunk;
    }
  });
  req.on('end', function () {
    const sqlQuery = `INSERT INTO players (name, score) VALUES ('${JSON.parse(body).name}', ${JSON.parse(body).score})`;
    connection.query(sqlQuery, (sqlErr, sqlRes) => {
      console.log(sqlErr, sqlRes);
      console.log(sqlRes.message);
      if (sqlErr) {
        res.status(404).send('Error in the SQL Request');
        throw err;
      }
      res.status(200).send(sqlRes.message);
    });
  });
});

app.get('/comp4537/labs/5/api', (req, res) => {
  connection.query('SELECT * FROM players', (err, result) => {
    if (err) throw err;
    res.send("Here's everything in the database named players: " + JSON.stringify(result));
  });
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log('Listening on port', PORT);
});
