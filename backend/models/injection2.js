'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Injection2Schema = Schema ({
	operator: String,
	name: String,
	reference: String,
	size: String,
	date: {type: Date, default: Date.now()},
	homework_id: { type: Schema.ObjectId, ref: 'Homework'},
	user_id: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Injection2', Injection2Schema)