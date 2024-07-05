const express = require('express');
const {
  getUsuariosDesktop,
  addUsuario,
  loginUsuario
} = require('../controllers/usuarioController');

const router = express.Router();

router.get('/', getUsuariosDesktop);
router.post('/register', addUsuario);
router.post('/login', loginUsuario);

module.exports = router;