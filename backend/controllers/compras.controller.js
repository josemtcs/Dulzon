const { Categoria } = require('../models');

// Obtener todos los dulces
exports.obtenerCategoria = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorias', error });
  }
};

// Obtener una sola cateogoria
exports.obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await Dulce.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    res.json(categoria);
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