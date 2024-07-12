const express = require('express');
const {
  getLogs,
  addLog
} = require('../controllers/logsController');

const router = express.Router();

router.get('/', getLogs);
router.post('/', addLog);

module.exports = router;