const { Op } = require('sequelize');
const MobileDispositivo = require('../models/mobileDispositivos');

// Obtener todos los dispositivos o los dispositivos de una empresa específica
const getDispositivos = async (req, res) => {
  try {
    const { empresa_id } = req.query;
    const condition = empresa_id ? { empresa_id: { [Op.eq]: empresa_id } } : {};
    const dispositivos = await MobileDispositivo.findAll({
      where: condition
    });
    res.json(dispositivos);
  } catch (error) {
    res.status(500).send('Error fetching devices');
  }
};

// Crear un nuevo dispositivo
const addDispositivo = async (req, res) => {
  try {
    const { empresa_id, codigo_id, estado } = req.body;

    // Validar los parámetros
    if (!empresa_id || !codigo_id || !estado) {
      return res.status(400).json({ error: 'empresa_id, codigo_id y estado son requeridos' });
    }

    // // Validar existencia de la empresa
    // const empresa = await MobileEmpresa.findByPk(empresa_id);
    // if (!empresa) {
    //   return res.status(400).json({ error: 'empresa_id no existe' });
    // }

    // Validar unicidad del codigo_id
    const existingDevice = await MobileDispositivo.findByPk(codigo_id);
    if (existingDevice) {
      return res.status(400).json({ error: 'El codigo_id ya existe' });
    }

    const newDispositivo = await MobileDispositivo.create({ empresa_id, codigo_id, estado });
    res.status(201).json(newDispositivo);
  } catch (error) {
    console.error('Error adding device:', error);
    res.status(500).json({ error: 'Error adding device', details: error.message });
  }
};

// Actualizar el estado de un dispositivo a 'usado'
const updateEstadoUsado = async (req, res) => {
  try {
    const { codigo_id } = req.params;
    const dispositivo = await MobileDispositivo.findByPk(codigo_id);
    if (dispositivo) {
      dispositivo.estado = 'usado';
      await dispositivo.save({ fields: ['estado'] });
      res.json(dispositivo);
    } else {
      res.status(404).send('Device not found');
    }
  } catch (error) {
    res.status(500).send('Error updating device status');
  }
};

// Actualizar el estado de un dispositivo a 'desactivado'
const updateEstadoDesactivado = async (req, res) => {
  try {
    const { codigo_id } = req.params;
    const dispositivo = await MobileDispositivo.findByPk(codigo_id);
    if (dispositivo) {
      dispositivo.estado = 'desactivado';
      await dispositivo.save({ fields: ['estado'] });
      res.json(dispositivo);
    } else {
      res.status(404).send('Device not found');
    }
  } catch (error) {
    res.status(500).send('Error updating device status');
  }
};

// Actualizar el estado de un dispositivo a 'creado'
const updateEstadoCreado = async (req, res) => {
  try {
    const { codigo_id } = req.params;
    const dispositivo = await MobileDispositivo.findByPk(codigo_id);
    if (dispositivo) {
      dispositivo.estado = 'creado';
      await dispositivo.save({ fields: ['estado'] });
      res.json(dispositivo);
    } else {
      res.status(404).send('Device not found');
    }
  } catch (error) {
    res.status(500).send('Error updating device status');
  }
};

const updateUltimoUso = async (req, res) => {
  try {
    const { codigo_id } = req.params;
    console.log("RECIBIDO",codigo_id)
    const dispositivo = await MobileDispositivo.findByPk(codigo_id);
    if (dispositivo) {
      dispositivo.ultimo_uso = new Date();
      await dispositivo.save({ fields: ['ultimo_uso'] });
      res.json(dispositivo);
    } else {
      res.status(404).send('Device not found');
    }
  } catch (error) {
    res.status(500).send('Error updating last used timestamp');
  }
};

module.exports = {
  getDispositivos,
  addDispositivo,
  updateEstadoUsado,
  updateEstadoDesactivado,
  updateEstadoCreado,
  updateUltimoUso
};
