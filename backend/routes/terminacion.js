'use strict'

var express = require('express');
var api = express.Router();

var TerminacionController = require('../controllers/terminacion');
var md_auth = require('../middlewares/authenticated');

api.post('/addtermination', TerminacionController.saveTerminacion);
api.get('/gettermination', TerminacionController.getTermination);
api.put('/delete-item-termination', TerminacionController.updateTermination);
api.delete('/deletetermination/:id', TerminacionController.deleteTermination);

module.exports = api;