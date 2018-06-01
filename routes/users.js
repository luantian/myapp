/*
 * @Author: Terence 
 * @Date: 2018-05-26 00:18:14 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-06-01 00:13:41
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;

