var express = require('express');
var router = express.Router();

//GET /
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to my Raspberry Pi Server', tagline: 'Powered by node.js, express.js (backend), PUG/HTML/CSS/JavaScript (frontend) and bootStrap 4 (CSS). Using Visual Studio Code.' });
});

module.exports = router;
