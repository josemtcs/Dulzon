const { Inventario,Dulce } = require('../models');
const inventario= require('../models/inventario');

// Obtener el inventario de dulces
exports.obtenerInventario = async (req, res) => {
  try {
    const inventario = await Inventario.findAll({
      include: {
        model: Dulce,
        attributes: ['id', 'nombre', 'precio', 'descripcion']
      }
    });

    res.json(inventario);
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    res.status(500).json({ message: 'Error al obtener inventario', error });
  }
};

exports.crearInventario = async (req, res) => {
  try {
    const nuevoInventario = await Inventario.create(req.body);
    res.status(201).json(nuevoInventario);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear inventario', error });
  }
};


exports.actualizarCantidad = async (req, res) => {
  try {
    console.log('ID recibido:', req.params.id);
    console.log('Cantidad recibida:', req.body.cantidad);

    // Buscar el item del inventario por dulceId
    const item = await Inventario.findOne({ where: { dulceId: req.params.id } });
    
    if (!item) {
      return res.status(404).json({ message: 'Inventario no encontrado para el dulce' });
    }

   
    const [updatedRowsCount] = await Inventario.update(
      { cantidad: req.body.cantidad },
      { where: { dulceId: req.params.id } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'No se pudo actualizar el inventario' });
    }

    
    const itemActualizado = await Inventario.findOne({ 
      where: { dulceId: req.params.id },
      include: {
        model: Dulce,
        attributes: ['id', 'nombre', 'precio', 'descripcion']
      }
    });

    res.json({ 
      message: 'Cantidad actualizada exitosamente', 
      item: itemActualizado 
    });

  } catch (error) {
    console.error('Error al actualizar inventario:', error);
    res.status(500).json({ message: 'Error al actualizar inventario', error: error.message });
  }
};
// Eliminar una categoria
exports.eliminarPorDulceId = async (req, res) => {
  await Inventario.destroy({ where: { dulceId: req.params.id} });
  res.json({ message: 'Inventario eliminado' });
};