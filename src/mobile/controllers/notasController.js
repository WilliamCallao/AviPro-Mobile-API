const NotasCobradasMobile = require('../models/notasCobradasMobile');
const NotaPendienteMobile = require('../models/notasPendientesMobile');
const ClienteMobile = require('../models/clientesMobile');
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
    cobrador_id
  } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // Registrar el pago en notas cobradas
    const newPayment = await NotasCobradasMobile.create({
      empresa_id,
      sucursal_id,
      cuenta,
      fecha: fecha || new Date(),
      referencia: referencia || null,
      pago_a_nota,
      monto,
      moneda,
      modo_pago,
      cta_deposito,
      observaciones: observaciones || null,
      nro_factura: nro_factura || null,
      cobrador_id,
      fecha_registro: moment().tz('America/La_Paz').format()
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
  const { empresa_id, sucursal_id, cuenta, pago_a_nota, fecha_registro } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // Encontrar la nota cobrada
    const notaCobrada = await NotasCobradasMobile.findOne({
      where: { empresa_id, sucursal_id, cuenta, pago_a_nota, fecha_registro }
    });

    if (!notaCobrada) {
      await transaction.rollback();
      return res.status(404).send('Nota cobrada no encontrada');
    }

    const montoRestituir = parseFloat(notaCobrada.monto);

    // Eliminar la nota cobrada
    await notaCobrada.destroy({ transaction });

    // Encontrar la nota pendiente correspondiente
    const notaPendiente = await NotaPendienteMobile.findOne({
      where: { empresa_id, sucursal_id, cuenta, nro_nota: pago_a_nota }
    });

    if (!notaPendiente) {
      await transaction.rollback();
      return res.status(404).send('Nota pendiente no encontrada');
    }

    // Restablecer el monto pagado y el saldo pendiente
    const nuevoMontoPagado = parseFloat(notaPendiente.monto_pagado) - montoRestituir;
    const nuevoSaldoPendiente = parseFloat(notaPendiente.saldo_pendiente) + montoRestituir;

    notaPendiente.monto_pagado = nuevoMontoPagado.toFixed(2);
    notaPendiente.saldo_pendiente = nuevoSaldoPendiente.toFixed(2);

    await notaPendiente.save({ transaction });

    await transaction.commit();

    res.status(200).send('Nota cobrada eliminada y saldo restituido correctamente');
  } catch (error) {
    await transaction.rollback();
    console.error('Error eliminando nota cobrada:', error);
    res.status(500).send('Error eliminando nota cobrada');
  }
};

module.exports = {
  processPayment,
  deletePaidNote
};
