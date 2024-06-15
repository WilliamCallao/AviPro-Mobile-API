const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

// Obtener todos los clientes
router.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los clientes' });
  }
});

// Crear un nuevo cliente
router.post('/clientes', async (req, res) => {
  try {
    const { cliente_ID, sucursal_ID, Telefono, Empresa_ID, Direccion, Nombre, cobrador_ID, Cuenta } = req.body;
    const nuevoCliente = await Cliente.create({ cliente_ID, sucursal_ID, Telefono, Empresa_ID, Direccion, Nombre, cobrador_ID, Cuenta });
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el cliente' });
  }
});

// Obtener un cliente por ID
router.get('/clientes/:cliente_ID', async (req, res) => {
  const cliente_ID = req.params.cliente_ID;
  try {
    const cliente = await Cliente.findByPk(cliente_ID);
    if (!cliente) {
      res.status(404).json({ message: 'Cliente no encontrado' });
    } else {
      res.json(cliente);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el cliente' });
  }
});

// Actualizar un cliente por ID
router.put('/clientes/:cliente_ID', async (req, res) => {
  const cliente_ID = req.params.cliente_ID;
  try {
    const { sucursal_ID, Telefono, Empresa_ID, Direccion, Nombre, cobrador_ID, Cuenta } = req.body;
    const updatedCliente = await Cliente.update({ sucursal_ID, Telefono, Empresa_ID, Direccion, Nombre, cobrador_ID, Cuenta }, {
      where: { cliente_ID },
      returning: true
    });
    if (updatedCliente[0] === 0) {
      res.status(404).json({ message: 'Cliente no encontrado' });
    } else {
      res.json(updatedCliente[1][0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el cliente' });
  }
});

// Eliminar un cliente por ID
router.delete('/clientes/:cliente_ID', async (req, res) => {
  const cliente_ID = req.params.cliente_ID;
  try {
    const deletedCliente = await Cliente.destroy({ where: { cliente_ID } });
    if (deletedCliente === 0) {
      res.status(404).json({ message: 'Cliente no encontrado' });
    } else {
      res.json({ message: 'Cliente eliminado exitosamente' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el cliente' });
  }
});

module.exports = router;
