const express = require('express');
const router = express.Router();
const DulceController = require('../controllers/dulces.controller');

// Obtener todos los dulces
router.get('/', DulceController.obtenerDulces);

// Crear un nuevo dulce
router.post('/', DulceController.crearDulce);

// Obtener un dulce por ID
router.get('/:id', DulceController.obtenerDulcePorId);

// Actualizar dulce
router.put('/:id', DulceController.actualizarDulce);

// Eliminar dulce
router.delete('/:id', DulceController.eliminarDulce);

module.exports = router;