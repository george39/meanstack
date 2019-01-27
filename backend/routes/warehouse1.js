'use strict'


//acciones
var express = require('express');
var Warehouse1Controller = require('../controllers/warehouse1');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.get('/pruebas-warehouse1', md_auth.ensureAuth, Warehouse1Controller.pruebas);


module.exports = api;