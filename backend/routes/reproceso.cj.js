'use strict'

var express = require('express');
var api = express.Router();

var ReprocesoController = require('../controllers/reproceso.cj');

var md_auth = require('../middlewares/authenticated');

api.post('/addreproceso', md_auth.ensureAuth, ReprocesoController.saveReproceso);
api.post('/getreproceso', md_auth.ensureAuth, ReprocesoController.getReproceso);
api.post('/delete-item-reproceso', md_auth.ensureAuth, ReprocesoController.updateReproceso);
api.post('/deletereproceso', md_auth.ensureAuth, ReprocesoController.deleteReproceso);

module.exports = api;