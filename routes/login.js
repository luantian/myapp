/*
 * @Author: Terence 
 * @Date: 2018-05-26 00:18:50 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-06-01 00:51:40
 */


const express = require('express');
const router = express.Router();
const user_model = require('../models/user');
const login_legend = require('../api_legend/login');
const inspect_params = require('../utils/inspect_params');

router.post('/', inspect_params, function(req, res, next) {
	let body = req.body;
	let ret = {};
	let query_params = {
		username: body.username,
		password: body.password
	};
	let prevent = {
		_id: 0,
		__v: 0,
		username: 0,
		password: 0
	}

	user_model.findOne(query_params, prevent, function(error, user) {
		if (error) {
			ret.no = 405;
		}
		if (!user) {
			ret.no = 403;
		} else {
			ret.no = 200;
		}
		if (ret.no == 200) {
			ret.result = user;
			ret.msg = login_legend.success[ret.no];
		} else {
			ret.msg = login_legend.error[ret.no];
		}
		res.send(ret);
	});
});

module.exports = router;