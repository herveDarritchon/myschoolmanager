var express = require('express');
var router = express.Router();
var mongoose =  require ('mongoose');
var Familly = mongoose.model('Familly');

/*var Famillies=[
{id: 1, surname:'Einstein', firstname:'Albert', children:[{firstname:'Lieserl',sexe:'Female'},{firstname:'Hans-Albert',sexe:'Male'},{firstname:'Eduard',sexe:'Male'}]},
{id: 2, surname:'Tesla', firstname:'Nikola'},
{id: 3, surname:'Edison', firstname:'Thomas', children:[{firstname:'Marion Estelle',sexe:'Female'},{firstname:'Thomas Alva',sexe:'Male'},{firstname:'William Leslie',sexe:'Male'}]}
];*/

// GET
router.get('/', function(req, res, next){
  Familly.find(function(err, Famillies) {
    if (err) {return next(err);}
    res.json(Famillies);
  });
});

router.get('/:famillyId', function(req, res, next){
  console.log ('Get with param ' + req.params.famillyId);
  Familly.findById(req.params.famillyId, function(err, familly) {
    if (err) {
      res.send(err);
    } else if (familly) {
      res.json(familly);
    } else {
      console.log('not found');
      res.status(404).json({message:'not found'});
    }
  });
});

router.get('/:famillyId/children', function(req, res, next){
  if(req.Familly === null){
    console.log('not found');
    res.status(404).json({message:'not found'});
  }
  res.json(req.Familly.children);
});

// POST
router.post('/',function(req,res,next){
  console.log ('Post a familly : %j', req.body);
  var newFamilly = new Familly(req.body);
  console.log ('data is : %j', newFamilly);
  newFamilly.save(function(err, familly){
    if (err) {return next(err);}
    res.status(201).json(familly);
  });
});

// POST
router.post('/:famillyId',function(req,res,next){
  var famillyToUpdate = new Familly(req.body);
  famillyToUpdate.save(function(err, familly){
    if (err) {return next(err);}
    res.status(201).json(familly);
  });
});

//PUT
router.put('/:famillyId',function(req,res,next){
  console.log('Put with param ' + req.params.famillyId);
  console.log ('Body %j', req.body);
  var query = {'_id':req.params.famillyId};
  Familly.findOneAndUpdate(query, req.body, {upsert:true}, function(err, familly) {
    if (err) {
      console.log ('500 Internal Error - message ' + err);
      res.send(err);
    } else if (familly) {
      console.log ('200 OK');
      res.json(familly);
    } else {
      console.log('404 Not Found');
      res.status(404).json({message:'not found'});
    }
  });
});

module.exports = router;