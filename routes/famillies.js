var express = require('express');

var router = express.Router();
var Familly = require('../models/Familly');

// GET
router.get('/', function(req, res, next) {
  Familly.find(function(err, Famillies) {
    if (err) {
      return next(err);
    }
    res.json(Famillies);
  });
});

router.get('/:famillyId', function(req, res, next) {
  console.log('Get with param ' + req.params.famillyId);
  Familly.findById(req.params.famillyId, function(err, familly) {
    if (err) {
      res.send(err);
    } else if (familly) {
      res.json(familly);
    } else {
      console.log('not found');
      res.status(404).json({
        message: 'not found'
      });
    }
  });
});

router.get('/:famillyId/children', function(req, res, next) {
  console.log('Get with param ' + req.params.famillyId);
  Familly.findById(req.params.famillyId, function(err, familly) {
    if (err) {
      res.send(err);
    } else if (familly) {
      res.json(familly.children);
    } else {
      console.log('not found');
      res.status(404).json({
        message: 'not found'
      });
    }
  });
});

// POST
router.post('/', function(req, res, next) {
  console.log('Post a familly : %j', req.body);
  var newFamilly = new Familly(req.body);
  console.log('data is : %j', newFamilly);
  newFamilly.save(function(err, familly) {
    if (err) {
      return next(err);
    }
    res.status(201).json(familly);
  });
});

// POST
router.post('/:famillyId', function(req, res, next) {
  var famillyToUpdate = new Familly(req.body);
  famillyToUpdate.save(function(err, familly) {
    if (err) {
      return next(err);
    }
    res.status(201).json(familly);
  });
});

//PUT
// TODO move the delete from here to the GET method to avoid sending the value to the client
router.put('/:famillyId', function(req, res, next) {
  console.log('Put with param ' + req.params.famillyId);
  delete req.body.__v;
  console.log('Body %j', req.body);
  var query = {
    '_id': req.params.famillyId
  };
  Familly.findOneAndUpdate(query, req.body, {
    upsert: true
  }, function(err, familly) {
    if (err) {
      console.log('500 Internal Error - message ' + err);
      res.send(err);
    } else if (familly) {
      console.log('200 OK');
      res.json(familly);
    } else {
      console.log('404 Not Found');
      res.status(404).json({
        message: 'not found'
      });
    }
  });
});

module.exports = router;
