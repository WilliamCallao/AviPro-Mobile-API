const NotasCobradasMobile = require('../models/notasCobradasMobile');
const NotasCobradasDesktop = require('../../desktop/models/notasCobradasDesktop');

// Obtener todas las notas cobradas móviles
const getNotasCobradasMobile = async (req, res) => {
  try {
    const notas = await NotasCobradasMobile.findAll();
    res.json(notas);
  } catch (error) {
    res.status(500).send('Error fetching mobile collected notes');
  }
};

// Endpoint para sincronizar datos desde la tabla de desktop
const syncNotasCobradas = async (req, res) => {
  try {
    const desktopNotas = await NotasCobradasDesktop.findAll();
    await NotasCobradasMobile.destroy({ where: {} }); // Borra todos los registros existentes
    const newNotas = await NotasCobradasMobile.bulkCreate(desktopNotas.map(n => n.toJSON())); // Carga los nuevos datos
    res.status(201).json(newNotas);
  } catch (error) {
    res.status(500).send('Error syncing mobile collected notes');
  }
};

module.exports = {
  getNotasCobradasMobile,
  syncNotasCobradas
};
