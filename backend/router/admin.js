const express = require('express');
const router = express.Router();
const { autenticarToken, soloAdmin } = require('../middleware/auth');

// Solo accesible por administradores
router.get('/dashboard', autenticarToken, soloAdmin, (req, res) => {
  res.json({ message: 'Bienvenido al panel de administrador' });
});

module.exports = router;