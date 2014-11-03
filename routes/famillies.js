var express = require('express');

var router = express.Router();
var Familly = require('../models/Familly');

// Main Function
router.param('famillyId', function(req, res, next, famillyId) {
  console.log('access main function param for familyId - %s', famillyId);
  // typically we might sanity check that famillyId is of the right format
  Familly.findById(famillyId, function(err, familly) {
    if (err) return next(err);
    if (!familly) {
      errMessage = 'familly with id ' + famillyId + ' is not found.';
      console.log(errMessage);
      return next(res.status(404).json({
        message: errMessage
      }));
    }
    req.familly = familly;
    next();
  });
});

// Main Function
router.param('childrenId', function(req, res, next, childrenId) {
  console.log('access main function param for childrenId - %s', childrenId);
  // typically we might sanity check that childrenId is of the right format
  child = req.familly.children.id(childrenId);
  if (!child) {
    errMessage = 'children with id ' + childrenId + ' is not found.';
    console.log(errMessage);
    return next(res.status(404).json({
      message: errMessage
    }));
  }
  req.child = child;
  next();
});

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
  console.log('Get the familly from %s (GET with /:famillyId).', req.params.famillyId);
  res.json(req.familly);
});

router.get('/:famillyId/children', function(req, res, next) {
  console.log('Get all the children from a family %s (GET with /:famillyId/children).', req.params.famillyId);
  res.json(req.familly.children);
});

router.get('/:famillyId/children/:childrenId', function(req, res, next) {
  console.log('Get a children from %s in a familly %s (GET with /:famillyId/children/:childrenId).', req.params.childrenId, req.params.famillyId);
  res.json(req.child);
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

router.post('/:famillyId/children', function(req, res, next) {
  console.log('Add a children to a familly %s (POST with /:famillyId/children).', req.params.famillyId);
  req.familly.children.push(req.body);
  req.familly.save(function(err, familly) {
    if (err) {
      return next(err);
    }
    res.status(200).json(familly);
  });
});

//PUT
// TODO : Add a control for the PUT verb on all the records of the JSON Object.
router.put('/:famillyId', function(req, res, next) {
  console.log('Update a familly %s (PUT with /:famillyId).', req.params.famillyId);

  req.familly.surname = req.body.surname;
  req.familly.firstname = req.body.firstname;
  req.familly.email = req.body.email;
  req.familly.children = req.body.children;

  req.familly.save(function(err, familly) {
    if (err) {
      return next(err);
    }
    res.status(200).json(familly);
  });
});

//PUT
// TODO : Add a control for the PUT verb on all the records of the JSON Object.
router.put('/:famillyId/children/:childrenId', function(req, res, next) {
  console.log('Update a children %s of the familly %s (PUT with /:famillyId/children/:childrenId).', req.params.famillyId, req.params.childrenId);

  /*
  var set = {};
  for (var field in partialUpdate) {
    set['subDocs.$.' + field] = partialUpdate[field];
  }
  Parent.update({_id: parentDoc._id, "subDocs._id": document._id},
    {$set: set},
    function(err, numAffected) {});
*/

  var set = {};
  for (var field in req.body) {
    set ['children.$.' + field] = req.body[field];
  }

  console.log('set = %j', set);
  console.log ('body : %j', req.body);
  console.log ('family : %j', req.familly);
  console.log ('child : %j', req.child);
  console.log ('familyId : %s', req.familly._id);
  console.log ('childId : %s', req.child._id);

  req.familly.update({
      "_id": req.familly._id,
      "children._id": req.child._id
    }, {
      $set: set
    },
    function(err, numAffected) {
      if (err) {
        return next(err);
      }
      res.status(204);
    });
});

module.exports = router;
