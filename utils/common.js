/*
 * @Author: Terence 
 * @Date: 2018-06-01 16:18:26 
 * @Last Modified by: Terence
 * @Last Modified time: 2018-06-01 16:22:31
 */

/**
 * @return {Number} 获得String的字节长度（汉字或全角符号的长度为2）
 */
String.prototype.len = function() {
	return this.replace(/[^\x00-\xff]/g,"**").length;
};
/**
 * @return {String} 去除字符串前后的空格
 */
String.prototype.trim = function() {
	return this.replace(/(^\s+)|(\s+$)/g,"");
};
/**
 * @return {String} 去除字符串前后的全角空格
 */
String.prototype.trimW = function() {
	return this.replace(/(^[\s　]+)|([\s　]+$)/g,"");
};