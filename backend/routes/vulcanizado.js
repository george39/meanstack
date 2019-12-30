'use strict'

var express = require('express');
var VulcanizadoController = require('../controllers/vulcanizado');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.post('/addvulcanizado', md_auth.ensureAuth, VulcanizadoController.saveVulcanizado);
api.get('/getvulcanizado', VulcanizadoController.getVulcanizado);
api.put('/delete-item-vulcanizado', md_auth.ensureAuth, VulcanizadoController.updateVulcanizado);
api.delete('/deletevulcanizado/:id', md_auth.ensureAuth, VulcanizadoController.deleteVulcanizado);

module.exports = api;