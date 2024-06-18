const express = require('express');
const {
  getNotasCobradasDesktop,
  addNotaCobrada,
  uploadJsonData
} = require('../controllers/notasCobradasController');

const router = express.Router();

router.get('/', getNotasCobradasDesktop);
router.post('/', addNotaCobrada);
router.post('/upload-json', uploadJsonData); // Nueva ruta para cargar datos desde JSON

module.exports = router;