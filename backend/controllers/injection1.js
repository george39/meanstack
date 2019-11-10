'use strict'

var fs = require('fs');
var path = require('path');

var Injection = require('../models/injection1');

function saveInjection1(request, response){
	var injection1 = new Injection();
	var params = request.body;

	if (params.registros) {
		injection1.operator = params.operator;
		injection1.date = params.date;
		injection1.registros = params.registros;		
		injection1.user_id = request.user.sub;

		injection1.save((error, injection1Stored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!injection1Stored) {
					response.status(404).send({
						message: 'No se ha podido guardar el registro'
					});
				}else{
					response.status(200).send({
						injection1: injection1Stored
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


function getInjection1(request, response) {
   Injection.find({}).populate({ path: 'user_id' }).exec((error, injection) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!injection) {
                response.status(404).send({
                    message: 'No hay tareas'
                });
            } else {



                response.status(200).send({
                    injection
                });




            }
        }
    });
}




function updateInjection1(request, response) {

    var inyeccion1Id = request.params.id;
    var war = request.params;
    var update = request.body._id;
    var codigo = request.body.code;
    var idWarehouse = request.body.id;


    Injection.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, inyeccion1) => {

        if (err) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        } else {
            if (!inyeccion1) {
                return response.status(404).json({
                    ok: false,
                    mensaje: "el codigo no existe"
                });
            } else {

                response.status(200).json({
                    ok: true,
                    warehouse: inyeccion1
                });
            }
        }

    });

}


function updateReference(request, response) {

    var inyeccion1Id = request.params.id;
    var war = request.params;
    var update = request.body._id;
    var codigo = request.body.code;
    var idWarehouse = request.body.id;


    Injection.findByIdAndUpdate(update, { "$set": { "registros": { "code": codigo } } },  { safe: true, multi: true }, (err, inyeccion1) => {

        if (err) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        } else {
            if (!inyeccion1) {
                return response.status(404).json({
                    ok: false,
                    mensaje: "el codigo no existe"
                });
            } else {

                response.status(200).json({
                    ok: true,
                    warehouse: inyeccion1
                });
            }
        }

    });

}


function deleteInjection1(request, response) {
    var injection1Id = request.params.id;

    Injection.findByIdAndRemove(injection1Id, (error, injection1Removed) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!injection1Removed) {
                response.status(404).send({
                    message: 'La tarea no existe'
                });
            } else {
                response.status(200).send({
                    injection1: injection1Removed
                });
            }
        }

    });
}


module.exports = {
	saveInjection1,
	getInjection1,
	updateInjection1,
	updateReference,
	deleteInjection1
}