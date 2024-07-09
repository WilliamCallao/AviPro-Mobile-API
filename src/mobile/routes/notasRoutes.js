const express = require('express');
const { processPayment } = require('../controllers/notasController');

const router = express.Router();

/**
 * @route POST /api/mobile/notas/process-payment
 * @desc Procesar el pago y actualizar las notas pendientes
 */
router.post('/process-payment', processPayment);

module.exports = router;
