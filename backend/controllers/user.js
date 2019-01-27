'use strict'

// cargar modulos
var bcrypt = require('bcrypt-nodejs');

// cargar modelos
var User = require('../models/user');

function pruebas(request, response){
	response.status(200).send({
		message: 'Probando el controlador de usuarios'
	});
}

//acciones

// Metodo para guardar un usuario
function saveUser(request, response){
	//crear objeto usuario
	var user = new User();

	//recoger parametros
	var params = request.body;	

	if (params.password && params.name && params.nick) {
		// Asignar valores al objeto usuario
		user.name = params.name;
		user.surname = params.surname;
		user.nick = params.nick;
		user.role = 'ROLE_USER';
		user.section = params.section;


		User.findOne({nick: user.nick.toLowerCase()}, (error, issetUser) => {
			if (error) {
				response.status(500).send({message: 'Error al comprobar usuario'});
			}else{
				if (!issetUser) {
					bcrypt.hash(params.password, null, null, function(error, hash){
					user.password = hash;

					//guardar usuario en bd
					user.save((error, userStored) => {
						if (error) {
							response.status(500).send({message: 'Error al guardar el usuario'});
						}else{
							if (!userStored) {
								response.status(404).send({message: 'No se ha guardado el usuario'});
							}else{
								response.status(200).send({user: userStored});
							}
						}
					});
				});
				}else{
					response.status(200).send({
					message: 'El usuario no se ha guardado porque ya existe'
					});
				}
			}
		});
			
	}else{
		response.status(200).send({
		message: 'Introduce los datos correctamente'
		});
	}

	
}

// Metodo de login
function login(request, response){
	var params = request.body;

	var nick = params.nick;
	var password = params.password;
	User.findOne({nick: nick.toLowerCase()}, (error, user) => {
			if (error) {
				response.status(500).send({message: 'Error al comprobar usuario'});
			}else{
				if (user) {
					bcrypt.compare(password, user.password, (error, check) => {
						if (check) {
							response.status(200).send({user})
						}else{
							response.status(404).send({
								message: 'El usuario no ha podido loguearse correctamente'
							});
						}
					});
					
				}else{
					response.status(404).send({
					message: 'El usuario no ha podido loguearse'
					});
				}
			}
	});
}

module.exports = {
	pruebas,
	saveUser,
	login
};