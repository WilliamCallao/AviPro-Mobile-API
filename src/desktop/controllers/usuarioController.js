const UsuarioDesktop = require('../models/usuarioDesktop');
const bcrypt = require('bcrypt');

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
        res.status(201).json(newUsuario);
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
        res.status(200).send('Login successful');
    } catch (error) {
        res.status(500).send('Error adding desktop user');
    }
};

module.exports = {
    getUsuariosDesktop,
    addUsuario,
    loginUsuario
};