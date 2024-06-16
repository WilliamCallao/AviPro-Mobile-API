const express = require('express');
const {
  getClientesDesktop,
  addCliente,
  loadTestData
} = require('../controllers/clientesController');

const router = express.Router();

router.get('/', getClientesDesktop);
router.post('/', addCliente);
router.post('/load-test-data', loadTestData);

module.exports = router;
