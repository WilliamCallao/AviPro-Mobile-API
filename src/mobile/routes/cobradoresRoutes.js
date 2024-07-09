// routes/cobradoresRoutes.js

const express = require('express');
const { getCobradoresMobile, getCobradoresByEmpresaId, uploadJsonData } = require('../controllers/cobradoresController');

const router = express.Router();

router.get('/', getCobradoresMobile);
router.get('/:empresa_id', getCobradoresByEmpresaId);
router.post('/upload-json', uploadJsonData);

module.exports = router;
