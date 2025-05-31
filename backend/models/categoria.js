module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Categoria', {
        id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        nombre:{type: DataTypes.STRING,allowNull: false},
        }, {
            tableName: 'categorias',
            timestamps: false,
        });
}