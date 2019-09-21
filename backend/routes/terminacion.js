'use strict'

var express = require('express');
var api = express.Router();

var TerminacionController = require('../controllers/terminacion');
var md_auth = require('../middlewares/authenticated');

api.post('/terminacion', md_auth.ensureAuth, TerminacionController.saveTerminacion);

module.exports = api;