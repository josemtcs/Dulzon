const { Compra, DetalleCompra, Inventario, Rol } = require('../models');

exports.crearCompra = async (req, res) => {
  const { rolId, items } = req.body;

  try {
  
    const rol = await Rol.findByPk(rolId);
    if (!rol) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    const nuevaCompra = await Compra.create({ rolId });

    for (const item of items) {
      await DetalleCompra.create({
        compraId: nuevaCompra.id,
        dulceId: item.dulceId,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario
      });

    
      const inventario = await Inventario.findOne({ where: { dulceId: item.dulceId } });
      if (!inventario || inventario.cantidad < item.cantidad) {
        return res.status(400).json({ message: 'Inventario insuficiente' });
      }

      inventario.cantidad -= item.cantidad;
      await inventario.save();
    }

    res.status(200).json({
      message: 'Compra realizada con éxito',
      compra: nuevaCompra,
      detalles: items
    });
  } catch (error) {
    console.error('Error en la compra:', error);
    res.status(500).json({ message: 'Error al procesar la compra' });
  }
};