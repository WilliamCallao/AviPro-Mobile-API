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
  res.send('Welcome to Avi Pro!')
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized.');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });