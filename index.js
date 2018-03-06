const express = require('express');
const app = express();
const dbase = require('./dbase');
const db = new dbase();
const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const helmet = require('helmet');

app.set('view engine', 'pug');
app.use(helmet());
app.use(require('morgan')('combined'));
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));

// Token set in env variable in shell script
const accept_token = process.env.ACCEPT_TOKEN

passport.use(new Strategy(
  function(token, cb) {
    if (token === accept_token) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  }
));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/readings/:frequency?', function(req, res) {
  let frequency = parseInt(req.params.frequency) || 5;
  db.getData(frequency)
  .then(function(data) {
    res.set({'Content-Type': 'application/json'});
    res.status(200).send(JSON.stringify(data));
  })
  .catch(function(err) {
    console.log(err.stack);
    res.status(500).send();
  })
});

app.post('/readings', 
  passport.authenticate('bearer', { session: false }),
  function(req, res){
    let data = req.body;

    db.insert(data)
    .then(function() {
      res.status(200).send();
    })
    .catch(function(err) {
      console.log(err.stack);
      res.status(500).send();
    });
  }
);

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send();
});

console.log('Listening on port 3333');
app.listen(3333);
