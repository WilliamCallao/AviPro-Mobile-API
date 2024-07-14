const NotasCobradasMobile = require('../models/notasCobradasMobile');
const NotaPendienteMobile = require('../models/notasPendientesMobile');
const HistorialCobros = require('../models/historialCobrosMobile');
const sequelize = require('../../configs/database');
const moment = require('moment-timezone');

// Procesar el pago y actualizar las notas pendientes
const processPayment = async (req, res) => {
  const {
    empresa_id,
    sucursal_id,
    cuenta,
    fecha,
    referencia,
    pago_a_nota,
    monto,
    moneda,
    modo_pago,
    cta_deposito,
    observaciones,
    nro_factura,
    cobrador_id,
    nombre_cliente
  } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // Registrar el pago en notas cobradas
    const newPayment = await NotasCobradasMobile.create({
      empresa_id,
      sucursal_id,
      cuenta,
      fecha: fecha || moment().tz('America/La_Paz').format('YYYY-MM-DD'),
      referencia: referencia || null,
      pago_a_nota,
      monto,
      moneda,
      modo_pago,
      cta_deposito,
      observaciones: observaciones || null,
      nro_factura: nro_factura || null,
      cobrador_id,
      fecha_registro: moment().tz('America/La_Paz').format('YYYY-MM-DD'),
    }, { transaction });

    // Actualizar la nota pendiente
    const nota = await NotaPendienteMobile.findOne({
      where: { empresa_id, sucursal_id, cuenta, nro_nota: pago_a_nota }
    });

    if (!nota) {
      await transaction.rollback();
      return res.status(404).send('Nota not found');
    }

    const montoPagadoFloat = parseFloat(monto);
    const nuevoMontoPagado = parseFloat(nota.monto_pagado) + montoPagadoFloat;
    const nuevoSaldoPendiente = parseFloat(nota.importe_nota) - nuevoMontoPagado;

    if (nuevoSaldoPendiente < 0) {
      await transaction.rollback();
      return res.status(400).send('El monto pagado excede el saldo pendiente');
    }

    nota.monto_pagado = nuevoMontoPagado.toFixed(2);
    nota.saldo_pendiente = nuevoSaldoPendiente.toFixed(2);

    await nota.save({ transaction });

    // Crear registro en el historial de cobros
    const fechaHoraBolivia = moment().tz('America/La_Paz');
    await HistorialCobros.create({
      empresa_id,
      cobrador_id,
      cuenta,
      nombre_cliente,
      monto,
      fecha: fechaHoraBolivia.format('YYYY-MM-DD'),
      hora: fechaHoraBolivia.format('HH:mm:ss'),
      accion: 'Cobro de nota',
      observaciones,
      pago_a_nota
    }, { transaction });

    await transaction.commit();

    res.status(201).json(newPayment);
  } catch (error) {
    await transaction.rollback();
    console.error('Error processing payment:', error);
    res.status(500).send('Error processing payment');
  }
};

// Eliminar una nota pagada y restituir el saldo a la nota pendiente correspondiente
const deletePaidNote = async (req, res) => {
  const { id, empresa_id, sucursal_id, cuenta, pago_a_nota, nombre_cliente, cobrador_id } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // Buscar la nota cobrada
    const paidNote = await NotasCobradasMobile.findOne({
      where: { id, empresa_id, sucursal_id, cuenta, pago_a_nota }
    });

    if (!paidNote) {
      await transaction.rollback();
      return res.status(404).send('Nota cobrada no encontrada');
    }

    const montoPagadoFloat = parseFloat(paidNote.monto);

    // Buscar la nota pendiente asociada
    const pendingNote = await NotaPendienteMobile.findOne({
      where: { empresa_id, sucursal_id, cuenta, nro_nota: pago_a_nota }
    });

    if (!pendingNote) {
      await transaction.rollback();
      return res.status(404).send('Nota pendiente no encontrada');
    }

    // Actualizar el monto pagado y el saldo pendiente de la nota pendiente
    pendingNote.monto_pagado = (parseFloat(pendingNote.monto_pagado) - montoPagadoFloat).toFixed(2);
    pendingNote.saldo_pendiente = (parseFloat(pendingNote.saldo_pendiente) + montoPagadoFloat).toFixed(2);

    await pendingNote.save({ transaction });

    // Eliminar la nota cobrada
    await paidNote.destroy({ transaction });

    // Eliminar el registro en el historial de cobros
    await HistorialCobros.destroy({
      where: {
        empresa_id,
        cobrador_id,
        cuenta,
        pago_a_nota,
        accion: 'Cobro de nota'
      },
      transaction
    });

    await transaction.commit();

    res.status(200).send('Nota cobrada eliminada correctamente');
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting paid note:', error);
    res.status(500).send('Error deleting paid note');
  }
};

