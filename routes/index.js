var express = require('express');
let list  = require('../controls/list');
let index  = require('../controls/index');
let api = require('../configs/api');
var router = express.Router();

router.get(api.list,list.fetchAll);
router.get(api.getSourceCode, index.getSourceCode);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('../public/index.html', { title: 'Express' });
});

module.exports = router;
