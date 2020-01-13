
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var AutoIncrement = require('mongoose-sequence')(mongoose);
var Sequelize = require('sequelize');


var con = mongoose.createConnection('mongodb://localhost/alpaca');
autoIncrement.initialize(con);

var OperatorSchema = Schema({


    date: { type: Date, default: Date.now() },
    name: String,
	surname: String,
	nick: String,
	password: String,
	role: String,
	section: String
    

});
OperatorSchema.plugin(autoIncrement.plugin, 'Operator');


module.exports = mongoose.model('Operator', OperatorSchema);





// 'use strict'

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var OperatorSchema = Schema({

//     name: String,
//     lastname: String,
//     section: String,
//     date: { type: Date, default: Date.now() },
//     user_id: { type: Schema.ObjectId, ref: 'User' }
// });

// module.exports = mongoose.model('Operator', OperatorSchema);