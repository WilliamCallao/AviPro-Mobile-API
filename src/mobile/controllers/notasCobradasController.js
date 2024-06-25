const NotasCobradasMobile = require('../models/notasCobradasMobile');
const NotasCobradasDesktop = require('../../desktop/models/notasCobradasDesktop');

// Obtener todas las notas cobradas móviles
const getNotasCobradasMobile = async (req, res) => {
  try {
    const notas = await NotasCobradasMobile.findAll();
    res.json(notas);
  } catch (error) {
    res.status(500).send('Error fetching mobile collected notes');
  }
};

// Endpoint para sincronizar datos desde la tabla de desktop
const syncNotasCobradas = async (req, res) => {
  try {
    const desktopNotas = await NotasCobradasDesktop.findAll();
    await NotasCobradasMobile.destroy({ where: {} }); // Borra todos los registros existentes
    const newNotas = await NotasCobradasMobile.bulkCreate(desktopNotas.map(n => n.toJSON())); // Carga los nuevos datos
    res.status(201).json(newNotas);
  } catch (error) {
    res.status(500).send('Error syncing mobile collected notes');
  }
};

// Registrar un nuevo pago
const registerPayment = async (req, res) => {
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
    nro_factura
  } = req.body;

  try {
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
      fecha_registro: new Date()
    });

    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error registering payment: ', error);
    res.status(500).send('Error registering payment');
  }
};

module.exports = {
  getNotasCobradasMobile,
  syncNotasCobradas,
  registerPayment
};
