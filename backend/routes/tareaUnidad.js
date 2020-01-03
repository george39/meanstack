'use strict'

var express = require('express');
var TareaUnidadController = require('../controllers/tareaUnidad');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

api.post('/tareaunidad', md_auth.ensureAuth, TareaUnidadController.saveTareaUnidad);
api.get('/gethomeworks-unit', TareaUnidadController.getHomeworksUnit);
api.get('/gethomework-unit/:id', TareaUnidadController.getHomeworkUnit);
api.put('/update-tarea-unidad/:id', TareaUnidadController.updateTareaUnidad)
api.delete('/deletehomeworkunit/:id', TareaUnidadController.deleteTareaUnidad);

module.exports = api;