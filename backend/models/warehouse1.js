'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Warehouse1Schema = Schema ({
	name: String,
	size: String,
	reference: String,
	date: String,
	clasification: String
});

module.exports = mongoose.model('Warehouse1', Warehouse1Schema);

