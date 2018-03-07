var express = require('express');
var router = express.Router();

// GET /auto
router.get('/', function(req, res, next) {
  res.send('AUTOMATION PAGE PAGE');
});

module.exports = router;
