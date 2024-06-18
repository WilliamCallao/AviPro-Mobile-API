const CuentaDepositoDesktop = require('../models/cuentaDepositoDesktop');

// Obtener todas las cuentas de depósito de escritorio
const getCuentasDepositoDesktop = async (req, res) => {
  try {
    const cuentas = await CuentaDepositoDesktop.findAll();
    res.json(cuentas);
  } catch (error) {
    res.status(500).send('Error fetching desktop deposit accounts');
  }
};

// Agregar una nueva cuenta de depósito de escritorio
const addCuentaDeposito = async (req, res) => {
  try {
    const cuenta = req.body;
    const newCuenta = await CuentaDepositoDesktop.create(cuenta);
    res.status(201).json(newCuenta);
  } catch (error) {
    res.status(500).send('Error adding desktop deposit account');
  }
};

// Cargar datos desde un archivo JSON
const uploadJsonData = async (req, res) => {
  const cuentas = req.body;
  try {
    await CuentaDepositoDesktop.destroy({ where: {} }); // Borra todos los registros existentes
    const newCuentas = await CuentaDepositoDesktop.bulkCreate(cuentas); // Carga los nuevos datos desde el JSON
    res.status(201).json(newCuentas);
  } catch (error) {
    res.status(500).send('Error loading JSON data');
  }
};

module.exports = {
  getCuentasDepositoDesktop,
  addCuentaDeposito,
  uploadJsonData
};
