var pg = require("pg");
var pool = new pg.Pool(config);
var db = require('./config/db');
var config = db.connectConfig();
const uuidv1 = require('uuid/v1');

module.exports.auth = {
  authenticate: function (req, res) {

  }
}

module.exports.users = {
  getUsers: function (req, res) {
    //do something
    pool.connect(function (err, client, done) {
      if (err) {
        console.log("not able to get connection " + err);
        res.status(400).send(err);
      }
      client.query('SELECT * from users', function (err, result) {
        //call `done()` to release the client back to the pool
        done();
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    });
  },
  getUser: function (req, res) {
    //do something
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.userid;
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }

      // SQL Query > Select Data
      var query = client.query('SELECT * FROM users WHERE id=($1) ORDER BY id ASC', [id], function (err, result) {
        done(); // closing the connection;
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });

    });
  },
  postUsers: function (req, res) {
    //do something
    const results = [];
    // Grab data from http request
    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email, complete: false
    };
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }
      // SQL Query > Insert Data
      client.query('INSERT INTO users(id, firstname, lastname, email, complete) values($0, $1, $2, $3, $4)',
        [uuidv1(), data.firstname, data.lastname, data.email, data.complete]);
      // SQL Query > Select Data
      const query = client.query('SELECT * FROM users ORDER BY id ASC');
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });
  },
  delUser: function (req, res) {
    // Grab data from the URL parameters
    const id = req.params.userid;
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }
      // SQL Query > Delete Data
      client.query('DELETE FROM users WHERE id=($1)', [id]);
      // SQL Query > Select Data
      var query = client.query('SELECT * FROM items ORDER BY id ASC', function (err, result) {
        done(); // closing the connection;
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });

    });
  }
}

module.exports.careers = {
  getCareers: function (req, res) {
    //do something
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }
      // SQL Query > Select Data
      client.query('SELECT * FROM careers ORDER BY id ASC', function (err, result) {
        done(); // closing the connection;
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });

    });
  },
  getCareer: function (req, res) {
    //do something
    const id = req.params.careerid;
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }
      // SQL Query > Select Data
      client.query('SELECT * FROM careers careerid=($1) ORDER BY id ASC', [id], function (err, result) {
        done(); // closing the connection;
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });

    });
  },
  postCareers: function (req, res) {
    //do something
    const results = [];
    // Grab data from http request
    const data = {
      careertitle: req.body.careertitle, careername: req.body.careername,
      careerEndDate: req.body.careerEndDate,
      careerDescription: req.body.careerDescription, complete: false
    };
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }
      // SQL Query > Insert Data
      client.query('INSERT INTO careers(id, careertitle, careername, careerStartDate, careerEndDate, careerDescription, complete) values($1, $2, $3, $4, $5, $6)',
        [uuidv1(), data.careertitle, data.careername, Date.now(), data.careerEndDate, data.careerDescription, data.complete]);
      // SQL Query > Select Data
      client.query('SELECT * FROM items ORDER BY id ASC', function (err, result) {
        done(); // closing the connection;
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });

    });
  },
  delCareer: function (req, res) {
    //do something
    // Grab data from the URL parameters
    const id = req.params.userid;
    // Get a Postgres client from the connection pool
    pool.connect((err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }
      // SQL Query > Delete Data
      client.query('DELETE FROM careers WHERE id=($1)', [id]);
      // SQL Query > Select Data
      var query = client.query('SELECT * FROM careers ORDER BY id ASC', function (err, result) {
        done(); // closing the connection;
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });

    });
  }
}
