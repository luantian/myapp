const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const db = mongoose.connection;

db.on('error', function(error) {
	console.log('error: ', error);
});

db.once('open', function(callback) {
	console.log('test数据库连接成功');
});