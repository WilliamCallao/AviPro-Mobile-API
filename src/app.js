const express = require('express');
const cors = require('cors');
const sequelize = require('./configs/database');
const desktopClientesRoutes = require('./desktop/routes/clientesRoutes');
const desktopNotasPendientesRoutes = require('./desktop/routes/notasPendientesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/desktop/clientes', desktopClientesRoutes);
app.use('/api/desktop/notas-pendientes', desktopNotasPendientesRoutes);

app.get('/', (req, res) => {
  res.send('Servidor en funcionamiento');
});

// Sincroniza los modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });

module.exports = app;
