'use strict'

//Cargamos el modulo de express
var express = require("express");

//Cargamos el controladord de proyect, ya que le hemos hecho un export podemos usarlo aquí
var ProyectController = require("../controllers/proyect");

var router = express.Router();

var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({uploadDir: "./uploads"});

//Creamos una ruta, parda el metodo home, creado en el controlador
router.get("/home", ProyectController.home);
router.post("/test", ProyectController.test);
router.post("/save-proyect", ProyectController.saveProyect);
router.get("/get-proyect/:id?", ProyectController.getProyect);
router.get("/get-proyects", ProyectController.getProyects);
router.put("/update-proyect/:id", ProyectController.updateProyect);
router.delete("/delete-proyect/:id", ProyectController.deleteProyect);
router.post("/upload-image/:id", multipartMiddleware, ProyectController.uploadImage);
router.get("/get-image/:image", ProyectController.getImageFile);

//Ya podemos usar la configuración de rutas en otro fichero
module.exports = router;