'use strict'

var fs = require('fs');
var path = require('path');

var Homework = require('../models/homework');

function pruebas(reuqest, response){
	response.stutus(200).send({
		message: 'controlador de tareas'
	});
}

module.exports = {
	pruebas
};