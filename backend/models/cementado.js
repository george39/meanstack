'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CementadoSchema = Schema ({
	name: String,
	size: String,
	quantity: String,
	reference: String,
	date: String,
	homework_id: { type: Schema.ObjectId, ref: 'Homework'},
	user_id: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Cementado', CementadoSchema);