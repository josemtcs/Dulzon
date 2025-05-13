module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Dulce', {
        id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        nombre:{type: DataTypes.STRING,allowNull: false},
        descripcion:{type: DataTypes.STRING},
        precio:{type: DataTypes.FLOAT,allowNull:false},
        categoriaId:{
            type: DataTypes.INTEGER,
            reference:{model: 'categorias', key: 'id'},
        },
    }, {
        tableName: 'dulces',
        timestamps: false,
    });
}