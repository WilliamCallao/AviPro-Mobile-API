const express = require('express');
const router = express.Router();
const NotaPendiente = require('../models/notaPendiente');

// Obtener notas pendientes por ID de empresa
router.get('/notas_pendientes/empresa/:empresa_id', async (req, res) => {
  const empresa_id = req.params.empresa_id;
  try {
    const notasPendientes = await NotaPendiente.findAll({
      where: { empresa_id }
    });
    res.json(notasPendientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las notas pendientes' });
  }
});

// Crear una nueva nota pendiente
router.post('/notas_pendientes', async (req, res) => {
  try {
    const { Saldo_pendiente, nro_nota, Monto_pagado, Importe_nota, Fecha_venta, Fecha_vence, empresa_id, Fecha, sucursal_id, Cuenta } = req.body;
    const nuevaNotaPendiente = await NotaPendiente.create({ Saldo_pendiente, nro_nota, Monto_pagado, Importe_nota, Fecha_venta, Fecha_vence, empresa_id, Fecha, sucursal_id, Cuenta });
    res.status(201).json(nuevaNotaPendiente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la nota pendiente' });
  }
});

// Obtener una nota pendiente por su número
router.get('/notas_pendientes/:nro_nota', async (req, res) => {
  const nro_nota = req.params.nro_nota;
  try {
    const notaPendiente = await NotaPendiente.findByPk(nro_nota);
    if (!notaPendiente) {
      res.status(404).json({ message: 'Nota pendiente no encontrada' });
    } else {
      res.json(notaPendiente);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la nota pendiente' });
  }
});

// Actualizar una nota pendiente por su número
router.put('/notas_pendientes/:nro_nota', async (req, res) => {
  const nro_nota = req.params.nro_nota;
  try {
    const { Saldo_pendiente, Monto_pagado, Importe_nota, Fecha_venta, Fecha_vence, empresa_id, Fecha, sucursal_id, Cuenta } = req.body;
    const updatedNotaPendiente = await NotaPendiente.update({ Saldo_pendiente, Monto_pagado, Importe_nota, Fecha_venta, Fecha_vence, empresa_id, Fecha, sucursal_id, Cuenta }, {
      where: { nro_nota },
      returning: true
    });
    if (updatedNotaPendiente[0] === 0) {
      res.status(404).json({ message: 'Nota pendiente no encontrada' });
    } else {
      res.json(updatedNotaPendiente[1][0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la nota pendiente' });
  }
});

// Eliminar una nota pendiente por su número
router.delete('/notas_pendientes/:nro_nota', async (req, res) => {
  const nro_nota = req.params.nro_nota;
  try {
    const deletedNotaPendiente = await NotaPendiente.destroy({ where: { nro_nota } });
    if (deletedNotaPendiente === 0) {
      res.status(404).json({ message: 'Nota pendiente no encontrada' });
    } else {
      res.json({ message: 'Nota pendiente eliminada exitosamente' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la nota pendiente' });
  }
});

module.exports = router;
