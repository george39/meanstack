'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClasificationSchema = Schema ({
	primera: String,
	segunda: String
});

module.exports = mongoose.model('Clasifications', ClasificationSchema);