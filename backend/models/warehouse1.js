'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var Warehouse1Schema = Schema({


    date: { type: Date, default: Date.now() },
    clasification: String,
    registros: { type: Array },
    user_id: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Warehouse1', Warehouse1Schema);