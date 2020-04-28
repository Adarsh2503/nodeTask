var express = require('express');
var router = express.Router();

/* GET Posts listing. */
router.get('/', function(req, res, next) {
  res.send('Posts Route');
});

module.exports = router;
