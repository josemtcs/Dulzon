const express = require('express');
const cors = require('cors');
const sequelize = require('./config');


const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());


sequelize.sync() // Cambia a true si deseas reiniciar la base de datos
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

//Ruta principal
app.get('/', (req, res) => {
  res.send('API de Dulcería funcionando');
});



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


