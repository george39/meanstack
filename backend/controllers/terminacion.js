'use strict'

var fs = require('fs');
var path = require('path');

var Terminacion = require('../models/terminacion');

function saveTerminacion(request, response) {
    var termination = new Terminacion();
    var params = request.body;
    var rg = params.registros;

    if (params.registros) {


        termination.registros = params.registros;
        termination.operator = params.operator;
        termination.date = params.date;
        termination.clasification = params.clasification;
        // termination.user_id = request.user.sub;



        termination.save((error, terminationStored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!terminationStored) {
                    response.status(404).send({
                        message: 'No se ha podido crear el registro'
                    });
                } else {
                    response.status(200).send({
                        Terminacion: terminationStored
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


function getTermination(request, response) {
	Terminacion.find({}).populate({ path: 'user_id' }).exec((error, termination) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!termination) {
				 response.status(404).send({
					 message: 'No hay tareas'
				 });
			 } else {
 
 
 
				 response.status(200).send({
					 termination
				 });
 
 
 
 
			 }
		 }
	 });
 }
 
 
 
 
 function updateTermination(request, response) {
 
	 var terminationId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 Terminacion.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, termination) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!termination) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: termination
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function updateReference(request, response) {
 
	 var terminationId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 Terminacion.findByIdAndUpdate(update, { "$set": { "registros": { "code": codigo } } },  { safe: true, multi: true }, (err, termination) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!termination) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: termination
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function deleteTermination(request, response) {
	 var terminationId = request.params.id;
 
	 Terminacion.findByIdAndRemove(terminationId, (error, terminationRemoved) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!terminationRemoved) {
				 response.status(404).send({
					 message: 'La tarea no existe'
				 });
			 } else {
				 response.status(200).send({
					 termination: terminationRemoved
				 });
			 }
		 }
 
	 });
 }

module.exports = {
    saveTerminacion,
    getTermination,
    updateTermination,
    updateReference,
    deleteTermination
}