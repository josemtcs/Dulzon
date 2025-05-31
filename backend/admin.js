const express = require('express');
const app = express();
const dulceRoutes = require('./router/dulces.router'); // Asegúrate que este path sea correcto
const { autenticarToken, soloAdmin } = require('./middleware/auth'); // Asegúrate de que el archivo existe
const inventarioRoutes = require('./router/inventario.router'); // Asegúrate que este path sea correcto
app.use(express.json());

// Protege las rutas del admin con autenticarToken y soloAdmin
//app.use('/api/admin/dulces', autenticarToken, soloAdmin, dulceRoutes);
//app.use('/api/admin/inventario', autenticarToken, soloAdmin, inventarioRoutes);

module.exports = app;