'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Injection2Schema = Schema ({
	name: String,
	reference: String,
	size: String,
	date: String,
	homework_id: { type: Schema.ObjectiId, ref: 'Homework'},
	user_id: { type: Schema.ObjectiId, ref: 'User'}
});

module.exports = mongoose.model('Injection2', Injection2Schema)