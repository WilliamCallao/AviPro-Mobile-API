const express = require('express');
const {
  getNotasPendientesDesktop,
  addNotaPendiente,
  uploadJsonData
} = require('../controllers/notasPendientesController');

const router = express.Router();

router.get('/', getNotasPendientesDesktop);
router.post('/', addNotaPendiente);
router.post('/upload-json', uploadJsonData); // Nueva ruta para cargar datos desde JSON

module.exports = router;
