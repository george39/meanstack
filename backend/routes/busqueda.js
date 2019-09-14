var express = require('express');

var app = express();

var Warehouse1 = require('../models/warehouse1');
var Warehouse2 = require('../models/warehouse2');
var Injection1 = require('../models/injection1');
var Injection2 = require('../models/injection2');
var Ojaleteado = require('../models/ojaleteado');
var Strobell = require('../models/strobell');
var Terminacion = require('../models/terminacion');
var Cementado = require('../models/cementado');
var Vulcanizado = require('../models/vulcanizado');
var GarnecidaExterna = require('../models/guarnecida.externa');
var GarnecidaInterna = require('../models/guarnecida.interna');
var Virado = require('../models/virado');
var ReprocesoCarlosJ = require('../models/reproceso.carlos.julio');

app.get('/todo/:busqueda', (req, res, nest) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            buscarWarehouse1(busqueda, regex),
            buscarWarehouse2(busqueda, regex),
            buscarInjection1(busqueda, regex),
            buscarInjection2(busqueda, regex),
            buscarCementado(busqueda, regex)
        ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                warehouse1: respuestas[0],
                warehouse2: respuestas[1],
                injection1: respuestas[2],
                injection2: respuestas[3],
                cementado: respuestas[4],
            });

        });

});

// ================================================
// Busqueda general de todo 
// ================================================


function buscarWarehouse1(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Warehouse1.find({ name: regex }, (err, warehouse1) => {
            if (err) {
                reject('Error al cargar wahehouse1', err);
            } else {
                resolve(warehouse1)
            }
        });
    });
}

function buscarWarehouse2(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Warehouse2.find({ name: regex }, (err, warehouse2) => {
            if (err) {
                reject('Error al cargar wahehouse2', err);
            } else {
                resolve(warehouse2)
            }
        });
    });
}

function buscarInjection1(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Injection1.find({ name: regex }, (err, injection1) => {
            if (err) {
                reject('Error al cargar Injeccion1', err);
            } else {
                resolve(injection1)
            }
        });
    });
}


function buscarInjection2(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Injection2.find({ name: regex }, (err, injection2) => {
            if (err) {
                reject('Error al cargar Injeccion2', err);
            } else {
                resolve(injection2)
            }
        });
    });
}

function buscarCementado(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Cementado.find({ name: regex }, (err, cementado) => {
            if (err) {
                reject('Error al cargar Cementado', err);
            } else {
                resolve(cementado)
            }
        });
    });
}



// ================================================
// Busqueda especifica 
// ================================================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {
    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {
        case 'troquelado':
            promesa = buscarTroquelado(busqueda, regex)
            break;

        case 'guarnedida.interna':
            promesa = buscarGuarnecidaI(busqueda, regex)
            break;

        case 'warehouse1':
            promesa = buscarWarehouse1(busqueda, regex)
            break;

        case 'warehouse2':
            promesa = guscarWarehouse2(busqueda, regex)
            break;
        case 'cementado':
            promesa = guscarCementado(busqueda, regex)
            break;

        case 'injection1':
            promesa = buscarInjection1(busqueda, regex)
            break;

        case 'injection2':
            promesa = buscarInjection2(busqueda, regex)
            break;

        case 'ojaleteado':
            promesa = buscarOjaleteado(busqueda, regex)
            break;

        case 'reproceso.cj':
            promesa = buscarReprocesoCj(busqueda, regex)
            break;

        case 'strobell':
            promesa = guscarStrobell(busqueda, regex)
            break;

        case 'terminacion':
            promesa = buscarTerminacion(busqueda, regex)
            break;

        case 'vulcanizado':
            promesa = buscarVulcanizado(busqueda, regex)
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda solo son, almacenes, troquelado, guarnecida e inyecciones',
                error: { message: 'Tipo de tabla/coleccion no válida' }


            });


    }

    promesa.then(data => {
        res.status(200).json({
            ok: true,
            [tabla]: data
        });
    });
});


module.exports = app;