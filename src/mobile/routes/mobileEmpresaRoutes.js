// routes/mobileEmpresaRoutes.js
const express = require('express');
const { getEmpresas, addEmpresa } = require('../controllers/mobileEmpresaController');

const router = express.Router();

router.get('/', getEmpresas);
router.post('/', addEmpresa);

module.exports = router;
