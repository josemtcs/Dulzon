const { Categoria } = require('../models');
const categoria = require('../models/categoria');

// Obtener todas las categorias
exports.obtenerCategoria = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorias', error });
  }
};

// Obtener una sola categoria por ID
exports.obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoria', error });
  }
};

// Crear un nueva categoria
exports.crearCategoria = async (req, res) => {
  try {
    const nuevaCategoria = await Categoria.create(req.body);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la categoria', error });
  }
};

// Actualizar una categoria existente
exports.actualizarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    await categoria.update(req.body);
    res.json(categoria);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la categoria', error });
  }
};

// Eliminar una categoria
exports.eliminarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria no encontradada' });
    }
    await categoria.destroy();
    res.json({ message: 'Categoria eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoria', error });
  }
};