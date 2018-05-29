/*
 * @Author: Terence 
 * @Date: 2018-05-26 00:18:57 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-05-26 00:37:37
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
