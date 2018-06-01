/*
 * @Author: Terence 
 * @Date: 2018-05-29 12:58:08 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-06-01 15:56:56
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
	uid: {type: Number},
	username: {type: String},
	password: {type: String},
	email: {type: String},
	tReg: {type: Number},
	tel: {type: Number},
	tLogin: {type: Number},
	loginCnt: {type: Number, default: 0}
}, {collection: 'userInfo'});

const userInfo = mongoose.model('UserInfo', userSchema);

module.exports = userInfo;