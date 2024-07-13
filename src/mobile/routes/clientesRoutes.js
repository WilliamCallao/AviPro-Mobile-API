// routes/clientesRoutes.js

const express = require('express');
const router = express.Router();
const {
  getClientesMobile,
  getClientesByEmpresa,
  getClientesConNotasPendientes,
  getClienteByCuenta,
  uploadJsonData,
  getClienteByEmpresaAndCuenta
} = require('../controllers/clientesController');

// Ruta para obtener todos los clientes de móvil
router.get('/', getClientesMobile);

// Ruta para obtener clientes por empresa_id
router.get('/empresa/:empresa_id', getClientesByEmpresa);

// Ruta para obtener clientes con notas pendientes por empresa_id
router.get('/empresa/:empresa_id/notas-pendientes', getClientesConNotasPendientes);

// Ruta para obtener cliente por cuenta con sus notas pendientes y cobradas
router.get('/cuenta/:cuenta', getClienteByCuenta);

// Ruta para cargar datos desde un archivo JSON
router.post('/upload-json', uploadJsonData);

// Ruta para obtener cliente por empresa y cuenta
router.get('/empresa/:empresa_id/cuenta/:cuenta', getClienteByEmpresaAndCuenta);

module.exports = router;
