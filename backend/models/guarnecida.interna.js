// 'use strict'

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var GuarnecidaISchema = Schema({
//     operator: String,
//     registros: { type: Array },
//     date: { type: Date, default: Date.now() },
//     homework_id: { type: Schema.ObjectId, ref: 'Homework' },
//     user_id: { type: Schema.ObjectId, ref: 'User' }
// });

// module.exports = mongoose.model('Guarnecida', GuarnecidaISchema);


'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var AutoIncrement = require('mongoose-sequence')(mongoose);
var Sequelize = require('sequelize');


var con = mongoose.createConnection('mongodb://localhost/alpaca');
autoIncrement.initialize(con);

var GuarnecidaSchema = Schema({


    date: { type: Date, default: Date.now() },
    operator: String,
    clasification: {type: String},
    registros: { type: Array },
    user_id: { type: Schema.ObjectId, ref: 'User' }

});
GuarnecidaSchema.plugin(autoIncrement.plugin, 'Guarnecida');


module.exports = mongoose.model('Guarnecida', GuarnecidaSchema);