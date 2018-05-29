/*
 * @Author: Terence 
 * @Date: 2018-05-26 00:18:31 
 * @Last Modified by:   Terence 
 * @Last Modified time: 2018-05-26 00:18:31 
 */


var express = require('express');
var router = express.Router();

var indexRouter = require('./index');
var usersRouter = require('./users');
var loginRouter = require('./login');
var regRouter = require('./reg');

router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/reg', regRouter);

module.exports = router;