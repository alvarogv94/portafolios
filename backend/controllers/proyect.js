'use strict'

var Proyect = require("../models/proyects");
var fs = require("fs");
var path = require("path");

var controller = {

	home: function(req, res) {
		return res.status(200).send({
			message: "Soy la home"
		});
	},

	test: function(req, res) {
		return res.status(200).send({
			message: "Soy la accion test"
		});
	},

	saveProyect: function(req, res) {

		console.log("Save proyect");
		//Creamos un objeto del modelo importado
		var proyect = new Proyect();

		//Guardamos los parámetros que nos llegan en la request
		var params = req.body;

		console.log("Save proyect - Params" + params);

		proyect.name = params.name;
		proyect.description = params.description;
		proyect.category = params.category;
		proyect.langs = params.langs;
		proyect.year = params.year;
		proyect.image = null;

		proyect.save((err, proyectStored) => {
			//Si error viene a true
			if(err) return res.status(500).send({message: "Error al guardar el documento"});

			//Si no se guarda proyectStored
			if(!proyectStored)  return res.status(404).send({message: "No se ha podido guardar el proyecto"});

			return res.status(200).send({proyect: proyectStored});

		});

	},

	getProyect: function(req, res) {
		//Recogemos un varlo que nos llega por la url, en este caso el proyectId
		var proyectId = req.params.id;

		if(proyectId == null) return res.status(404).send({message: "Id viene a null"});

		Proyect.findById(proyectId, (err, proyect) => {
			if(err) return res.status(500).send({message: "Error al devolver el documento"});

			if(!proyect)  return res.status(404).send({message: "El proyecto no existe"});

			return res.status(200).send({proyect: proyect});


		});
	},

	getProyects: function(req, res) {

		//El sort, con la opción de '+' para ordenar de mayor a menor, y si utilizamos '-' hará de menor a mayor
		Proyect.find({}).sort("+id").exec((err, proyects) => {
			
			if(err) return res.status(500).send({message: "Error al devolver los documento"});

			if(!proyects)  return res.status(404).send({message: "No hay proyectos para mostrar"});

			return res.status(200).send({proyect: proyects});

		});

	},
	updateProyect: function(req, res) {

		//Recogemos un varlo que nos llega por la url, en este caso el proyectId
		var proyectId = req.params.id;
		//Aquí recogemos la petición completa
		var update = req.body;

		//Le pasamos la id para saber que proyecto debe actualizar, y los datos irán en la variable update
		Proyect.findByIdAndUpdate(proyectId, update, {new: true}, (err, proyectUpdate) => {

			if(err) return res.status(500).send({message: "Error al actualizar los documento"});

			if(!proyectUpdate)  return res.status(404).send({message: "No hay proyectos para actualizar"});

			return res.status(200).send({proyect: proyectUpdate});
		});
	},

	deleteProyect: function(req, res) {
		//Recogemos un varlo que nos llega por la url, en este caso el proyectId
		var proyectId = req.params.id;
		
		Proyect.findByIdAndRemove(proyectId, (err, proyectDelete) => {

			if(err) return res.status(500).send({message: "Error al eliminar los documento"});

			if(!proyectDelete)  return res.status(404).send({message: "No hay proyectos para eliminar"});

			return res.status(200).send({proyect: proyectDelete});
		});
	},

	uploadImage: function(req, res) {

		var proyectId = req.params.id;

		var fileName = "no_found";

		if(req.files) {

			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split("\.");
			var fileExt = extSplit[1];

			if(fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif") {

				Proyect.findByIdAndUpdate(proyectId, {image: fileName}, {new: true}, (err, proyectUpdate) => {

					if(err) return res.status(500).send({message: "Error al actualizar la imagen del documento"});

					if(!proyectUpdate)  return res.status(404).send({message: "No hay proyectos para actualizar"});

					return res.status(200).send({files: req.files, nameFile: fileName});

				});
			} else {
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: "La extension no es valida"});
				});
			}
		} else {
			return res.status(200).send({message: fileName});			
		}
	},

	getImageFile: function(req, res) {

		var file = req.params.image;
		var path_file = "./uploads/" + file;

		//Comprobamos si el archivo existe
		//El objeto path lo importamos arriba
		fs.exists(path_file, (exists) => {
			if(exists) return res.sendFile(path.resolve(path_file));
				else res.status(200).send({
					message: "No existe la imagen"
				});
		});
	}
};

//exportamos los metodos del objecto controller para poder utilizarlos fuera
module.exports = controller;