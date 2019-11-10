'use strict'

var express = require('express');
var GuarnecidaExternaController = require('../controllers/guarnecida.externa');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/addguarnecida-externa', md_auth.ensureAuth, GuarnecidaExternaController.saveGuarnecidaExterna);
api.get('/getguarnecida-externa',  GuarnecidaExternaController.getGuarnecidas);
api.put('/delete-item-externa', md_auth.ensureAuth, GuarnecidaExternaController.updateGuarnecida);
api.delete('/deleteguarnecida-externa/:id', md_auth.ensureAuth, GuarnecidaExternaController.deleteGuarnecida);

module.exports = api;