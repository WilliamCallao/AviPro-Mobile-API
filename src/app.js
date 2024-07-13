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
const desktopUsuariosRoutes = require('./desktop/routes/usuarioRoutes');
const mobileEmpresaRoutes = require('./mobile/routes/mobileEmpresaRoutes');
const mobileDispositivosRoutes = require('./mobile/routes/mobileDispositivosRoutes');
const mobileCobradoresRoutes = require('./mobile/routes/cobradoresRoutes');
const mobileClientesRoutes = require('./mobile/routes/clientesRoutes');
const mobileNotasPendientesRoutes = require('./mobile/routes/notasPendientesRoutes');
const mobileCuentasDepositoRoutes = require('./mobile/routes/cuentasDepositoRoutes');
const mobileNotasCobradasRoutes = require('./mobile/routes/notasCobradasRoutes');
const mobileLogsRoutes = require('./mobile/routes/logsRoutes');
const historialCobrosRoutes = require('./mobile/routes/historialCobrosRoutes');
const notasRoutes = require('./mobile/routes/notasRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/desktop/clientes', desktopClientesRoutes);
app.use('/api/desktop/notas-pendientes', desktopNotasPendientesRoutes);
app.use('/api/desktop/cobradores', desktopCobradoresRoutes);
app.use('/api/desktop/cuentas-deposito', desktopCuentasDepositoRoutes);
app.use('/api/desktop/notas-cobradas', desktopNotasCobradasRoutes);
app.use('/api/desktop/usuarios', desktopUsuariosRoutes);
app.use('/api/mobile/empresas', mobileEmpresaRoutes);
app.use('/api/mobile/dispositivos', mobileDispositivosRoutes);
app.use('/api/mobile/cobradores', mobileCobradoresRoutes);
app.use('/api/mobile/clientes', mobileClientesRoutes);
app.use('/api/mobile/notas-pendientes', mobileNotasPendientesRoutes);
app.use('/api/mobile/cuentas-deposito', mobileCuentasDepositoRoutes);
app.use('/api/mobile/notas-cobradas', mobileNotasCobradasRoutes);
app.use('/api/mobile/historial-cobros', historialCobrosRoutes);
app.use('/api/mobile/notas', notasRoutes);
app.use('/api/mobile/logs', mobileLogsRoutes);

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
