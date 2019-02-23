'use strict'

var express = require('express');
var TroqueladoController = require('../controllers/troquelado');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/troquelado', md_auth.ensureAuth, TroqueladoController.saveTroquelado);

module.exports = api;