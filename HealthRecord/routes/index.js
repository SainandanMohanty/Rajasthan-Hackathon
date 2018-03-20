var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/healthchain';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('clinicaldata').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next) {
  var item = {
    hospital: req.body.hospital,
    patient: req.body.patient,
    aadhar: req.body.aadhar,
    contact: req.body.contact,
    complaint: req.body.complaint,
    diagnosis:req.body.diagnosis
  };

  mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('clinicaldata').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});





module.exports = router;
