const ClienteDesktop = require('../models/clientesDesktop');
const testData = require('./clientesTestData.json');

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

// Cargar datos de prueba
const loadTestData = async (req, res) => {
  try {
    await ClienteDesktop.destroy({ where: {} }); // Borra todos los registros existentes
    const newClientes = await ClienteDesktop.bulkCreate(testData); // Carga los nuevos datos desde el JSON
    res.status(201).json(newClientes);
  } catch (error) {
    res.status(500).send('Error loading test data');
  }
};

module.exports = {
  getClientesDesktop,
  addCliente,
  loadTestData
};
