const express = require('express');
const { getNotasCobradasMobile, syncNotasCobradas } = require('../controllers/notasCobradasController');

const router = express.Router();

router.get('/', getNotasCobradasMobile);
router.post('/sync', syncNotasCobradas);

module.exports = router;
