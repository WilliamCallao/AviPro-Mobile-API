const express = require('express');
const { getCobradoresMobile, syncCobradores } = require('../controllers/cobradoresController');

const router = express.Router();

router.get('/', getCobradoresMobile);
router.post('/sync', syncCobradores);

module.exports = router;
