const express = require('express');
const { getNotasCobradasMobile, syncNotasCobradas, registerPayment, rollbackNotaCobrada } = require('../controllers/notasCobradasController');

const router = express.Router();

/**
 * @route GET /api/mobile/notas-cobradas
 * @desc Obtener todas las notas cobradas móviles
 */
router.get('/', getNotasCobradasMobile);

/**
 * @route POST /api/mobile/notas-cobradas/sync
 * @desc Sincronizar datos desde la tabla de desktop
 */
router.post('/sync', syncNotasCobradas);

/**
 * @route POST /api/mobile/notas-cobradas/register
 * @desc Registrar un nuevo pago
 * @body {string} empresa_id - ID de la empresa
 * @body {string} sucursal_id - ID de la sucursal
 * @body {string} cuenta - Número de cuenta
 * @body {string} fecha - Fecha del pago (opcional)
 * @body {string} pago_a_nota - Número de la nota a pagar
 * @body {number} monto - Monto pagado
 * @body {string} moneda - Moneda ('B' o 'U')
 * @body {string} modo_pago - Modo de pago ('E', 'B', 'D')
 * @body {string} cta_deposito - Cuenta de depósito
 * @body {string} [observaciones] - Observaciones (opcional)
 * @body {string} [referencia] - Referencia (opcional)
 * @body {number} [nro_factura] - Número de factura (opcional)
 * @body {string} cobrador_id - ID del cobrador
 */
router.post('/register', registerPayment);

/**
 * @route POST /api/mobile/notas-cobradas/rollback
 * @desc Revertir una nota cobrada
 * @body {string} empresa_id - ID de la empresa
 * @body {string} sucursal_id - ID de la sucursal
 * @body {string} cuenta - Número de cuenta
 * @body {string} pago_a_nota - Número de la nota a pagar
 */
router.post('/rollback', rollbackNotaCobrada);

module.exports = router;
