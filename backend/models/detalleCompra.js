module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DetalleCompra', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    compraId: {
      type: DataTypes.INTEGER,
      references: { model: 'compras', key: 'id' }
    },
    dulceId: {
      type: DataTypes.INTEGER,
      references: { model: 'dulces', key: 'id' }
    },
    cantidad: { type: DataTypes.INTEGER },
    precioUnitario: { type: DataTypes.FLOAT }
  }, {
    tableName: 'detalle_compras',
    timestamps: false
  });
};