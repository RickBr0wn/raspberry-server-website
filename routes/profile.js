var express = require('express');
var router = express.Router();

// GET /profile
router.get('/', function(req, res, next) {
  res.send('PROFILE PAGE');
});

module.exports = router;
