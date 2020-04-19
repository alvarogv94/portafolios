'use strict'

//Cargamos los modulos necesarios
var express = require("express");
var bodyParser = require("body-parser");


var app = express();

//Cargamos archivos de Rutas
var project_routes = require("./rutes/proyect");

//Middlewares, capa o metodo que se ejecuta antes de ejecutar la acción de un controlador
app.use(bodyParser.urlencoded({extended:false}));

//Todo lo que le llegue lo transforme a JSON
app.use(bodyParser.json());

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use("/api",project_routes);

//Exportar la variable app que tiene toda la configuración
module.exports = app;