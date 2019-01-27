'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReprocesoCJSchema = Schema ({
	name: String,
	reference: String,
	size: String,
	date: String,
	homework_id: { type: Schema.ObjectId, ref: 'Homework'};
});

module.exports = mongoose.model('Reproceso.carlos.julio', ReprocesoCJSchema);