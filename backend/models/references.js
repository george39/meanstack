'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReferenceSchema = Schema ({
	name: String
});

module.exports = mongoose.model('Reference', ReferenceSchema);