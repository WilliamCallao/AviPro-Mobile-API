const express = require('express');
const { 
  getDispositivos, 
  addDispositivo, 
  updateEstadoUsado, 
  updateEstadoDesactivado, 
  updateEstadoCreado, 
  updateUltimoUso,
  getEstadoByCodigoId
} = require('../controllers/mobileDispositivosController');

const router = express.Router();

router.get('/', getDispositivos); // Obtener dispositivos
router.post('/', addDispositivo); // Crear un dispositivo
router.put('/estado/usado/:codigo_id', updateEstadoUsado); // Actualizar a 'usado'
router.put('/estado/desactivado/:codigo_id', updateEstadoDesactivado); // Actualizar a 'desactivado'
router.put('/estado/creado/:codigo_id', updateEstadoCreado); // Actualizar a 'creado'
router.put('/ultimo_uso/:codigo_id', updateUltimoUso); // Actualizar el campo 'ultimo_uso'
router.get('/estado/:codigo_id', getEstadoByCodigoId); // Obtener el estado del dispositivo

module.exports = router;
