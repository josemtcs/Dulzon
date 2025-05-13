const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config');
const usuario = require('./usuario');

const Rol = require('./rol')(sequelize, DataTypes);
const Usuario = require('./usuario')(sequelize, DataTypes);
const Categoria = require('./categoria')(sequelize, DataTypes);
const Dulce = require('./dulce')(sequelize, DataTypes);
const Inventario = require('./inventario')(sequelize, DataTypes);
const Compra= require('./compra')(sequelize, DataTypes);
const DetalleCompra= require('./detalleCompra')(sequelize, DataTypes);


Rol.hasMany(Usuario, { foreignKey: 'rolId' });
Usuario.belongsTo(Rol, { foreignKey: 'rolId' });

Usuario.hasMany(Compra, { foreignKey: 'usuarioId' });
Compra.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Categoria.hasMany(Dulce, { foreignKey: 'categoriaId' });
Dulce.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Dulce.hasMany(Inventario, { foreignKey: 'dulceId' });
Inventario.belongsTo(Dulce, { foreignKey: 'dulceId' });

Compra.hasMany(DetalleCompra, { foreignKey: 'compraId' });
DetalleCompra.belongsTo(Compra, { foreignKey: 'compraId' });

Dulce.hasMany(DetalleCompra, { foreignKey: 'dulceId' });
DetalleCompra.belongsTo(Dulce, { foreignKey: 'dulceId' });

module.exports = {
  sequelize,
  Rol,
  Usuario,
  Categoria,
  Dulce,
  Inventario,
  Compra,
  DetalleCompra
};