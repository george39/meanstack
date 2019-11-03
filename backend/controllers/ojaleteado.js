'use strict'

var fs = require('fs');
var path = require('path');

var Ojaleteado = require('../models/ojaleteado');

function saveOjaleteado(request, response){
	var ojaleteado = new Ojaleteado();
	var params = request.body;

	if (params.registros) {
		ojaleteado.operator = params.operator;
        ojaleteado.date = params.date;
        ojaleteado.registros = params.registros;        
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
			message: 'Los registros son obligatorios'
		});
	}
}


function getOjaleteado(request, response) {
	Ojaleteado.find({}).populate({ path: 'user_id' }).exec((error, ojaleteado) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!ojaleteado) {
				 response.status(404).send({
					 message: 'No hay tareas'
				 });
			 } else {
 
 
 
				 response.status(200).send({
					 ojaleteado
				 });
 
 
 
 
			 }
		 }
	 });
 }
 
 
 
 
 function updateOjaleteado(request, response) {
 
	 var ojaleteadoId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 Ojaleteado.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, ojaleteado) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!ojaleteado) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: ojaleteado
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function updateReference(request, response) {
 
	 var ojaleteadoId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 Ojaleteado.findByIdAndUpdate(update, { "$set": { "registros": { "code": codigo } } },  { safe: true, multi: true }, (err, ojaleteado) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!ojaleteado) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: ojaleteado
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function deleteOjaleteado(request, response) {
	 var ojaleteadoId = request.params.id;
 
	 Ojaleteado.findByIdAndRemove(ojaleteadoId, (error, ojaleteadoRemoved) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!ojaleteadoRemoved) {
				 response.status(404).send({
					 message: 'La tarea no existe'
				 });
			 } else {
				 response.status(200).send({
					 ojaleteado: ojaleteadoRemoved
				 });
			 }
		 }
 
	 });
 }

module.exports = {
	saveOjaleteado,
	getOjaleteado,
	updateOjaleteado,
	deleteOjaleteado
}