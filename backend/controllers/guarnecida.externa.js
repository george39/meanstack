'use strict'

var fs = require('fs');
var path = require('path');
var moment = require('moment');

var GuarnecidaExterna = require('../models/guarnecida.externa');

function saveGuarnecidaExterna(request, response){
	var guarnecidaExterna = new GuarnecidaExterna();
	var params = request.body;

	if (params.registros) {
		guarnecidaExterna.operator = params.operator;
        guarnecidaExterna.date = params.date;
        guarnecidaExterna.registros = params.registros;
        //guarnecidaExterna.date = params.date;//moment().unix();
        guarnecidaExterna.user_id = request.user.sub;

		guarnecidaExterna.save((error, guarnecidaExternaStored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!guarnecidaExternaStored) {
					response.status(404).send({
						message: 'No se ha podido guardar el registro'
					});
				}else{
					response.status(200).send({
						guarnecidaExterna: guarnecidaExternaStored
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


function getGuarnecidas(request, response) {
    GuarnecidaExterna.find({}).populate({ path: 'user_id' }).exec((error, guarnecida) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!guarnecida) {
                response.stutus(404).send({
                    message: 'No hay tareas'
                });
            } else {
                response.status(200).send({
                    guarnecida
                });

            }
        }
    });
}


function deleteGuarnecida(request, response) {
    var guarnecidaId = request.params.id;

    GuarnecidaExterna.findByIdAndRemove(guarnecidaId, (error, guarnecidaRemoved) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!guarnecidaRemoved) {
                response.status(404).send({
                    message: 'La tarea no existe'
                });
            } else {
                response.status(200).send({
                    guarnecida: guarnecidaRemoved
                });
            }
        }

    });
}

function updateGuarnecida(request, response) {

    var gaurnecidaId = request.params.id;
    var war = request.params;
    var update = request.body._id;
    var codigo = request.body.code;
    var idWarehouse = request.body.id;


    GuarnecidaExterna.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, gaurnecida) => {

        if (err) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        } else {
            if (!gaurnecida) {
                return response.status(404).json({
                    ok: false,
                    mensaje: "el codigo no existe"
                });
            } else {

                response.status(200).json({
                    ok: true,
                    guarnecida: gaurnecida
                });
            }
        }

    });

}

module.exports = {
	saveGuarnecidaExterna,
	getGuarnecidas,
	updateGuarnecida,
	deleteGuarnecida
}
