'use strict'

var fs = require('fs');
var path = require('path');
var moment = require('moment');

var GuarnecidaInterna = require('../models/guarnecida.interna');

function saveGuarnecidaInterna(request, response){
	var guarnecidaInterna = new GuarnecidaInterna();
	var params = request.body;

	if (params.name) {
		guarnecidaInterna.operator = params.operator;
		guarnecidaInterna.name = params.name;
		guarnecidaInterna.size = params.size;
		guarnecidaInterna.quantity = params.quantity;
		guarnecidaInterna.reference = params.reference;
		//guarnecidaInterna.date = params.date;//moment().unix();
		guarnecidaInterna.user_id = request.user.sub;

		guarnecidaInterna.save((error, guarnecidaInternaStored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!guarnecidaInternaStored) {
					response.status(404).send({
						message: 'No se ha podido guardar el registro'
					});
				}else{
					response.status(200).send({
						guarnecidaInterna: guarnecidaInternaStored
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
	saveGuarnecidaInterna
}
