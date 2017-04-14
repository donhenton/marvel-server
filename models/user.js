
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
        _id: String,
        userId: Number,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
});