const express = require('express');
const {
  getCobradoresDesktop,
  addCobrador,
  loadTestData
} = require('../controllers/cobradoresController');

const router = express.Router();

router.get('/', getCobradoresDesktop);
router.post('/', addCobrador);
router.post('/load-test-data', loadTestData);

module.exports = router;
