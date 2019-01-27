'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TroqueladoSchema = Schema ({
	name: String,
	size: String,
	quantity: String,
	reference: String,
	date: String,
	homework: { type: Schema.ObjectId, ref: 'Homework' },
	user_id: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Troquelado', TroqueladoSchema);