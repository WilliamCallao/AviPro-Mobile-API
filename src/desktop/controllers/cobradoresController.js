const CobradorDesktop = require('../models/cobradoresDesktop');
const testData = require('./cobradoresTestData.json');

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

// Cargar datos de prueba
const loadTestData = async (req, res) => {
  try {
    await CobradorDesktop.destroy({ where: {} }); // Borra todos los registros existentes
    const newCobradores = await CobradorDesktop.bulkCreate(testData); // Carga los nuevos datos desde el JSON
    res.status(201).json(newCobradores);
  } catch (error) {
    res.status(500).send('Error loading test data');
  }
};

module.exports = {
  getCobradoresDesktop,
  addCobrador,
  loadTestData
};
