// notasPendientesRoutes
const express = require('express');
const {
  getNotasPendientesDesktop,
  addNotaPendiente
} = require('../controllers/notasPendientesController');

const router = express.Router();

router.get('/', getNotasPendientesDesktop);
router.post('/', addNotaPendiente);

module.exports = router;
