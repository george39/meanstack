'use strict'

var express = require('express');
var GuarnecidaInternaController = require('../controllers/guarnecida.interna');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/guarnecida-interna', md_auth.ensureAuth, GuarnecidaInternaController.saveGuarnecidaInterna);

module.exports = api;
