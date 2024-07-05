// src/desktop/controllers/usuarioController.js
const UsuarioDesktop = require('../models/usuarioDesktop');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

// Obtener todos los usuarios de escritorio
const getUsuariosDesktop = async (req, res) => {
  try {
    const usuarios = await UsuarioDesktop.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).send('Error al obtener los usuarios de escritorio');
  }
};

// Agregar un nuevo usuario de escritorio
const addUsuario = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('El correo electrónico y la contraseña son obligatorios');
    }
    try {
        const usuario = await UsuarioDesktop.findOne({ where: { email } });
        if (usuario) {
            return res.status(400).send('El correo electrónico ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUsuario = await UsuarioDesktop.create({ email, password: hashedPassword });
        res.status(201).json(newUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el usuario de escritorio');
    }
};

// Iniciar sesión
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('El correo electrónico y la contraseña son obligatorios');
    }
    try {
        const usuario = await UsuarioDesktop.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).send('El correo electrónico no está registrado');
        }
        if (!usuario.isActive) {
            return res.status(403).send('Usuario no activo. Por favor, contacte al administrador.');
        }
        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) {
            return res.status(400).send('La contraseña es incorrecta');
        }
        const token = jwt.sign({ id: usuario.usuario_id }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).send('Error al iniciar sesión');
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }
    jwt.verify(token, JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).send('Token inválido');
        }
        req.user = user;
        next();
    });
};

module.exports = {
    getUsuariosDesktop,
    addUsuario,
    loginUsuario,
    verifyToken
};
