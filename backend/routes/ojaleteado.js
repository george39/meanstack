'use strict'

var express = require('express');
var OjaleteadoController = require('../controllers/ojaleteado');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/ojaleteado', md_auth.ensureAuth, OjaleteadoController.saveOjaleteado);
api.get('/getojaleteado', OjaleteadoController.getOjaleteado);
api.put('/delete-item-ojaleteado', md_auth.ensureAuth, OjaleteadoController.updateOjaleteado);
api.delete('/deleteojaleteado/:id', md_auth.ensureAuth, OjaleteadoController.deleteOjaleteado);

module.exports = api;
