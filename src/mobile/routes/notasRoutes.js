const express = require('express');
const { processPayment, deletePaidNote } = require('../controllers/notasController');

const router = express.Router();

/**
 * @route POST /api/mobile/notas/process-payment
 * @desc Procesar el pago y actualizar las notas pendientes
 */
router.post('/process-payment', processPayment);

/**
 * @route DELETE /api/mobile/notas-cobradas/delete
 * @desc Eliminar una nota cobrada y restituir el saldo a la nota pendiente correspondiente
 */
router.delete('/notas-cobradas/delete', deletePaidNote);

module.exports = router;
