const UsuarioDesktop = require('../models/usuarioDesktop');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

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
        const newUsuario = await UsuarioDesktop.create({ email, password });
        res.status(201).json(newUsuario);
    } catch (error) {
        console.error(error);
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
        const validPassword = usuario.password === password;
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