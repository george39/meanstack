'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TerminacionSchema = Schema ({
	operator: String,
	name: String,
	size: String,
	reference: String,
	date: {type: Date, default: Date.now()},
	clasification: String,
	homework_id: { type: Schema.ObjectId, ref: 'Homework' },
	user_id: { type: Schema.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Terminacion', TerminacionSchema);