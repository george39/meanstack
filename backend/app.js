'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var warehouse1_routes = require('./routes/warehouse1');
var references_ruoutes = require('./routes/references');
//middlewares de body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configurar cabeceras y cors

//rutas base
app.use('/', user_routes);
app.use('/', warehouse1_routes);
app.use('/', references_ruoutes)

module.exports = app;
