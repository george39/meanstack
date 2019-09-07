'use strict'

var express = require('express');
var TareaUnidadController = require('../controllers/tareaUnidad');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/tareaunidad', md_auth.ensureAuth, TareaUnidadController.saveTareaUnidad);
api.get('/gethomeworkunit', TareaUnidadController.getHomeworkUnit);
api.delete('/deletehomeworkunit/:id', md_auth.ensureAuth, TareaUnidadController.deleteTareaUnidad);

module.exports = api;