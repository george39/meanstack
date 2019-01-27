'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Warehouse2Schema = Schema ({
	name: String,
	size: String,
	reference: String,
	date: String,
	clasification: String
});

module.exports = mongoose.model('Warehouse2', Warehouse2Schema);