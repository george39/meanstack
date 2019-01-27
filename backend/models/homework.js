'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomeworkSchema = Schema ({
	name: String,
	size: String,
	quantity: String,
	reference: String,
	date: String,
	user_id: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Homework', HomeworkSchema);