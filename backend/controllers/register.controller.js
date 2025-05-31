const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { nombre, email, password, rolId, esAdmin } = req.body;

    try {
       
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = await Usuario.create({
            nombre,
            email,
            password: hashedPassword,
            rolId: rolId ,  // Acepta rolId si se envía, sino null
            esAdmin: esAdmin 
        });

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: {
                id: newUser.id,
                nombre: newUser.nombre,
                email: newUser.email,
                rolId: newUser.rolId,
                esAdmin: newUser.esAdmin
            }
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};