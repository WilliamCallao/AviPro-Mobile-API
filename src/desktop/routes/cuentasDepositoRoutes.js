const express = require('express');
const {
  getCuentasDepositoDesktop,
  addCuentaDeposito,
  uploadJsonData
} = require('../controllers/cuentasDepositoController');

const router = express.Router();

router.get('/', getCuentasDepositoDesktop);
router.post('/', addCuentaDeposito);
router.post('/upload-json', uploadJsonData); // Nueva ruta para cargar datos desde JSON

module.exports = router;
