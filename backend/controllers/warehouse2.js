'use strict'


var fs = require('fs');
var path = require('path');


var Warehouse2 = require('../models/warehouse2');

function pruebas(request, response) {
    response.status(200).send({
        message: 'Probando el controlador de warehouse1'
    });
}

function saveWarehouse2(request, response) {
    var warehouse2 = new Warehouse2();
    var params = request.body;
    var rg = params.registros;

    if (params.registros) {


        warehouse2.registros = params.registros;
        warehouse2.date = params.date;
        warehouse2.clasification = params.clasification;
        warehouse2.user_id = request.user.sub;



        warehouse2.save((error, warehouse2Stored) => {
            if (error) {
                response.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!warehouse2Stored) {
                    response.status(404).send({
                        message: 'No se ha podido crear el registro'
                    });
                } else {
                    response.status(200).send({
                        Warehouse2: warehouse2Stored
                    });
                }
            }
        });



    } else {
        response.status(200).send({
            message: 'El nombre es obligatorio'
        });
    }
}

function getWarehouses2(request, response) {
    Warehouse2.find({}).populate({ path: 'user_id' }).exec((error, warehouse2) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!warehouse2) {
                response.status(404).send({
                    message: 'No hay tareas'
                });
            } else {



                response.status(200).send({
                    warehouse2
                });




            }
        }
    });
}

function getWarehouse2(request, response) {
    var warehouse2Id = request.params.id;

    Warehouse2.findById(warehouse2Id).populate({ path: 'user_id' }).exec((error, warehouse2) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!warehouse2) {
                response.status(404).send({
                    message: 'La tarea no existe'
                });
            } else {
                response.status(200).send({
                    warehouse2
                });
            }
        }
    });
}


function updateWarehouses2(request, response) {

    var warehouse2Id = request.params.id;
    var war = request.params;
    var update = request.body._id;
    var codigo = request.body.code;
    var idWarehouse = request.body.id;


    Warehouse2.findByIdAndUpdate(update, { "$pull": { "registros": { "code": codigo } } }, { safe: true, multi: true }, (err, warehouse2) => {

        if (err) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        } else {
            if (!warehouse2) {
                return response.status(404).json({
                    ok: false,
                    mensaje: "el codigo no existe"
                });
            } else {

                response.status(200).json({
                    ok: true,
                    warehouse: warehouse2
                });
            }
        }

    });

}


function updateReference(request, response) {

    var warehouse2Id = request.params.id;
    var war = request.params;
    var update = request.body._id;
    var codigo = request.body.code;
    var idWarehouse = request.body.id;


    Warehouse2.findByIdAndUpdate(update, { "$set": { "registros": { "code": codigo } } },  { safe: true, multi: true }, (err, warehouse2) => {

        if (err) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        } else {
            if (!warehouse2) {
                return response.status(404).json({
                    ok: false,
                    mensaje: "el codigo no existe"
                });
            } else {

                response.status(200).json({
                    ok: true,
                    warehouse2: warehouse2
                });
            }
        }

    });

}




function deleteWarehouse2(request, response) {
    var warehouse2Id = request.params.id;

    Warehouse2.findByIdAndRemove(warehouse2Id, (error, warehouse2Removed) => {
        if (error) {
            response.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!warehouse2Removed) {
                response.status(404).send({
                    message: 'La tarea no existe'
                });
            } else {
                response.status(200).send({
                    warehouse2: warehouse2Removed
                });
            }
        }

    });
}



module.exports = {
    pruebas,
    saveWarehouse2,
    getWarehouses2,
    getWarehouse2,
    updateWarehouses2,
    deleteWarehouse2,
    updateReference,
    
    
};