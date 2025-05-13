const { Dulce } = require('../models');

// Obtener todos los dulces
exports.obtenerDulces = async (req, res) => {
  try {
    const dulces = await Dulce.findAll();
    res.json(dulces);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los dulces', error });
  }
};

// Obtener un solo dulce por ID
exports.obtenerDulcePorId = async (req, res) => {
  try {
    const dulce = await Dulce.findByPk(req.params.id);
    if (!dulce) {
      return res.status(404).json({ message: 'Dulce no encontrado' });
    }
    res.json(dulce);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el dulce', error });
  }
};

// Crear un nuevo dulce
exports.crearDulce = async (req, res) => {
  try {
    const nuevoDulce = await Dulce.create(req.body);
    res.status(201).json(nuevoDulce);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el dulce', error });
  }
};

// Actualizar un dulce existente
exports.actualizarDulce = async (req, res) => {
  try {
    const dulce = await Dulce.findByPk(req.params.id);
    if (!dulce) {
      return res.status(404).json({ message: 'Dulce no encontrado' });
    }
    await dulce.update(req.body);
    res.json(dulce);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el dulce', error });
  }
};

// Eliminar un dulce
exports.eliminarDulce = async (req, res) => {
  try {
    const dulce = await Dulce.findByPk(req.params.id);
    if (!dulce) {
      return res.status(404).json({ message: 'Dulce no encontrado' });
    }
    await dulce.destroy();
    res.json({ message: 'Dulce eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el dulce', error });
  }
};