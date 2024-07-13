// routes/notasPendientesRoutes.js

const express = require('express');
const { getNotasPendientesMobile, syncNotasPendientes, uploadJsonData, updateNotaPendiente, rollbackNotaPendiente } = require('../controllers/notasPendientesController');

const router = express.Router();

/**
 * @route GET /api/mobile/notas-pendientes
 * @desc Obtener todas las notas pendientes de móvil
 */
router.get('/', getNotasPendientesMobile);

/**
 * @route POST /api/mobile/notas-pendientes/sync
 * @desc Sincronizar datos desde la tabla de desktop
 */
router.post('/sync', syncNotasPendientes);

/**
 * @route POST /api/mobile/notas-pendientes/upload-json
 * @desc Cargar datos desde un archivo JSON
 */
router.post('/upload-json', uploadJsonData);

/**
 * @route PUT /api/mobile/notas-pendientes/:empresa_id/:sucursal_id/:cuenta/:nro_nota
 * @desc Actualizar el monto pagado y saldo pendiente de una nota específica
 * @param {string} empresa_id - ID de la empresa
 * @param {string} sucursal_id - ID de la sucursal
 * @param {string} cuenta - Número de cuenta
 * @param {string} nro_nota - Número de nota
 * @body {number} monto_pagado - Monto pagado a agregar
 */
router.put('/:empresa_id/:sucursal_id/:cuenta/:nro_nota', updateNotaPendiente);

/**
 * @route POST /api/mobile/notas-pendientes/rollback
 * @desc Revertir la actualización del monto pagado y saldo pendiente de una nota específica
 * @body {string} empresa_id - ID de la empresa
 * @body {string} sucursal_id - ID de la sucursal
 * @body {string} cuenta - Número de cuenta
 * @body {string} nro_nota - Número de nota
 * @body {number} monto - Monto a revertir
 */
router.post('/rollback', rollbackNotaPendiente);

module.exports = router;
