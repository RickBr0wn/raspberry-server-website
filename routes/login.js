var express = require('express');
var router = express.Router();

// GET /login
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

//POST /login
router.post('/', function(req, res, next){
  if(req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function(error, user){
      if(error || user){
        var err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      }else{
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  }else{
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

module.exports = router;
