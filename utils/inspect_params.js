/*
 * @Author: Terence 
 * @Date: 2018-06-01 00:17:09 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-08-01 17:54:49
 */

const path = require('path');
const fs = require('fs');

const inspect_params = (req, res, next) => {

	let url = path.resolve(`./api_legend${req.baseUrl}.json`);

	for (key in req.body) {
		if (typeof req.body[key] === 'string') req.body[key] = req.body[key].trim().trimW();
	}
	
	fs.readFile(url, 'utf-8', function(error, data) {
		if (error) next('route');
		/**
		 * @var {JSON} legend_data api_legend文件的数据
		 * @var {String} params api_legend文件 params 字段的值
		 * @var {Boolean} isPass 是否通过检验
		 * @var {Object} ret 检验出错后，返回的数据
		 */
		let legend_data = JSON.parse(data),
			params = legend_data.params,
			isPass = true,
			ret = {};

		for (let key in params) {
			/**
			 * @var {String} val  客户端发送的参数值
			 * @var {String} need api_legend文件 need 字段的值
			 * @var {String} type api_legend文件 type 字段的值
			 * @var {Array} len  api_legend文件 len 字段的值
			 */
			
			let val = req.body[key],
				need = params[key]['need'],
				type = params[key]['type'],
				len = params[key]['len'];
			if (need !== undefined && val === undefined) {
				ret = {
					no: 400,
					msg:  `参数${key}不存在`
				};
				isPass = false;
				break;
			}
			
			if (type !== undefined && !isSameType(val, type)) {
				ret = {
					no: 400,
					msg:  `参数${key}必须为${type}类型`
				};
				isPass = false;
				break;
			}
			if (len !== undefined && len[0] !== len[1] && (len[0] >= len[1] || val.length <= len[0] || val.length >= len[1])) {
				ret = {
					no: 400,
					msg:  `参数${key}长度必须在${len[0]} ~ ${len[1]}之间`
				};
				isPass = false;
				break;
			}
			
			if (len !== undefined && len[0] === len[1] && val.length != len[0]) {
				ret = {
					no: 400,
					msg: `参数${key}长度必须为${len[0]}`
				};
				isPass = false;
				break;
			}
		}
		
		if (isPass) {
			next();
		} else {
			res.send(ret);
		}
	});
}

const isSameType = (value, type) => {
	let num = Object.prototype.toString.call(value).indexOf(type);
	return num >= 0;
}



module.exports = inspect_params;