const express = require('express');
const cors = require('cors');
const sequelize = require('./config');
require('dotenv').config();



const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

sequelize.sync({alter: true}) // Cambia a true si deseas reiniciar la base de datos
  .then(() => {
    console.log('Base de datos conectada y sincronizada ');
})
  .catch((err) => {
    console.error('Error al conectar la base de datos:', err);
});




// Importar las rutas
app.use('/api/dulces', require('./router/dulces.router'));
app.use('/api/categorias', require('./router/categoria.router'));
app.use('/api/inventario', require('./router/inventario.router'));
app.use('/api/login', require('./router/auth'));
app.use('/api/register', require('./router/register'));
app.use('/api/compras', require('./router/compra.router'));
app.use('/api/detallecompra', require('./router/detalleCompra.routes'));

// Rutas de administrador (requieren token y rol admin)
app.use(require('./admin'));

//Ruta principal
app.get('/', (req, res) => {
  res.send('API de Dulcería funcionando');
});

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}


