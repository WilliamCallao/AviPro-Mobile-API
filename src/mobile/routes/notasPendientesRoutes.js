const express = require('express');
const { getNotasPendientesMobile, syncNotasPendientes } = require('../controllers/notasPendientesController');

const router = express.Router();

router.get('/', getNotasPendientesMobile);
router.post('/sync', syncNotasPendientes);

module.exports = router;
