const { DetalleCompra, Dulce } = require('../models');

exports.obtenerDetallesCompra = async (req, res) => {
  const { compraId } = req.params;

  try {
    const detallesCompra = await DetalleCompra.findAll({
      where: { compraId: compraId },
      include: [
        {
          model: Dulce,
          attributes: ['id', 'nombre']
        }
      ]
    });

    if (detallesCompra.length === 0) {
      return res.status(404).json({ message: 'No se encontraron detalles de compra para esta compra' });
    }

    res.json(detallesCompra);
  } catch (error) {
    console.error('Error al obtener detalles de compra:', error);
    res.status(500).json({ message: 'Error al obtener detalles de compra', error: error.message });
  }
};