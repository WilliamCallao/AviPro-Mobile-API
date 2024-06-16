const NotaPendienteDesktop = require('../models/notasPendientesDesktop');
const testData = require('./notasPendientesTestData.json'); // Asegúrate de que esta ruta sea correcta

// Obtener todas las notas pendientes de escritorio
const getNotasPendientesDesktop = async (req, res) => {
  try {
    const notas = await NotaPendienteDesktop.findAll();
    res.json(notas);
  } catch (error) {
    res.status(500).send('Error fetching desktop pending notes');
  }
};

// Agregar una nueva nota pendiente de escritorio
const addNotaPendiente = async (req, res) => {
  try {
    const nota = req.body;
    const newNota = await NotaPendienteDesktop.create(nota);
    res.status(201).json(newNota);
  } catch (error) {
    res.status(500).send('Error adding desktop pending note');
  }
};

// Cargar datos de prueba
const loadTestData = async (req, res) => {
  try {
    await NotaPendienteDesktop.destroy({ where: {} }); // Borra todos los registros existentes
    const newNotas = await NotaPendienteDesktop.bulkCreate(testData); // Carga los nuevos datos desde el JSON
    res.status(201).json(newNotas);
  } catch (error) {
    res.status(500).send('Error loading test data');
  }
};

module.exports = {
  getNotasPendientesDesktop,
  addNotaPendiente,
  loadTestData
};
