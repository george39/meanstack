'use strict'

var fs = require('fs');
var path = require('path');

var Virado = require('../models/virado');

function saveVirado(request, response){
	var virado = Virado();
	var params = request.body;

	if (params.registros) {
		virado.operator = params.operator;
		virado.date = params.date;
		virado.registros = params.registros;

		virado.save((error, viradoStored) => {
			if (error) {
				response.status(500).send({

					message: 'Error en el servidor'
				});
			}else{
				if (!viradoStored) {
					response.status(404).send({
						message: 'No se han podido guardar los datos'
					});
				}else{
					response.status(200).send({
						virado: viradoStored
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



function getVirado(request, response) {
	Virado.find({}).populate({ path: 'user_id' }).exec((error, virado) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!virado) {
				 response.status(404).send({
					 message: 'No hay tareas'
				 });
			 } else {
 
 
 
				 response.status(200).send({
					 virado
				 });
 
 
 
 
			 }
		 }
	 });
 }
 
 
 
 
 function updateVirado(request, response) {
 
	 var viradoId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 Virado.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, virado) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!virado) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: virado
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function updateReference(request, response) {
 
	 var viradoId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 Virado.findByIdAndUpdate(update, { "$set": { "registros": { "code": codigo } } },  { safe: true, multi: true }, (err, virado) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!virado) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: virado
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function deleteVirado(request, response) {
	 var viradoId = request.params.id;
 
	 Virado.findByIdAndRemove(viradoId, (error, viradoRemoved) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!viradoRemoved) {
				 response.status(404).send({
					 message: 'La tarea no existe'
				 });
			 } else {
				 response.status(200).send({
					 virado: viradoRemoved
				 });
			 }
		 }
 
	 });
 }


module.exports = {
	saveVirado,
	getVirado,
	updateVirado,
	updateReference,
	deleteVirado
}