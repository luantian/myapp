/*
 * @Author: Terence 
 * @Date: 2018-05-26 00:18:43 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-05-29 16:03:11
 */

const express = require('express');
const router = express.Router();
const userModel = require('../models/user');


router.post('/', function(req, res, next) {

	let body = req.body;

	if (body.password !== body.cfmpassword) {
		res.send({
			no: 400,
			msg: "两次密码输入不一致"
		});
	}
	
	userModel.find({username: body.username}, function(error, users) {
		if (error) res.send({no: 400, msg: 'reg failed'});
		if (users.length == 0) {
			userModel.count(function (err, count) {
				if (err) res.send({no: 400, msg: 'reg failed'});
				if (count >= 0) {
					body.uid = ++count;
					let user_model = new userModel(body);
					user_model.save(function(errorr, user) {
						if (errorr) res.send({no: 400, msg: 'reg failed'});
						if (user) {
							res.send({
								no: 200,
								msg: '注册成功'
							});
						}
					});
				}
			});
		} else {
			res.send({
				no: 401,
				msg: '此用户名已经被注册'
			});
		}
	});
});

module.exports = router;