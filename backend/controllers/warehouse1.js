'use strict'


var fs = require('fs');
var path = require('path');

var Warehouse1 = require('../models/warehouse1');

function pruebas(request, response){
	response.status(200).send({
		message: 'Probando el controlador de warehouse1'
	});
}

function saveWarehouse1(request, response){
	var warehouse1 = new Warehouse1();
	var params = request.body;

	if (params.name) {
		warehouse1.operator = params.operator;
		warehouse1.name = params.name;
		warehouse1.reference = params.reference;
		warehouse1.size = params.size;
		warehouse1.date = params.date;
		warehouse1.clasification = params.clasification;
		warehouse1.user_id = request.user.sub;

		warehouse1.save((error, warehouse1Stored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!warehouse1Stored) {
					response.status(404).send({
						message: 'No se ha podido crear el registro'
					});
				}else{
					response.status(200).send({
						Warehouse1: warehouse1Stored
					});
				}
			}
		});
	}else{
		response.status(200).send({
			message: 'El nombre es obligatorio'
		});
	}
}

function getWarehouses1(request, response){
	Warehouse1.find({}).populate({path: 'user_id'}).exec((error, warehouse1) => {
		if (error) {
			response.status(500).send({
				message: 'Error en la peticion'
			});
		}else{
			if (!warehouse1) {
				response.stutus(404).send({
					message: 'No hay tareas'
				});
			}else{
				response.status(200).send({
					warehouse1
				});
				
			}
		}
	});
}

function getWarehouse1(request, response) {
	var warehouse1Id = request.params.id;

	Warehouse1.findById(warehouse1Id).populate({path: 'user_id'}).exec((error, warehouse1) => {
		if (error) {
			response.status(500).send({
				message: 'Error en la peticion'
			});
		}else{
			if (!warehouse1) {
				response.status(404).send({
					message: 'La tarea no existe'
				});
			}else{
				response.status(200).send({
					warehouse1
				});
			}
		}
	});
}

module.exports = {
	pruebas,
	saveWarehouse1,
	getWarehouses1,
	getWarehouse1
};
