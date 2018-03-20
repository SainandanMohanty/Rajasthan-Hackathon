var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/healthchain';



// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');

});

//routes for patient basic info

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('users').find({mobile: {$in: [req.user.mobile]}});
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
        
    });
  });
});

/*
router.get('/profile', function(req, res, next) {

    //here it is
    var user = req.user;

    //you probably also want to pass this to your view
    res.render('profile', { title: 'profile', user: user });
});
*/


router.get('/get-healthrecords', function(req, res, next) {
  var resultArray = [];

  mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('clinicaldata').find({contact: {$in: [req.user.mobile]}});
    
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
        
    });
  });
});

router.get('/get-healthcoins', function(req, res, next) {
res.render('index', {name: req.user.name});
});

/*router.post('/insert', function(req, res, next) {
  var item = {
    Name: req.body.Name,
    Email: req.body.Email,
    Mobile: req.body.Mobile
  }; 

  mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('patientinfo').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
}); */

/*router.post('/update', function(req, res, next) {
  var item = {
    Name: req.body.Name,
    Email: req.body.Email,
    Mobile: req.body.Mobile
  };
  var id = req.body.id;

  mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('patientinfo').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});  */
 
/*router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('patientinfo').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
}); */

//----------------------------------------


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}



module.exports = router;