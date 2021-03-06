
var express = require('express');
var pg = require("pg");
var app = express();
const bodyParser = require("body-parser");
//const uuidv1 = require('uuid/v1');
var db = require('./config/db');
var routes = require('./routes/routes');

var config = db.connectConfig();

var pool = new pg.Pool(config);

db.initiateDB(pool);

app.use(bodyParser.json());

app.use('/', routes);

app.listen(4000, function () {
  console.log('Server is running.. on Port localhost:4000');
});

// app.get('/', function (req, res, next) {
//   pool.connect(function (err, client, done) {
//     if (err) {
//       console.log("not able to get connection " + err);
//       res.status(400).send(err);
//     }
//     client.query('SELECT * FROM users', function (err, result) {
//       done(); // closing the connection;
//       if (err) {
//         console.log(err);
//         res.status(400).send(err);
//       }
//       res.status(200).send(result.rows);
//     });
//   });
// });

// app.get('/api/v1', function (req, res) {
//   pool.connect(function (err, client, done) {
//     if (err) {
//       console.log("not able to get connection " + err);
//       res.status(400).send(err);
//     }
//     client.query('SELECT * from users', function (err, result) {
//       //call `done()` to release the client back to the pool
//       done();
//       if (err) {
//         console.log(err);
//         res.status(400).send(err);
//       }
//       res.status(200).send(result.rows);
//     });
//   });
// });

// app.post('/api/v1/register', (req, res, next) => {
//   const results = [];
//   // Grab data from http request
//   const data = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, complete: false };
//   // Get a Postgres client from the connection pool
//   pool.connect((err, client, done) => {
//     // Handle connection errors
//     if (err) {
//       done();
//       console.log(err);
//       return res.status(500).json({ success: false, data: err });
//     }
//     // SQL Query > Insert Data
//     client.query('INSERT INTO users(id, firstname, lastname, email, complete) values($0, $1, $2, $3, $4)',
//       [uuidv1(), data.firstname, data.lastname, data.email, data.complete]);
//     // SQL Query > Select Data
//     const query = client.query('SELECT * FROM users ORDER BY id ASC');
//     // Stream results back one row at a time
//     query.on('row', (row) => {
//       results.push(row);
//     });
//     // After all data is returned, close connection and return results
//     query.on('end', () => {
//       done();
//       return res.json(results);
//     });
//   });
// });

// app.post('/api/v1/postcareer', (req, res, next) => {
//   const results = [];
//   // Grab data from http request
//   const data = { text: req.body.text, complete: false };
//   // Get a Postgres client from the connection pool
//   pool.connect((err, client, done) => {
//     // Handle connection errors
//     if (err) {
//       done();
//       console.log(err);
//       return res.status(500).json({ success: false, data: err });
//     }
//     // SQL Query > Insert Data
//     client.query('INSERT INTO careers(id, careertitle, careername, careerStartDate, careerEndDate, careerDescription, complete) values($1, $2, $3, $4, $5, $6)',
//       [uuidv1(), data.careertitle, data.careername, Date.now(), data.careerEndDate, data.careerDescription, data.complete]);
//     // SQL Query > Select Data
//     client.query('SELECT * FROM items ORDER BY id ASC', function (err, result) {
//       done(); // closing the connection;
//       if (err) {
//         console.log(err);
//         res.status(400).send(err);
//       }
//       res.status(200).send(result.rows);
//     });

//   });
// });

// app.get('/api/v1/users', (req, res, next) => {
//   const results = [];
//   // Get a Postgres client from the connection pool
//   pool.connect((err, client, done) => {
//     // Handle connection errors
//     if (err) {
//       done();
//       console.log(err);
//       return res.status(500).json({ success: false, data: err });
//     }
//     // SQL Query > Select Data
//     const query = client.query('SELECT * FROM users ORDER BY id ASC;', function (err, result) {
//       done(); // closing the connection;
//       if (err) {
//         console.log(err);
//         res.status(400).send(err);
//       }
//       res.status(200).send(result.rows);
//     });

//   });
// });

// app.put('/api/v1/user/:userid', (req, res, next) => {
//   const results = [];
//   // Grab data from the URL parameters
//   const id = req.params.userid;
//   // Grab data from http request
//   const data = { text: req.body.text, complete: req.body.complete };
//   // Get a Postgres client from the connection pool
//   pool.connect((err, client, done) => {
//     // Handle connection errors
//     if (err) {
//       done();
//       console.log(err);
//       return res.status(500).json({ success: false, data: err });
//     }
//     // SQL Query > Update Data
//     client.query('UPDATE users SET firstname=($1), lastname=($1), email=($1), complete=($2) WHERE id=($3)',
//       [data.firstname, data.lastname, data.email, data.complete, id]);
//     // SQL Query > Select Data
//     const query = client.query("SELECT * FROM users ORDER BY id ASC", function (err, result) {
//       done(); // closing the connection;
//       if (err) {
//         console.log(err);
//         res.status(400).send(err);
//       }
//       res.status(200).send(result.rows);
//     });

//   });
// });

// app.delete('/api/v1/user/:userid', (req, res, next) => {
//   const results = [];
//   // Grab data from the URL parameters
//   const id = req.params.userid;
//   // Get a Postgres client from the connection pool
//   pool.connect((err, client, done) => {
//     // Handle connection errors
//     if (err) {
//       done();
//       console.log(err);
//       return res.status(500).json({ success: false, data: err });
//     }
//     // SQL Query > Delete Data
//     client.query('DELETE FROM users WHERE id=($1)', [id]);
//     // SQL Query > Select Data
//     var query = client.query('SELECT * FROM items ORDER BY id ASC', function (err, result) {
//       done(); // closing the connection;
//       if (err) {
//         console.log(err);
//         res.status(400).send(err);
//       }
//       res.status(200).send(result.rows);
//     });

//   });
// });

