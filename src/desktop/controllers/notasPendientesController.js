const NotaPendienteDesktop = require('../models/notasPendientesDesktop');

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

// Cargar datos desde un archivo JSON
const uploadJsonData = async (req, res) => {
  const notas = req.body;
  try {
    await NotaPendienteDesktop.destroy({ where: {} }); // Borra todos los registros existentes
    const newNotas = await NotaPendienteDesktop.bulkCreate(notas); // Carga los nuevos datos desde el JSON
    res.status(201).json(newNotas);
  } catch (error) {
    res.status(500).send('Error loading JSON data');
  }
};

module.exports = {
  getNotasPendientesDesktop,
  addNotaPendiente,
  uploadJsonData
};
