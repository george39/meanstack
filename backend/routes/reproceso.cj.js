'use strict'

var express = require('express');
var api = express.Router();

var ReprocesoController = require('../controllers/reproceso.cj');

var md_auth = require('../middlewares/authenticated');

api.post('/addreproceso', md_auth.ensureAuth, ReprocesoController.saveReproceso);
api.get('/getreproceso', ReprocesoController.getReproceso);
api.put('/delete-item-reproceso', md_auth.ensureAuth, ReprocesoController.updateReproceso);
api.delete('/deletereproceso/:id', md_auth.ensureAuth, ReprocesoController.deleteReproceso);

module.exports = api;