const express = require('express');
const { getCuentasDepositoMobile, syncCuentasDeposito } = require('../controllers/cuentasDepositoController');

const router = express.Router();

router.get('/', getCuentasDepositoMobile);
router.post('/sync', syncCuentasDeposito);

module.exports = router;
