var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET /register
router.get('/', function(req, res, next) {
  res.render('register');
});

// POST / register
router.post('/', function(req, res, next){
  if(req.body.name &&
    req.body.email &&
    req.body.password &&
    req.body.confirmPassword){
      // confirm that user entered same passwords
      if(req.body.password !== req.body.confirmPassword){
        var err= new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }
    }else{
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

module.exports = router;
