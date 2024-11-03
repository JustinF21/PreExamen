let express = require('express');
let router = express.Router();
 
//Importar tablas
const usuarios = require('../controllers/usuario.controller.js');
const libros = require('../controllers/libro.controller.js');
const autores = require('../controllers/autor.controller.js');

//Tabla usuarios
router.post('/api/usuarios/create', usuarios.create);
router.get('/api/usuarios/onebyid/:id', usuarios.getUsuarioById);
router.put('/api/usuarios/update/:id', usuarios.updateById);
router.delete('/api/usuarios/delete/:id', usuarios.deleteById);

//Tabla libros
router.post('/api/libros/create', libros.create);
router.get('/api/libros/onebyid/:id', libros.getLibroById);
router.put('/api/libros/update/:id', libros.updateById);
router.delete('/api/libros/delete/:id', libros.deleteById);

//Tabla autores
router.post('/api/autores/create', autores.create);
router.get('/api/autores/onebyid/:id', autores.getAutorById);
router.put('/api/autores/update/:id', autores.updateById);
router.delete('/api/autores/delete/:id', autores.deleteById);

module.exports = router;