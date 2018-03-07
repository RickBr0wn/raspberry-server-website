var express = require('express');
var router = express.Router();

// GET /register
router.get('/', function(req, res, next) {
  res.render('register');
});

// POST / register
router.post('/', function(req, res, next){
  return res.send('USER CREATED!');
})

module.exports = router;
