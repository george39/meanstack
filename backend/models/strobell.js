'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StrobelSchema = Schema ({
	name: String,
	size: String,
	quantity: String,
	reference: String,
	homework: { type: Schema.ObjectId, ref: 'Homework'},
	user_id: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Strobel', StrobelSchema);