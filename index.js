process.loadEnvFile();

const express = require('express');
const sequelize = require('./configs/database');
const bodyParser = require('body-parser');

const clienteRoutes = require('./routes/clientes.routes');
const notasPendientesRoutes = require('./routes/notasPendientes.routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(clienteRoutes);
app.use(notasPendientesRoutes);

app.get('/', (req, res) => {
  res.send('alive, alive!');
});

const startServer = async () => {
  let retries = 5;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.sync();
      console.log('Database synchronized.');
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        console.log(`         ) (`);
        console.log(`        (   ) )`);
        console.log(`         ) ( (`);
        console.log(`       _______)_`);
        console.log(`    .-'---------|`);
        console.log(`   ( c|         |`);
        console.log(`    '-.         |`);
        console.log(`      '_________'`);
        console.log(`       '-------'`);
      });
      break;
    } catch (err) {
      console.error('Unable to connect to the database:', err);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

startServer();
