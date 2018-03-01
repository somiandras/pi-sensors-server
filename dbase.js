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

  getData() {
    return MongoClient.connect(url)
    .then(function(c) {
      client = c;
      const db = client.db(name);
      return db.collection('sensors')
      .find()
      .sort({date: -1})
      .limit(30)
      .toArray();
    })
    .then(function(data) {
      assert.equal(30, data.length);
      client.close();
      data.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
      return Promise.resolve(data);
    });
  }
}

module.exports = db;
