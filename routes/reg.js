/*
 * @Author: Terence 
 * @Date: 2018-05-26 00:18:43 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-06-04 14:38:07
 */

const express = require('express');
const router = express.Router();
const user_model = require('../models/user');
const reg_legend = require('../api_legend/reg');
const inspect_params = require('../utils/inspect_params');

router[reg_legend['method'].toLowerCase()]('/', inspect_params, (req, res, next) => {

	let body = req.body;
	let ret = {};
	let query_params = {
		username: body.username
	};

	if (body.password !== body.cfmpassword) {
		ret.no = 406;
		ret.msg = reg_legend.error[ret.no];
		res.send(ret);
	}

	find_user(query_params).then((user) => {
		if (user) {
			ret.no = 401;
			ret.msg = reg_legend.error[ret.no];
			res.send(ret);
		} else {
			get_user_count().then((count) => {
				body.uid = ++count;
				save(body).then(() => {
					ret.no = 200;
					ret.msg = reg_legend.success[ret.no];
					res.send(ret);
				});
			});
		}
	});
});

/**
 * 查找用户，看用户是否存在
 * @param {Object} query_params 查询的参数
 * @return {Promise}
 */
const find_user = async (query_params) => {
	return await new Promise((resolve, reject) => {
		user_model.findOne(query_params, (error, user) => {
			if (error) {
				reject(error);
			} else {
				resolve(user);
			}
		});
	});
}

/**
 * 获取所有用户的人数
 * @return {Promise}
 */
const get_user_count = async () => {
	return await new Promise((resolve, reject) => {
		user_model.count({}, (error, count) => {
			if (error) {
				reject(error);
			} else {
				resolve(count);
			}
		});
	});
}

/**
 * //保存用户信息
 * @param {Object} userData 准备保存的数据
 * @return {Promise}
 */
const save = async (userData) => {
	return await new Promise((resolve, reject) => {
		let userModel = user_model(userData);
		userModel.save((error, newData) => {
			if (error) {
				reject(error);
			} else {
				resolve(newData);
			}
		});
	});
}


module.exports = router;