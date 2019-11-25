'use strict'

var express = require('express');
var api = express.Router();

var ValeTerminacionController = require('../controllers/vale.terminado');
var md_auth = require('../middlewares/authenticated');

api.post('/addvale-termination', ValeTerminacionController.saveValeTerminacion);
api.get('/getvales-termination', ValeTerminacionController.getValesTerminations);
api.get('/getvale-termination/:id', ValeTerminacionController.getValeTermination);
api.put('/delete-item-valetermination', ValeTerminacionController.updateValeTermination);
api.delete('/deletevale-termination/:id', ValeTerminacionController.deleteValeTermination);

module.exports = api;