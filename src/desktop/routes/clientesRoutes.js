// clientesRoutes
const express = require('express');
const {
  getClientesDesktop,
  addCliente
} = require('../controllers/clientesController');

const router = express.Router();

router.get('/', getClientesDesktop);
router.post('/', addCliente);

module.exports = router;
