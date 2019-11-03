'use strict'

var express = require('express');
var api = express.Router();

var StrobellController = require('../controllers/strobell');
var md_auth = require('../middlewares/authenticated');

api.post('/addstrobell', md_auth.ensureAuth, StrobellController.saveStrobell);
api.get('/getstrobell', md_auth.ensureAuth, StrobellController.getStrobell);
api.put('/delete-item-strobell', md_auth.ensureAuth, StrobellController.updateStrobell);
api.delete('/deletestrobell', md_auth.ensureAuth, StrobellController.deleteStrobell);

module.exports = api;
