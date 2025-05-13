module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Inventario', {
        id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        dulceId: {
            type: DataTypes.INTEGER,
            references: { model: 'dulces', key: 'id' }
        },
        cantidad:{type: DataTypes.INTEGER,allowNull: false},
        }, {
            tableName: 'inventario',
            timestamps: false,
        });
        
}
