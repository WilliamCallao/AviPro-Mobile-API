const express = require('express');
const {
  getNotasPendientesDesktop,
  addNotaPendiente,
  loadTestData
} = require('../controllers/notasPendientesController');

const router = express.Router();

router.get('/', getNotasPendientesDesktop);
router.post('/', addNotaPendiente);
router.post('/load-test-data', loadTestData); // Nueva ruta para cargar datos de prueba

module.exports = router;
