// routes/mobileDispositivosRoutes.js
const express = require('express');
const { getDispositivos, addDispositivo, updateEstadoUsado, updateEstadoDesactivado, updateEstadoCreado } = require('../controllers/mobileDispositivosController');

const router = express.Router();

router.get('/', getDispositivos); // Obtener dispositivos
router.post('/', addDispositivo); // Crear un dispositivo
router.put('/estado/usado/:codigo_id', updateEstadoUsado); // Actualizar a 'usado'
router.put('/estado/desactivado/:codigo_id', updateEstadoDesactivado); // Actualizar a 'desactivado'
router.put('/estado/creado/:codigo_id', updateEstadoCreado); // Actualizar a 'creado'

module.exports = router;
