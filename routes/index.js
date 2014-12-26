var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/screen', function(req, res) {
  res.render('screen');
});

router.get('/barrage', function(req, res) {
  res.render('barrage');
});

/*router.get('/shake', function(req, res) {
  res.render('shake');
});*/

router.get('/test', function(req, res) {
  res.render('test');
});

module.exports = router;
