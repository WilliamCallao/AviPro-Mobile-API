const ClienteDesktop = require('../models/clientesDesktop');

// Obtener todos los clientes de escritorio
const getClientesDesktop = async (req, res) => {
  try {
    const clientes = await ClienteDesktop.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).send('Error fetching desktop clients');
  }
};

// Agregar un nuevo cliente de escritorio
const addCliente = async (req, res) => {
  try {
    const cliente = req.body;
    const newCliente = await ClienteDesktop.create(cliente);
    res.status(201).json(newCliente);
  } catch (error) {
    res.status(500).send('Error adding desktop client');
  }
};

module.exports = {
  getClientesDesktop,
  addCliente
};
