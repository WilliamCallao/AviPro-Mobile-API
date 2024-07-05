const UsuarioDesktop = require('../models/usuarioDesktop');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = proccess.env.JWT_SECRET;

// Obtener todos los usuarios de escritorio
const getUsuariosDesktop = async (req, res) => {
  try {
    const usuarios = await UsuarioDesktop.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).send('Error fetching desktop users');
  }
};

// Agregar un nuevo usuario de escritorio
const addUsuario = async (req, res) => {
    const {email, password } = req.body;
    if(!email || !password) {
      return res.status(400).send('Error adding data to the database');
    }
    try {
        const usuario = await UsuarioDesktop.findOne({ where: { email } });
        if(usuario) {
            return res.status(400).send('The email is already registered');
        }
        const passwordNew = await bcrypt.hash(password, 10);
        const newUsuario = await UsuarioDesktop.create({ email, password: passwordNew });
        const token = jwt.sign({ id: newUsuario.usuario_id }, JWT_SECRET);
        res.status(201).json({ token });
    } catch (error) {
    res.status(500).send('Error adding desktop user');
    }
};

//Iniciar sesion
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).send('Error adding data to the database');
    }
    try {
        const usuario = await UsuarioDesktop.findOne({ where: { email } });
        if(!usuario) {
            return res.status(400).send('The email is not registered');
        }
        const validPassword = await bcrypt.compare(password, usuario.password);
        if(!validPassword) {
            return res.status(400).send('The password is incorrect');
        }
        const token = jwt.sign({ id: usuario.usuario_id }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).send('Error adding desktop user');
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).send('Access denied');
    }
    jwt.verify(token, JWT_SECRET, (error, user) => {
        if(error) {
            return res.status(403).send('Invalid token');
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