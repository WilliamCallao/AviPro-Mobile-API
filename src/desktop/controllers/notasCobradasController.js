const NotasCobradasDesktop = require('../models/notasCobradasDesktop');

// Obtener todas las notas cobradas de escritorio
const getNotasCobradasDesktop = async (req, res) => {
  try {
    const notas = await NotasCobradasDesktop.findAll();
    res.json(notas);
  } catch (error) {
    res.status(500).send('Error fetching desktop collected notes');
  }
};

// Agregar una nueva nota cobrada de escritorio
const addNotaCobrada = async (req, res) => {
  try {
    const nota = req.body;
    const newNota = await NotasCobradasDesktop.create(nota);
    res.status(201).json(newNota);
  } catch (error) {
    res.status(500).send('Error adding desktop collected note');
  }
};

// Cargar datos desde un archivo JSON
const uploadJsonData = async (req, res) => {
  const notas = req.body;
  try {
    await NotasCobradasDesktop.destroy({ where: {} }); // Borra todos los registros existentes
    const newNotas = await NotasCobradasDesktop.bulkCreate(notas); // Carga los nuevos datos desde el JSON
    res.status(201).json(newNotas);
  } catch (error) {
    res.status(500).send('Error loading JSON data');
  }
};

module.exports = {
  getNotasCobradasDesktop,
  addNotaCobrada,
  uploadJsonData
};
