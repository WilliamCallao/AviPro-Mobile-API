const express = require('express');
const { getClientesMobile, syncClientes } = require('../controllers/clientesController');

const router = express.Router();

router.get('/', getClientesMobile);
router.post('/sync', syncClientes);

module.exports = router;