// Editar una nota pagada y actualizar la nota pendiente correspondiente
const editPaidNote = async (req, res) => {
  const {
    id,
    empresa_id,
    sucursal_id,
    cuenta,
    fecha,
    referencia,
    pago_a_nota,
    monto,
    moneda,
    modo_pago,
    cta_deposito,
    observaciones,
    nro_factura,
    cobrador_id,
    nombre_cliente
  } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // Buscar la nota cobrada
    const paidNote = await NotasCobradasMobile.findOne({
      where: { id, empresa_id, sucursal_id, cuenta, pago_a_nota }
    });

    if (!paidNote) {
      await transaction.rollback();
      return res.status(404).send('Nota cobrada no encontrada');
    }

    // Buscar la nota pendiente asociada
    const pendingNote = await NotaPendienteMobile.findOne({
      where: { empresa_id, sucursal_id, cuenta, nro_nota: pago_a_nota }
    });

    if (!pendingNote) {
      await transaction.rollback();
      return res.status(404).send('Nota pendiente no encontrada');
    }

    const montoAnteriorFloat = parseFloat(paidNote.monto);
    const montoNuevoFloat = parseFloat(monto);
    const diferenciaMonto = montoNuevoFloat - montoAnteriorFloat;

    // Actualizar la nota pagada
    paidNote.fecha = fecha || paidNote.fecha;
    paidNote.referencia = referencia || paidNote.referencia;
    paidNote.monto = montoNuevoFloat;
    paidNote.moneda = moneda || paidNote.moneda;
    paidNote.modo_pago = modo_pago || paidNote.modo_pago;
    paidNote.cta_deposito = cta_deposito || paidNote.cta_deposito;
    paidNote.observaciones = observaciones || paidNote.observaciones;
    paidNote.nro_factura = nro_factura || paidNote.nro_factura;
    paidNote.cobrador_id = cobrador_id || paidNote.cobrador_id;

    await paidNote.save({ transaction });

    // Actualizar la nota pendiente asociada
    const nuevoMontoPagado = parseFloat(pendingNote.monto_pagado) + diferenciaMonto;
    const nuevoSaldoPendiente = parseFloat(pendingNote.importe_nota) - nuevoMontoPagado;

    if (nuevoSaldoPendiente < 0) {
      await transaction.rollback();
      return res.status(400).send('El monto pagado excede el saldo pendiente');
    }

    pendingNote.monto_pagado = nuevoMontoPagado.toFixed(2);
    pendingNote.saldo_pendiente = nuevoSaldoPendiente.toFixed(2);

    await pendingNote.save({ transaction });

    // Actualizar el registro en el historial de cobros
    const historialRegistro = await HistorialCobros.findOne({
      where: {
        empresa_id,
        cobrador_id,
        cuenta,
        pago_a_nota,
        accion: 'Cobro de nota'
      },
      transaction
    });

    if (historialRegistro) {
      const nuevoMontoHistorial = parseFloat(historialRegistro.monto) + diferenciaMonto;
      historialRegistro.monto = nuevoMontoHistorial.toFixed(2);
      historialRegistro.observaciones = observaciones || historialRegistro.observaciones;
      await historialRegistro.save({ transaction });
    }

    await transaction.commit();

    res.status(200).json(paidNote);
  } catch (error) {
    await transaction.rollback();
    console.error('Error editing paid note:', error);
    res.status(500).send('Error editing paid note');
  }
};

module.exports = {
  processPayment,
  deletePaidNote,
  editPaidNote
};
