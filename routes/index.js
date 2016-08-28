var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res, next) {
  res.render('list', { title: 'Express' });
});

router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'Express' });
});

module.exports = router;
