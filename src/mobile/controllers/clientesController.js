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

// Obtener clientes por empresa_id
const getClientesByEmpresa = async (req, res) => {
  try {
    const { empresa_id } = req.params;
    const clientes = await ClienteMobile.findAll({
      where: { empresa_id }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).send('Error fetching clients for the specified company');
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
  getClientesByEmpresa,
  syncClientes
};
