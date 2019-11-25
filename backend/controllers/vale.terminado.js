'use strict'

var fs = require('fs');
var path = require('path');

var ValeTerminacion = require('../models/vale.terminado');

function saveValeTerminacion(request, response) {
    var valeTermination = new ValeTerminacion();
    var params = request.body;
    var rg = params.registros;

    if (params.registros) {


        valeTermination.operator = params.operator;
        valeTermination.date = params.date;
        valeTermination.clasification = params.clasification;
        valeTermination.registros = params.registros;
        // termination.user_id = request.user.sub;



        valeTermination.save((error, valeTerminationStored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!valeTerminationStored) {
                    response.status(404).send({
                        message: 'No se ha podido crear el registro'
                    });
                } else {
                    response.status(200).send({
                        valeTerminacion: valeTerminationStored
                    });
                }
            }
        });



    } else {
        response.status(200).send({
            message: 'El nombre es obligatorio'
        });
    }
}


function getValesTerminations(request, response) {
	ValeTerminacion.find({}).populate({ path: 'user_id' }).exec((error, valeTermination) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!valeTermination) {
				 response.status(404).send({
					 message: 'No hay tareas'
				 });
			 } else {
 
 
 
				 response.status(200).send({
					 valeTermination
				 });
 
 
 
 
			 }
		 }
	 });
 }

 function getValeTermination(request, response) {
    var valeTerminationId = request.params.id;

    ValeTerminacion.findById(valeTerminationId).populate({ path: 'user_id' }).exec((error, valeTermination) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!valeTermination) {
                response.status(404).send({
                    message: 'La tarea no existe'
                });
            } else {
                response.status(200).send({
                    valeTermination
                });
            }
        }
    });
}
 
 
 
 
 function updateValeTermination(request, response) {
 
	 var valeTerminationId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 ValeTerminacion.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, valeTermination) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!valeTermination) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: valeTermination
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function updateReference(request, response) {
 
	 var valeTerminationId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 ValeTerminacion.findByIdAndUpdate(update, { "$set": { "registros": { "code": codigo } } },  { safe: true, multi: true }, (err, valeTermination) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!valeTermination) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: valeTermination
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function deleteValeTermination(request, response) {
	 var valeTerminationId = request.params.id;
 
	 ValeTerminacion.findByIdAndRemove(valeTerminationId, (error, valeTerminationRemoved) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!valeTerminationRemoved) {
				 response.status(404).send({
					 message: 'La tarea no existe'
				 });
			 } else {
				 response.status(200).send({
					 valeTermination: valeTerminationRemoved
				 });
			 }
		 }
 
	 });
 }

module.exports = {
    saveValeTerminacion,
	getValesTerminations,
	getValeTermination,
    updateValeTermination,
    updateReference,
    deleteValeTermination
}