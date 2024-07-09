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

// Obtener cuentas de depósito por empresa_id
const getCuentasDepositoByEmpresaId = async (req, res) => {
  try {
    const { empresa_id } = req.params;
    const cuentas = await CuentaDepositoMobile.findAll({ where: { empresa_id } });
    res.json(cuentas);
  } catch (error) {
    res.status(500).send('Error fetching mobile deposit accounts by empresa_id');
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

// Cargar datos desde un archivo JSON
const uploadJsonData = async (req, res) => {
  const cuentas = req.body;
  try {
    await CuentaDepositoMobile.destroy({ where: {} }); // Borra todos los registros existentes
    const newCuentas = await CuentaDepositoMobile.bulkCreate(cuentas); // Carga los nuevos datos desde el JSON
    res.status(201).json(newCuentas);
  } catch (error) {
    res.status(500).send('Error loading JSON data');
  }
};

module.exports = {
  getCuentasDepositoMobile,
  getCuentasDepositoByEmpresaId,
  syncCuentasDeposito,
  uploadJsonData
};
