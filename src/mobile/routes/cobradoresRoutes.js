const express = require('express');
const { getCobradoresMobile, syncCobradores, getCobradoresByEmpresaId } = require('../controllers/cobradoresController');

const router = express.Router();

router.get('/', getCobradoresMobile);
router.get('/:empresa_id', getCobradoresByEmpresaId);
router.post('/sync', syncCobradores);

module.exports = router;
