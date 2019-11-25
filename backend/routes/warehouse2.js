'use strict'

var express = require('express');
var Warehouse2Controller = require('../controllers/warehouse2');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/addwarehouse2', md_auth.ensureAuth, Warehouse2Controller.saveWarehouse2);
api.post('/getwarehouse2', md_auth.ensureAuth, Warehouse2Controller.saveWarehouse2);
api.get('/getwarehouses2', Warehouse2Controller.getWarehouses2);
api.put('/delete-item-warehouse2', Warehouse2Controller.updateWarehouses2);
api.put('/updatereference-warehouse2', Warehouse2Controller.updateReferenceWarehouse2);
api.delete('/deletewarehouse2/:id', Warehouse2Controller.deleteWarehouse2);


module.exports = api; 
