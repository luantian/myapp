/*
 * @Author: Terence 
 * @Date: 2018-05-26 00:18:50 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-06-04 14:40:26
 */


const express = require('express');
const router = express.Router();
const user_model = require('../models/user');
const login_legend = require('../api_legend/login');
const inspect_params = require('../utils/inspect_params');

router[login_legend['method'].toLowerCase()]('/', inspect_params, function(req, res, next) {
	/**
	 * @var {Object} body 客户端传来的参数
	 * @var {Object} ret 返回给客户端的结果
	 * @var {Object} query_params 查询数据库的条件
	 * @var {Array} filter_keys 保存返回的ret的key值
	 * @var {Object} update 登录时需要更新的key值
	 */
	let body = req.body,
		ret = {},
		query_params = {
			username: body.username,
			password: body.password
		},
		filter_keys = [];
		update = {
			tLogin: new Date().getTime(),
			$inc: { loginCnt: 1 }
		};

	for (let key in login_legend.ret) {
		if (key !== 'no') filter_keys.push(key);
	}

	user_model.findOneAndUpdate(query_params, update, function(error, user) {
		if (error) {
			ret.no = 405;
		} else {
			if (!user) {
				ret.no = 403;
			} else {
				ret.no = 200;
			}
			if (ret.no == 200) {
				ret.result = {};
				/**
				 * 设置返回给客户端的属性
				 */
				for (let i = 0; i < filter_keys.length; i++) {
					ret.result[filter_keys[i]] = user[filter_keys[i]];
				}
				ret.msg = login_legend.success[ret.no];
			} else {
				ret.msg = login_legend.error[ret.no];
			}
		}
		res.send(ret);
	});
});

module.exports = router;