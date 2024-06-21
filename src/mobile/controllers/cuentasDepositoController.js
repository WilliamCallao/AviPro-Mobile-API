const CuentaDepositoMobile = require('../models/cuentasDepositoMobile');
const CuentaDepositoDesktop = require('../../desktop/models/cuentaDepositoDesktop');

// Obtener todas las cuentas de depósito móviles
const getCuentasDepositoMobile = async (req, res) => {
  try {
    const cuentas = await CuentaDepositoMobile.findAll();
    res.json(cuentas);
  } catch (error) {
    res.status(500).send('Error fetching mobile deposit accounts');
  }
};

// Endpoint para sincronizar datos desde la tabla de desktop
const syncCuentasDeposito = async (req, res) => {
  try {
    const desktopCuentas = await CuentaDepositoDesktop.findAll();
    await CuentaDepositoMobile.destroy({ where: {} }); // Borra todos los registros existentes
    const newCuentas = await CuentaDepositoMobile.bulkCreate(desktopCuentas.map(c => c.toJSON())); // Carga los nuevos datos
    res.status(201).json(newCuentas);
  } catch (error) {
    res.status(500).send('Error syncing mobile deposit accounts');
  }
};

module.exports = {
  getCuentasDepositoMobile,
  syncCuentasDeposito
};
