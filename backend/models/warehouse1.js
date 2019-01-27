'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Warehouse1Schema = Schema ({
	name: String,
	size: String,
	reference: String,
	date: String,
	clasification: String,
	user_id: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Warehouse1', Warehouse1Schema);

