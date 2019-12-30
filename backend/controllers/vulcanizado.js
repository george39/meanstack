'use strict'

var fs = require('fs');
var path = require('path');

var Vulcanizado = require('../models/vulcanizado');

function saveVulcanizado(request, response){
	var vulcanizado = Vulcanizado();
	var params = request.body;

	if (params.registros) {
		vulcanizado.operator = params.operator;
		vulcanizado.date = params.date;
		vulcanizado.registros = params.registros;

		vulcanizado.save((error, vulcanizadoStored) => {
			if (error) {
				response.status(500).send({

					message: 'Error en el servidor'
				});
			}else{
				if (!vulcanizadoStored) {
					response.status(404).send({
						message: 'No se han podido guardar los datos'
					});
				}else{
					response.status(200).send({
						vulcanizado: vulcanizadoStored
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

function getVulcanizado(request, response) {
    Vulcanizado.find({}).populate({ path: 'user_id' }).exec((error, vulcanizado) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!vulcanizado) {
                response.status(404).send({
                    message: 'No hay tareas'
                });
            } else {



                response.status(200).send({
                    vulcanizado
                });




            }
        }
    });
}
 
 
 
 
 function updateVulcanizado(request, response) {
 
	 var vulcanizadoId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 Vulcanizado.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, vulcanizado) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!vulcanizado) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 vulcanizado: vulcanizado
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function updateReference(request, response) {
 
	 var vulcanizadoId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 Vulcanizado.findByIdAndUpdate(update, { "$set": { "registros": { "code": codigo } } },  { safe: true, multi: true }, (err, vulcanizado) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!vulcanizado) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 vulcanizado: vulcanizado
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function deleteVulcanizado(request, response) {
	 var vulcanizadoId = request.params.id;
 
	 Vulcanizado.findByIdAndRemove(vulcanizadoId, (error, vulcanizadoRemoved) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!vulcanizadoRemoved) {
				 response.status(404).send({
					 message: 'La tarea no existe'
				 });
			 } else {
				 response.status(200).send({
					 vulcanizado: vulcanizadoRemoved
				 });
			 }
		 }
 
	 });
 }


module.exports = {
	saveVulcanizado,
	getVulcanizado,
	updateVulcanizado,
	deleteVulcanizado,
	updateReference
}