'use strict'

var express = require('express');
var GuarnecidaInternaController = require('../controllers/guarnecida.interna');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/guarnecida-interna', md_auth.ensureAuth, GuarnecidaInternaController.saveGuarnecidaInterna);
api.put('/deleteitem', GuarnecidaInternaController.updateGuarnecida);
api.put('/update-canasta/:id', GuarnecidaInternaController.updateCanasta);
api.get('/getguarnecidas',  GuarnecidaInternaController.getGuarnecidas);
api.delete('/deleteguarnecida/:id', GuarnecidaInternaController.deleteGuarnecida);

module.exports = api;