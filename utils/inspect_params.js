/*
 * @Author: Terence 
 * @Date: 2018-06-01 00:17:09 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-06-01 01:15:02
 */

const path = require('path');
const fs = require('fs');

const inspect_params = (req, res, next) => {

	let url = path.resolve(`./api_legend${req.baseUrl}.json`);

	for (key in req.body) {
		req.body[key] = req.body[key].trim().trimW();
	}
	
	fs.readFile(url, 'utf-8', function(error, data) {
		if (error) next('route');
		/**
		 * @name legend_data api_legend文件的数据
		 * @name params api_legend文件 params 字段的值
		 * @name isPass 是否通过检验
		 * @name ret 检验出错后，返回的数据
		 */
		let legend_data = JSON.parse(data),
			params = legend_data.params,
			isPass = true,
			ret = {};

		for (let key in params) {
			/**
			 * @name val  客户端发送的参数值
			 * @name need api_legend文件 need 字段的值
			 * @name type api_legend文件 type 字段的值
			 * @name len api_legend文件 len 字段的值
			 */
			let val = req.body[key],
				need = params[key]['need'],
				type = params[key]['type'],
				len = JSON.parse(params[key]['len']);
			if (need !== undefined && val === undefined) {
				ret.no = 400;
				ret.msg = `参数${key}不存在`;
				isPass = false;
				break;
			}
			if (type !== undefined && !isSameType(val, type)) {
				ret.no = 400;
				ret.msg = `参数${key}必须为${type}类型`;
				isPass = false;
				break;
			}
			if (len !== undefined && (len[0] >= len[1] || val.length <= len[0] || val.length >= len[1])) {
				ret.no = 400;
				ret.msg = `参数${key}长度必须在${len[0]} ~ ${len[1]}之间`;
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

function isSameType(value, type) {
	let num = Object.prototype.toString.call(value).indexOf(type);
	return num >= 0;
}


module.exports = inspect_params;