'use strict'
// cargar modulos
var bcrypt = require('bcrypt-nodejs');

// cargar modelos

//acciones
var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/pruebas', UserController.pruebas);
api.post('/register', UserController.saveUser);

module.exports = api;