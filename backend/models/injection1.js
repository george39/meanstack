'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var AutoIncrement = require('mongoose-sequence')(mongoose);
var Sequelize = require('sequelize');


var con = mongoose.createConnection('mongodb://localhost/alpaca');
autoIncrement.initialize(con);

var Injection1Schema = Schema({


    date: { type: Date, default: Date.now() },
    operator: String,
    clasification: {type: String},
    registros: { type: Array },
    user_id: { type: Schema.ObjectId, ref: 'User' }

});
Injection1Schema.plugin(autoIncrement.plugin, 'Injection1');


module.exports = mongoose.model('Injection1', Injection1Schema);