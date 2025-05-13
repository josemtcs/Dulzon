const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categorias.controller');

// Obtener todos los dulces
router.get('/', CategoriaController.obtenerCategoria);

// Crear un nuevo dulce
router.post('/', CategoriaController.crearCategoria);

// Obtener un dulce por ID
router.get('/:id', CategoriaController.obtenerCategoriaPorId);

// Actualizar dulce
router.put('/:id', CategoriaController.actualizarCategoria);

// Eliminar dulce
router.delete('/:id', CategoriaController.eliminarCategoria);

module.exports = router;