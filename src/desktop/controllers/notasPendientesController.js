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

module.exports = {
  getNotasPendientesDesktop,
  addNotaPendiente
};
