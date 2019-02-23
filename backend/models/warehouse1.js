'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Warehouse1Schema = Schema ({
	operator: String,
	name: String,
	size: String,
	reference: String,
	date: {type: Date, default: Date.now()},
	clasification: String,
	user_id: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Warehouse1', Warehouse1Schema);

