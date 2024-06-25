const express = require('express');
const { getClientesMobile, getClientesByEmpresa, getClienteByEmpresaAndCuenta, getClientesConNotasPendientes, syncClientes, getClienteByCuenta } = require('../controllers/clientesController');

const router = express.Router();

router.get('/', getClientesMobile);
router.get('/empresa/:empresa_id', getClientesByEmpresa);
router.get('/empresa/:empresa_id/con-notas', getClientesConNotasPendientes);
router.get('/cuenta/:cuenta', getClienteByCuenta); 
router.post('/sync', syncClientes);
router.get('/empresa/:empresa_id/cuenta/:cuenta', getClienteByEmpresaAndCuenta);

module.exports = router;