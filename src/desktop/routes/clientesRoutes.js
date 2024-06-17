const express = require('express');
const {
  getClientesDesktop,
  addCliente,
  uploadJsonData
} = require('../controllers/clientesController');

const router = express.Router();

router.get('/', getClientesDesktop);
router.post('/', addCliente);
router.post('/upload-json', uploadJsonData);

module.exports = router;
