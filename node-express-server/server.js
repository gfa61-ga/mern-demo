var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', function(req, res) {
    var db = {};
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://127.0.0.1', function(err, client) {
        db.collection = client.db('chat').collection('messages');
        db.collection.findOne({}, function (err, doc) {
            if (err) {
                console.LogError(err);
            } else {
               //console.log(doc);
              res.status(200).json(doc);
            }
        });
    });
});

app.listen(3500);

