const express = require('express');
const {
  getUsuariosDesktop,
  addUsuario,
  loginUsuario,
  verifyToken
} = require('../controllers/usuarioController');

const router = express.Router();

router.get('/', verifyToken, getUsuariosDesktop);
router.post('/register', addUsuario);
router.post('/login', loginUsuario);

module.exports = router;