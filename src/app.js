const express = require('express');
const desktopClientesRoutes = require('./desktop/routes/clientesRoutes');
const desktopNotasPendientesRoutes = require('./desktop/routes/notasPendientesRoutes');

const app = express();

app.use(express.json());

app.use('/api/desktop/clientes', desktopClientesRoutes);
app.use('/api/desktop/notas-pendientes', desktopNotasPendientesRoutes);

app.get('/', (req, res) => {
  res.send('Servidor en funcionamiento');
});

module.exports = app;
