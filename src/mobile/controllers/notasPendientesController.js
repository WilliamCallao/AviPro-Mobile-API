const NotaPendienteMobile = require('../models/notasPendientesMobile');
const NotaPendienteDesktop = require('../../desktop/models/notasPendientesDesktop');

// Obtener todas las notas pendientes de móvil
const getNotasPendientesMobile = async (req, res) => {
  try {
    const notas = await NotaPendienteMobile.findAll();
    res.json(notas);
  } catch (error) {
    res.status(500).send('Error fetching mobile pending notes');
  }
};

// Endpoint para sincronizar datos desde la tabla de desktop
const syncNotasPendientes = async (req, res) => {
  try {
    const desktopNotas = await NotaPendienteDesktop.findAll();
    await NotaPendienteMobile.destroy({ where: {} }); // Borra todos los registros existentes
    const newNotas = await NotaPendienteMobile.bulkCreate(desktopNotas.map(n => n.toJSON())); // Carga los nuevos datos
    res.status(201).json(newNotas);
  } catch (error) {
    res.status(500).send('Error syncing mobile pending notes');
  }
};

// Actualizar el monto pagado y saldo pendiente de una nota
const updateNotaPendiente = async (req, res) => {
  const { empresa_id, sucursal_id, cuenta, nro_nota } = req.params;
  const { monto_pagado } = req.body;

  try {
    const nota = await NotaPendienteMobile.findOne({
      where: { empresa_id, sucursal_id, cuenta, nro_nota }
    });

    if (!nota) {
      return res.status(404).send('Nota not found');
    }

    // Asegúrate de que los valores se procesan como decimales
    const montoPagadoFloat = parseFloat(monto_pagado);
    const nuevoMontoPagado = parseFloat(nota.monto_pagado) + montoPagadoFloat;
    const nuevoSaldoPendiente = parseFloat(nota.importe_nota) - nuevoMontoPagado;

    if (nuevoSaldoPendiente < 0) {
      return res.status(400).send('El monto pagado excede el saldo pendiente');
    }

    // Actualiza la nota
    nota.monto_pagado = nuevoMontoPagado.toFixed(2);
    nota.saldo_pendiente = nuevoSaldoPendiente.toFixed(2);

    await nota.save();

    res.json({
      empresa_id: nota.empresa_id,
      sucursal_id: nota.sucursal_id,
      cuenta: nota.cuenta,
      fecha: nota.fecha,
      nro_nota: nota.nro_nota,
      importe_nota: parseFloat(nota.importe_nota),
      monto_pagado: parseFloat(nota.monto_pagado),
      saldo_pendiente: parseFloat(nota.saldo_pendiente),
      fecha_venta: nota.fecha_venta,
      fecha_vence: nota.fecha_vence
    });
  } catch (error) {
    res.status(500).send('Error updating note');
  }
};

// Rollback para actualizar el monto pagado y saldo pendiente de una nota
const rollbackNotaPendiente = async (req, res) => {
  const { empresa_id, sucursal_id, cuenta, nro_nota, monto } = req.body;

  try {
    const nota = await NotaPendienteMobile.findOne({
      where: { empresa_id, sucursal_id, cuenta, nro_nota }
    });

    if (!nota) {
      return res.status(404).send('Nota not found');
    }

    // Asegúrate de que los valores se procesan como decimales
    const montoRollback = parseFloat(monto);
    const nuevoMontoPagado = parseFloat(nota.monto_pagado) - montoRollback;
    const nuevoSaldoPendiente = parseFloat(nota.importe_nota) - nuevoMontoPagado;

    if (nuevoMontoPagado < 0) {
      return res.status(400).send('El monto pagado no puede ser negativo');
    }

    // Actualiza la nota
    nota.monto_pagado = nuevoMontoPagado.toFixed(2);
    nota.saldo_pendiente = nuevoSaldoPendiente.toFixed(2);

    await nota.save();

    res.status(200).send({ message: 'Nota pendiente revertida' });
  } catch (error) {
    res.status(500).send({ error: 'Error al revertir la nota pendiente' });
  }
};

module.exports = {
  getNotasPendientesMobile,
  syncNotasPendientes,
  updateNotaPendiente,
  rollbackNotaPendiente
};
