const CobradorDesktop = require('../models/cobradoresDesktop');

// Obtener todos los cobradores de escritorio
const getCobradoresDesktop = async (req, res) => {
  try {
    const cobradores = await CobradorDesktop.findAll();
    res.json(cobradores);
  } catch (error) {
    res.status(500).send('Error fetching desktop collectors');
  }
};

// Agregar un nuevo cobrador de escritorio
const addCobrador = async (req, res) => {
  try {
    const cobrador = req.body;
    const newCobrador = await CobradorDesktop.create(cobrador);
    res.status(201).json(newCobrador);
  } catch (error) {
    res.status(500).send('Error adding desktop collector');
  }
};

// Cargar datos desde un archivo JSON
const uploadJsonData = async (req, res) => {
  const cobradores = req.body;
  try {
    await CobradorDesktop.destroy({ where: {} }); // Borra todos los registros existentes
    const newCobradores = await CobradorDesktop.bulkCreate(cobradores); // Carga los nuevos datos desde el JSON
    res.status(201).json(newCobradores);
  } catch (error) {
    res.status(500).send('Error loading JSON data');
  }
};

module.exports = {
  getCobradoresDesktop,
  addCobrador,
  uploadJsonData
};
