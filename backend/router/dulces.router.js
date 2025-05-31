const express = require('express');
const router = express.Router();
const DulceController = require('../controllers/dulces.controller');
const { autenticarToken, soloAdmin } = require('../middleware/auth');

// Rutas públicas
router.get('/', DulceController.obtenerDulces);
router.get('/:id', DulceController.obtenerDulcePorId);

// Rutas de administrador (requieren autenticación y rol admin)
router.post('/', autenticarToken, soloAdmin, DulceController.crearDulce);
router.put('/:id', autenticarToken, soloAdmin, DulceController.actualizarDulce);
router.delete('/:id', autenticarToken, soloAdmin, DulceController.eliminarDulce);

module.exports = router;