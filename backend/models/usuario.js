module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Usuario', {
        id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        nombre:{type: DataTypes.STRING,allowNull: false},
        email:{type: DataTypes.STRING,allowNull: false},
        password:{type: DataTypes.STRING,allowNull: false},
        esAdmin: { type: DataTypes.BOOLEAN, allowNull: false  },
        rolId:{
            type: DataTypes.INTEGER,
            reference:{model: 'roles', key: 'id'},
        },
        },{
            tableName: 'usuarios',
            timestamps: false,
        });
    }