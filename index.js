const express = require('express');
const app = express();
const dbase = require('./dbase');
const db = new dbase();

app.use(require('morgan')('combined'));
app.use(express.json());

app.post('/readings', function(req, res){
  let data = req.body;

  db.insert(data)
  .then(function() {
    res.status = 200;
    res.send();
  })
  .catch(function(err) {
    res.status(500).send();
  });
});

app.use(function (err, req, res, next) {
  res.status(500).send();
})

console.log('Listening on port 3000');
app.listen(3000);
