const CobradorMobile = require('../models/cobradoresMobile');
const CobradorDesktop = require('../../desktop/models/cobradoresDesktop');

// Obtener todos los cobradores de móvil
const getCobradoresMobile = async (req, res) => {
  try {
    const cobradores = await CobradorMobile.findAll();
    res.json(cobradores);
  } catch (error) {
    res.status(500).send('Error fetching mobile collectors');
  }
};

// Obtener cobradores por empresa_id
const getCobradoresByEmpresaId = async (req, res) => {
  try {
    const { empresa_id } = req.params;
    const cobradores = await CobradorMobile.findAll({ where: { empresa_id } });
    res.json(cobradores);
  } catch (error) {
    res.status(500).send('Error fetching collectors by empresa_id');
  }
};

// Endpoint para sincronizar datos desde la tabla de desktop
const syncCobradores = async (req, res) => {
  try {
    const desktopCobradores = await CobradorDesktop.findAll();
    await CobradorMobile.destroy({ where: {} }); // Borra todos los registros existentes
    const newCobradores = await CobradorMobile.bulkCreate(desktopCobradores.map(c => c.toJSON())); // Carga los nuevos datos
    res.status(201).json(newCobradores);
  } catch (error) {
    res.status(500).send('Error syncing mobile collectors');
  }
};

module.exports = {
  getCobradoresMobile,
  getCobradoresByEmpresaId,
  syncCobradores
};
