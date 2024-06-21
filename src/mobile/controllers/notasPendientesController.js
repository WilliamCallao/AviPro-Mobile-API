const NotaPendienteMobile = require('../models/notasPendientesMobile');
const NotaPendienteDesktop = require('../../desktop/models/notasPendientesDesktop');

// Obtener todas las notas pendientes de móvil
const getNotasPendientesMobile = async (req, res) => {
  try {
    const notas = await NotaPendienteMobile.findAll();
    res.json(notas);
  } catch (error) {
    res.status(500).send('Error fetching mobile pending notes');
  }
};

// Endpoint para sincronizar datos desde la tabla de desktop
const syncNotasPendientes = async (req, res) => {
  try {
    const desktopNotas = await NotaPendienteDesktop.findAll();
    await NotaPendienteMobile.destroy({ where: {} }); // Borra todos los registros existentes
    const newNotas = await NotaPendienteMobile.bulkCreate(desktopNotas.map(n => n.toJSON())); // Carga los nuevos datos
    res.status(201).json(newNotas);
  } catch (error) {
    res.status(500).send('Error syncing mobile pending notes');
  }
};

module.exports = {
  getNotasPendientesMobile,
  syncNotasPendientes
};
