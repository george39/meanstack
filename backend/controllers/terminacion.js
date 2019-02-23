'use strict'

var fs = require('fs');
var path = require('path');

var Terminacion = require('../models/terminacion');

function saveTerminacion(request, response){
	var terminacion = new Terminacion();
	var params = request.body;

	if (params.name) {
		terminacion.operator = params.operator;
		terminacion.name = params.name;
		terminacion.size = params.size;
		terminacion.reference = params.reference;
		terminacion.clasification = params.clasification;
		terminacion.user_id = request.user.sub;

		terminacion.save((error, terminacionStored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!terminacionStored) {
					response.status(404).send({
						message: 'No se han podido guardarr los datos'
					});
				}else{
					response.status(200).send({
						terminacion: terminacionStored
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

module.exports = {
	saveTerminacion
}