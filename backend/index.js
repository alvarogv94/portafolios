'use strict'

//Cargamos el modelu de moongose
var mongoose = require("mongoose");
var app = require("./app"); //Aquí almacenamos express
var port = 3700;

//Para realizar la conexión a la base de datos, indicandole que esto es una promesa
mongoose.Promise = global.Promise;

//Realizamos la conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/portafolio')
				.then(() => {
					//Para comprobar que la conexión es exitosa, utilizamos el método then
					console.log("Conexión a portafolio con éxito");

					//Creación del servidor
					app.listen(port, () => {
						console.log("Servidor corriendo correctamente en la url: localhost:3700");
					});

				})
				.catch(err => {
					//Utilizamos el método catch por si nos devolviera el parámetro err, con algún error
					console.log(err);
				});