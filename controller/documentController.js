var pg = require("pg");
var db = require('../config/db');
var config = db.connectConfig();
const uuidv1 = require('uuid/v1');
var pool = new pg.Pool(config);

module.exports.docs = {
  getDoc: (req, res) => {

  },
  postDocs: (req, res) => {

  },
  getDocs: (req, res) => {

  },
  delDoc: (req, res) => {

  }
}