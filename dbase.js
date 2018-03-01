const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const name = 'weather-station';
let client;

class db {
  insert(data) {
    return MongoClient.connect(url)
    .then(function(c) {
      client = c;
      const db = client.db(name);
      return db.collection('sensors').insertOne(data)
    })
    .then(function(response) {
      assert.equal(1, response.insertedCount);
      client.close();
      return Promise.resolve(true);
    });
  }
}

module.exports = db;
