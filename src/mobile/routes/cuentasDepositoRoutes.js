const express = require('express');
const { getCuentasDepositoMobile, syncCuentasDeposito, getCuentasDepositoByEmpresaId } = require('../controllers/cuentasDepositoController');

const router = express.Router();

router.get('/', getCuentasDepositoMobile);
router.post('/sync', syncCuentasDeposito);
router.get('/empresa/:empresa_id', getCuentasDepositoByEmpresaId);

module.exports = router;
