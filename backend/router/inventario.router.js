const express = require('express');
const router = express.Router();
const InventarioController = require('../controllers/inventario.controller');

// Obtener inventario
router.get('/', InventarioController.obtenerInventario);

// Crear inventario
router.post('/', InventarioController.crearInventario);

// Obtener un dulce por ID
router.get('/:id', InventarioController.obtenerInventarioid);

// Actualizar dulce
router.put('/:id', InventarioController.actualizarInventario);

// Eliminar dulce
router.delete('/:id', InventarioController.eliminarinventario);

module.exports = router;