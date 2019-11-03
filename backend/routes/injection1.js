'use strict'

var express = require('express');
var Injection1Controller = require('../controllers/injection1');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/addinjection1', md_auth.ensureAuth, Injection1Controller.saveInjection1);
api.get('/getinjection1', md_auth.ensureAuth, Injection1Controller.getInjection1);
api.delete('/deleteinjection1', md_auth.ensureAuth, Injection1Controller.deleteInjection1);
api.put('/delete-item-injection1', md_auth.ensureAuth, Injection1Controller.updateInjection1);

module.exports = api;