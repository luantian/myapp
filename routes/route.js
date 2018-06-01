/*
 * @Author: Terence 
 * @Date: 2018-05-26 00:18:31 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-06-01 00:12:58
 */

const express = require('express');
const router = express.Router();

const index_router = require('./index');
const users_router = require('./users');
const login_router = require('./login');
const reg_router = require('./reg');

router.use('/', index_router);
router.use('/users', users_router);
router.use('/login', login_router);
router.use('/reg', reg_router);

module.exports = router;