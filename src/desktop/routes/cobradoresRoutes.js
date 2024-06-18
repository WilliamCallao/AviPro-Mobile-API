const express = require('express');
const {
  getCobradoresDesktop,
  addCobrador,
  uploadJsonData
} = require('../controllers/cobradoresController');

const router = express.Router();

router.get('/', getCobradoresDesktop);
router.post('/', addCobrador);
router.post('/upload-json', uploadJsonData);

module.exports = router;
