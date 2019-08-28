var express = require('express');
let list  = require('../controls/list');
let index  = require('../controls/index');
let api = require('../configs/api');
var router = express.Router();

router.get(api.list,list.fetchAll);
router.get(api.getDetail,list.fetchDetail);
router.get(api.getSyntax,index.getSyntax);
router.get(api.getParam,list.fetchParam);
router.get(api.getHistory,list.fetchHistory);
router.get(api.getSourceCode, index.getSourceCode);
router.post(api.feedBackList, index.getFeedBackList);
router.post(api.saveFeedBack, index.saveFeedBackItem);
router.post(api.saveResponse, index.saveResponseItem);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('../public/index.html', { title: 'Express' });
});

module.exports = router;
