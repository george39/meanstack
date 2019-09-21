'use strict'

var fs = require('fs');
var path = require('path');

var Ojaleteado = require('../models/ojaleteado');

function saveOjaleteado(request, response){
	var ojaleteado = new Ojaleteado();
	var params = request.body;

	if (params.name) {
		ojaleteado.operator = params.operator;
		ojaleteado.name = params.name;
		ojaleteado.size = params.ojaleteado;
		ojaleteado.reference = params.reference;
		ojaleteado.user_id = request.user.sub;

		ojaleteado.save((error, ojaleteadoStored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!ojaleteadoStored) {
					response.status(404).send({
						message: 'No se han podiodo guardar los datos'
					});
				}else{
					response.status(200).send({
						ojaleteado: ojaleteadoStored
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
	saveOjaleteado
}