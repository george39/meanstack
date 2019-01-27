'use strict'

function pruebas(request, response){
	response.status(200).send({
		message: 'Probando el controlador de usuarios'
	});
}

function saveUser(request, response){
	response.status(200).send({
		message: 'Metodo de registro'
	});
}

module.exports = {
	pruebas,
	saveUser
};