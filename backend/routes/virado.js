'use strict'

var express = require('express');
var ViradoController = require('../controllers/virado');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/virado', md_auth.ensureAuth, ViradoController.saveVirado);
api.get('/getvirado', ViradoController.getVirado);
api.put('/delete-item-virado', md_auth.ensureAuth, ViradoController.updateVirado);
api.delete('/deletevirado/:id', md_auth.ensureAuth, ViradoController.deleteVirado);


module.exports = api;