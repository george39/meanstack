'use strict'

var fs = require('fs');
var path = require('path');

var ReprocesoCJ = require('../models/reproceso.carlos.julio');

function saveReproceso(request, response){
	var reproceso = ReprocesoCJ();
	var params = request.body;

	if (params.registros) {
		reproceso.operator = params.operator;
		reproceso.date = params.date;
		reproceso.registros = params.registros;

		reproceso.save((error, reprocesoStored) => {
			if (error) {
				response.status(500).send({

					message: 'Error en el servidor'
				});
			}else{
				if (!reprocesoStored) {
					response.status(404).send({
						message: 'No se han podido guardar los datos'
					});
				}else{
					response.status(200).send({
						reproceso: reprocesoStored
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



function getReproceso(request, response) {
	ReprocesoCJ.find({}).populate({ path: 'user_id' }).exec((error, reproceso) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!reproceso) {
				 response.status(404).send({
					 message: 'No hay tareas'
				 });
			 } else {
 
 
 
				 response.status(200).send({
					 reproceso
				 });
 
 
 
 
			 }
		 }
	 });
 }
 
 
 
 
 function updateReproceso(request, response) {
 
	 var reprocesoId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 ReprocesoCJ.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, reproceso) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!reproceso) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: reproceso
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function updateReference(request, response) {
 
	 var reprocesoId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 ReprocesoCJ.findByIdAndUpdate(update, { "$set": { "registros": { "code": codigo } } },  { safe: true, multi: true }, (err, reproceso) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!reproceso) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: reproceso
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function deleteReproceso(request, response) {
	 var reprocesoId = request.params.id;
 
	 ReprocesoCJ.findByIdAndRemove(reprocesoId, (error, reprocesoRemoved) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!reprocesoRemoved) {
				 response.status(404).send({
					 message: 'La tarea no existe'
				 });
			 } else {
				 response.status(200).send({
					 reproceso: reprocesoRemoved
				 });
			 }
		 }
 
	 });
 }

module.exports = {
	saveReproceso,
	getReproceso,
	updateReference,
	updateReproceso,
	deleteReproceso
}