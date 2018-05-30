/*
 * @Author: Terence 
 * @Date: 2018-05-26 00:18:50 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-05-30 21:03:44
 */


const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const common = require('../utils/common');

console.log('loginData', common.inspectAPI(__filename));

router.post('/', function(req, res, next) {
	let body = req.body;
	

	userModel.findOne(body, {_id: 0, __v: 0, password: 0}, function(error, user) {
		if (error) res.send({
			no: 400,
			msg: '登录失败'
		});
		if (!user) {
			res.send({
				no: 400,
				msg: '当前用户不存在'
			});
		} else {
			let tLogin = user.tLogin;
			// user.tLogin = new Date().getTime();
			let user_model = new userModel(user);
			res.send({
				no: 200,
				msg: '登录成功',
				ret: user
			});
		}
	});
});

module.exports = router;