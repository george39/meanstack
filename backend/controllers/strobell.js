'use strict'

var fs = require('fs');
var path = require('path');

var Strobell = require('../models/strobell');

function saveStrobell(request, response){
	var strobell = new Strobell();
	var params = request.body;

	if (params.registros) {
		strobell.operator = params.operator;
		strobell.date = params.date;
		strobell.registros = params.registros;
		
		strobell.user_id = request.user.sub;

		strobell.save((error, strobellStored) => {
			if (error) {
				response.status(500).send({
					message: 'Error en el servidor'
				});
			}else{
				if (!strobellStored) {
					response.status(404).send({
						message: 'No se han podido guardar los datos'
					});
				}else{
					response.status(200).send({
						strobell: strobellStored
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


function getStrobell(request, response) {
	Strobell.find({}).populate({ path: 'user_id' }).exec((error, strobell) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!strobell) {
				 response.status(404).send({
					 message: 'No hay tareas'
				 });
			 } else {
 
 
 
				 response.status(200).send({
					 strobell
				 });
 
 
 
 
			 }
		 }
	 });
 }
 
 
 
 
 function updateStrobell(request, response) {
 
	 var strobellId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 Strobell.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, strobell) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!strobell) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: strobell
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function updateReference(request, response) {
 
	 var strobellId = request.params.id;
	 var war = request.params;
	 var update = request.body._id;
	 var codigo = request.body.code;
	 var idWarehouse = request.body.id;
 
 
	 Strobell.findByIdAndUpdate(update, { "$set": { "registros": { "code": codigo } } },  { safe: true, multi: true }, (err, strobell) => {
 
		 if (err) {
			 return response.status(500).json({
				 ok: false,
				 mensaje: 'Error al buscar usuario',
				 errors: err
			 });
		 } else {
			 if (!strobell) {
				 return response.status(404).json({
					 ok: false,
					 mensaje: "el codigo no existe"
				 });
			 } else {
 
				 response.status(200).json({
					 ok: true,
					 warehouse: strobell
				 });
			 }
		 }
 
	 });
 
 }
 
 
 function deleteStrobell(request, response) {
	 var strobellId = request.params.id;
 
	 Strobell.findByIdAndRemove(strobellId, (error, strobellRemoved) => {
		 if (error) {
			 response.status(500).send({
				 message: 'Error en la peticion'
			 });
		 } else {
			 if (!strobellRemoved) {
				 response.status(404).send({
					 message: 'La tarea no existe'
				 });
			 } else {
				 response.status(200).send({
					 strobell: strobellRemoved
				 });
			 }
		 }
 
	 });
 }


module.exports = {
	saveStrobell,
	getStrobell,	
	updateReference,
	updateStrobell,
	deleteStrobell
}