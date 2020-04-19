'use strict'

var mongoose = require("mongoose");

//Definiremos un esquema de un modelo
var Schema = mongoose.Schema;

var ProyectSchema = Schema({
	name: String,
	description: String,
	category: String,
	langs: String,
	year: Number,
	image: String
});

//Lo exportamos para poder utilizar este modelo en otro fichero
//Los parametros son, la colección que queremos guardar y el esquema creado
module.exports = mongoose.model("proyects",ProyectSchema);