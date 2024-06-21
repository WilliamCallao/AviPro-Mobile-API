// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./configs/database');
const desktopClientesRoutes = require('./desktop/routes/clientesRoutes');
const desktopNotasPendientesRoutes = require('./desktop/routes/notasPendientesRoutes');
const desktopCobradoresRoutes = require('./desktop/routes/cobradoresRoutes');
const desktopCuentasDepositoRoutes = require('./desktop/routes/cuentasDepositoRoutes'); 
const desktopNotasCobradasRoutes = require('./desktop/routes/notasCobradasRoutes'); 
const mobileEmpresaRoutes = require('./mobile/routes/mobileEmpresaRoutes');
const mobileDispositivosRoutes = require('./mobile/routes/mobileDispositivosRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/desktop/clientes', desktopClientesRoutes);
app.use('/api/desktop/notas-pendientes', desktopNotasPendientesRoutes);
app.use('/api/desktop/cobradores', desktopCobradoresRoutes);
app.use('/api/desktop/cuentas-deposito', desktopCuentasDepositoRoutes);
app.use('/api/desktop/notas-cobradas', desktopNotasCobradasRoutes);
app.use('/api/mobile/empresas', mobileEmpresaRoutes);
app.use('/api/mobile/dispositivos', mobileDispositivosRoutes);

app.get('/api/saludo', (req, res) => {
  console.log(`saludando`);
  res.send('Hola');
});

app.get('/', (req, res) => {
  res.send('Servidor en funcionamiento');
});

// Sincroniza los modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
    console.log(`         ) (`);
    console.log(`        (   ) )`);
    console.log(`         ) ( (`);
    console.log(`         ) ( (`);
    console.log(`       _______)_`);
    console.log(`    .-'---------|`); 
    console.log(`   ( c|         |`);
    console.log(`    '-.         |`);
    console.log(`      '_________'`);
    console.log(`       '-------'`);
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });

module.exports = app;
