var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET landing page. */
router.get('/', (req, res) => {
  res.render('landing', { title: "Namma Bus" });
});

module.exports = router;
