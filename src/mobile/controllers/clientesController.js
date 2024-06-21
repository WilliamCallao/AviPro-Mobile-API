const ClienteMobile = require('../models/clientesMobile');
const ClienteDesktop = require('../../desktop/models/clientesDesktop');

// Obtener todos los clientes de móvil
const getClientesMobile = async (req, res) => {
  try {
    const clientes = await ClienteMobile.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).send('Error fetching mobile clients');
  }
};

// Endpoint para sincronizar datos desde la tabla de desktop
const syncClientes = async (req, res) => {
  try {
    const desktopClientes = await ClienteDesktop.findAll();
    await ClienteMobile.destroy({ where: {} }); // Borra todos los registros existentes
    const newClientes = await ClienteMobile.bulkCreate(desktopClientes.map(c => c.toJSON())); // Carga los nuevos datos
    res.status(201).json(newClientes);
  } catch (error) {
    res.status(500).send('Error syncing mobile clients');
  }
};

module.exports = {
  getClientesMobile,
  syncClientes
};
