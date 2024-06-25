const express = require('express');
const router = express.Router();
const historialCobrosController = require('../controllers/historialCobrosController');

/**
 * @route POST /api/mobile/historial-cobros
 * @description Crea un nuevo registro en el historial de cobros.
 * @body {string} empresa_id - ID de la empresa (obligatorio)
 * @body {string} cobrador_id - ID del cobrador (obligatorio)
 * @body {string} nombre_cliente - Nombre del cliente (obligatorio)
 * @body {number} monto - Monto del cobro (obligatorio)
 * @returns {object} 201 - El nuevo registro creado
 * @returns {Error} 500 - Error al crear el registro
 * @example body:
 * {
 *   "empresa_id": "01",
 *   "cobrador_id": "02",
 *   "nombre_cliente": "Juan Pérez",
 *   "monto": 1500.50
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

module.exports = router;
