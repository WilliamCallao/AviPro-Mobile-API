const express = require('express');
const { getCuentasDepositoMobile, syncCuentasDeposito, getCuentasDepositoByEmpresaId, uploadJsonData } = require('../controllers/cuentasDepositoController');

const router = express.Router();

router.get('/', getCuentasDepositoMobile);
router.post('/sync', syncCuentasDeposito);
router.post('/upload-json', uploadJsonData);
router.get('/empresa/:empresa_id', getCuentasDepositoByEmpresaId);

module.exports = router;
