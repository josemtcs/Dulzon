const express = require('express');
const router = express.Router();
const { Usuario } = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario.id, esAdmin: usuario.esAdmin }, 'secreto_super_seguro', process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, usuario: { nombre: usuario.nombre, email: usuario.email, esAdmin: usuario.esAdmin } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error });
  }
});

module.exports = router;
