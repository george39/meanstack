'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TerminacionSchema = Schema ({
	name: String,
	size: String,
	reference: String,
	date: String,
	clasification: String
	homework_id: { type: Schema.ObjectId, ref: 'Homework' },
	user_id: { type: Schema.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Terminacion', TerminacionSchema);