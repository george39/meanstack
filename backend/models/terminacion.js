'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var AutoIncrement = require('mongoose-sequence')(mongoose);
var Sequelize = require('sequelize');


var con = mongoose.createConnection('mongodb://localhost/alpaca');
autoIncrement.initialize(con);

var TerminacionSchema = Schema({


    date: { type: Date, default: Date.now() },
    operator: String,
    clasification: {type: String},
    registros: { type: Array },
    user_id: { type: Schema.ObjectId, ref: 'User' }

});
TerminacionSchema.plugin(autoIncrement.plugin, 'Terminacion');


module.exports = mongoose.model('Terminacion', TerminacionSchema);