// controllers/cobradoresController.js

const CobradorMobile = require('../models/cobradoresMobile');

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

// Cargar datos desde un archivo JSON
const uploadJsonData = async (req, res) => {
  const cobradores = req.body;
  try {
    await CobradorMobile.destroy({ where: {} }); // Borra todos los registros existentes
    const newCobradores = await CobradorMobile.bulkCreate(cobradores); // Carga los nuevos datos desde el JSON
    res.status(201).json(newCobradores);
  } catch (error) {
    res.status(500).send('Error loading JSON data');
  }
};

module.exports = {
  getCobradoresMobile,
  getCobradoresByEmpresaId,
  uploadJsonData
};
