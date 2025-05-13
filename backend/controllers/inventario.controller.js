const { Inventario,Dulce } = require('../models');
const inventario= require('../models/inventario');

// Obtener el inventario de dulces
exports.obtenerInventario = async (req, res) => {
  try {
    const inventario = await Inventario.findAll({
        include: {
                model: Dulce,
                attributes: ['nombre', 'precio', 'descripcion'] // muestra los campos que quieras
            }
    });
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ message: 'Error al tener el inventario', error });
  }
};

// Obtener una inventario por ID
exports.obtenerInventarioid = async (req, res) => {
  try {
    const inventario = await Inventario.findByPk(req.params.id);
    if (!inventario) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoria', error });
  }
};

// Crear un nueva categoria
exports.crearInventario = async (req, res) => {
  try {
    const nuevoInventario = await Inventario.create(req.body);
    res.status(201).json(nuevoInventario);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear inventario', error });
  }
};

// Actualizar una categoria existente
exports.actualizarInventario = async (req, res) => {
  try {
    const inventario = await Inventario.findByPk(req.params.id);
    if (!inventario) {
      return res.status(404).json({ message: 'inventario no encontrada' });
    }
    await categoria.update(req.body);
    res.json(inventario);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el inventario', error });
  }
};

// Eliminar una categoria
exports.eliminarinventario = async (req, res) => {
  try {
    const inventario = await Inventario.findByPk(req.params.id);
    if (!inventario) {
      return res.status(404).json({ message: 'Categoria no encontradada' });
    }
    await inventario.destroy();
    res.json({ message: 'Inventario eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el inventario ', error });
  }
};