const express = require('express');
const { getClientesMobile, getClientesByEmpresa, syncClientes } = require('../controllers/clientesController');

const router = express.Router();

router.get('/', getClientesMobile);
router.get('/empresa/:empresa_id', getClientesByEmpresa); // Nueva ruta
router.post('/sync', syncClientes);

module.exports = router;
