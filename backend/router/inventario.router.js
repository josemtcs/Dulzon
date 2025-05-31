const express = require('express');
const router = express.Router();
const InventarioController = require('../controllers/inventario.controller');

// Obtener inventario
router.get('/', InventarioController.obtenerInventario);

// Crear inventario
router.post('/', InventarioController.crearInventario);


router.put('/:id', InventarioController.actualizarCantidad);

// Eliminar dulce por dulceid
router.delete('dulce/:id', InventarioController.eliminarPorDulceId);

module.exports = router;