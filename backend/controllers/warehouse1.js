'use strict'


var fs = require('fs');
var path = require('path');

var Warehouse1 = require('../models/warehouse1');

function pruebas(request, response){
	response.status(200).send({
		message: 'Probando el controlador de warehouse1'
	});
}

module.exports = {
	pruebas
};
