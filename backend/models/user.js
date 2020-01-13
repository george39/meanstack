
'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name: String,
	surname: String,
	nick: String,
	password: String,
	role: String,
	section: String
});

module.exports = mongoose.model('User', UserSchema);