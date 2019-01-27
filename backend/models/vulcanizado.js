'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VulcanizadoSchema = Schema ({
	reference: String,
	size: String,
	date: String,
	clasification: String,
	homework_id: { type: Schema.ObjectId, ref: 'Homework'},
	user_id: { type: Schema.ObjectId, ref: 'User'};
});

module.exports = mongoose.model('Vulcanizado', VulcanizadoSchema);