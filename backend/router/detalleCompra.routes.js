const express = require('express');
const router = express.Router();
const detalleCompraController = require('../controllers/detalleCompra.controller');

router.get('/:compraId', detalleCompraController.obtenerDetallesCompra);

module.exports = router;