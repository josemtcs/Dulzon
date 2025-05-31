module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Compra', {
        id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        usuarioId:{
            type: DataTypes.INTEGER,
            reference:{model: 'usuarios', key: 'id'},
        },
        fecha:{type: DataTypes.DATE,defaultValue: DataTypes.NOW},
        total:{type: DataTypes.FLOAT},
            
        
        }, {
            tableName: 'compras',
            timestamps: false,
        });
    
}