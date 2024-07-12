const express = require('express');
const router = express.Router();
const historialCobrosController = require('../controllers/historialCobrosController');

/**
 * @route POST /api/mobile/historial-cobros
 * @description Crea un nuevo registro en el historial de cobros.
 * @body {string} empresa_id - ID de la empresa (obligatorio)
 * @body {string} cobrador_id - ID del cobrador (obligatorio)
 * @body {string} cuenta - Cuenta del cliente (obligatorio)
 * @body {string} nombre_cliente - Nombre del cliente (obligatorio)
 * @body {number} monto - Monto del cobro (obligatorio)
 * @body {string} accion - Acción realizada (obligatorio)
 * @body {string} observaciones - Observaciones (opcional)
 * @body {string} pago_a_nota - Referencia de la nota pagada (obligatorio)
 * @returns {object} 201 - El nuevo registro creado
 * @returns {Error} 500 - Error al crear el registro
 * @example body:
 * {
 *   "empresa_id": "01",
 *   "cobrador_id": "02",
 *   "cuenta": "11201020241",
 *   "nombre_cliente": "Juan Pérez",
 *   "monto": 1500.50,
 *   "accion": "Cobro de nota",
 *   "observaciones": "",
 *   "pago_a_nota": "R02235190"
 * }
 */
router.post('/', historialCobrosController.crearRegistro);

/**
 * @route GET /api/mobile/historial-cobros/:empresa_id/:cobrador_id/:filtro?
 * @description Obtiene los registros del historial de cobros de un cobrador específico.
 * @param {string} empresa_id - ID de la empresa (obligatorio)
 * @param {string} cobrador_id - ID del cobrador (obligatorio)
 * @param {string} [filtro] - Filtro opcional para los registros (opciones: "hoy", "ayer", "ultima_semana", "ultimo_mes")
 * @returns {object} 200 - Lista de registros
 * @returns {Error} 500 - Error al obtener los registros
 * @example
 * // Sin filtro (todos los registros)
 * GET /api/mobile/historial-cobros/01/02
 * 
 * // Con filtro para registros de hoy
 * GET /api/mobile/historial-cobros/01/02/hoy
 * 
 * // Con filtro para registros de ayer
 * GET /api/mobile/historial-cobros/01/02/ayer
 * 
 * // Con filtro para registros de la última semana
 * GET /api/mobile/historial-cobros/01/02/ultima_semana
 * 
 * // Con filtro para registros del último mes
 * GET /api/mobile/historial-cobros/01/02/ultimo_mes
 */
router.get('/:empresa_id/:cobrador_id/:filtro?', historialCobrosController.obtenerRegistros);

/**
 * @route PUT /api/mobile/historial-cobros
 * @description Edita un registro en el historial de cobros.
 * @body {number} id - ID del registro (obligatorio)
 * @body {string} empresa_id - ID de la empresa (obligatorio)
 * @body {string} cobrador_id - ID del cobrador (obligatorio)
 * @body {string} cuenta - Cuenta del cliente (obligatorio)
 * @body {string} nombre_cliente - Nombre del cliente (obligatorio)
 * @body {number} monto - Monto del cobro (obligatorio)
 * @body {string} accion - Acción realizada (obligatorio)
 * @body {string} observaciones - Observaciones (opcional)
 * @body {string} pago_a_nota - Referencia de la nota pagada (obligatorio)
 * @returns {object} 200 - Registro editado correctamente
 * @returns {Error} 500 - Error al editar el registro
 */
router.put('/', historialCobrosController.editarRegistroHistorial);

/**
 * @route DELETE /api/mobile/historial-cobros
 * @description Elimina un registro en el historial de cobros.
 * @body {number} id - ID del registro (obligatorio)
 * @returns {object} 200 - Registro eliminado correctamente
 * @returns {Error} 500 - Error al eliminar el registro
 */
router.delete('/', historialCobrosController.eliminarRegistroHistorial);

module.exports = router;
    