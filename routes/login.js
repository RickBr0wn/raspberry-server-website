var express = require('express');
var router = express.Router();

// GET /login
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

//POST /login
router.post('/', function(req, res, next){
  return res.send('LOGGED IN');
});

module.exports = router;
