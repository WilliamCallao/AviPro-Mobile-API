const express = require('express');
const { getEmpresas, addEmpresa, getEmpresaNombreById } = require('../controllers/mobileEmpresaController');

const router = express.Router();

router.get('/', getEmpresas);
router.post('/', addEmpresa);
router.get('/:id/nombre', getEmpresaNombreById);

module.exports = router;
