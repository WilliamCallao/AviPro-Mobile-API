const express = require('express');
const { getClientesMobile, getClientesByEmpresa, getClientesConNotasPendientes, syncClientes, getClienteByCuenta } = require('../controllers/clientesController');

const router = express.Router();

router.get('/', getClientesMobile);
router.get('/empresa/:empresa_id', getClientesByEmpresa);
router.get('/empresa/:empresa_id/con-notas', getClientesConNotasPendientes);
router.get('/cuenta/:cuenta', getClienteByCuenta); 
router.post('/sync', syncClientes);

module.exports = router;