const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('DulcesDB', 'sa', '123456', {
    host: 'localhost',
    dialect: 'mssql',
    port: 1433,
    dialectModule: require('tedious'),
    logging: false,
    dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
});



module.exports = sequelize;