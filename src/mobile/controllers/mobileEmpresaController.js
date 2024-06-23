const MobileEmpresa = require('../models/mobileEmpresa');

// Obtener todas las empresas
const getEmpresas = async (req, res) => {
  try {
    const empresas = await MobileEmpresa.findAll();
    res.json(empresas);
  } catch (error) {
    res.status(500).send('Error fetching companies');
  }
};

// Crear una nueva empresa
const addEmpresa = async (req, res) => {
  try {
    const empresa = req.body;
    const newEmpresa = await MobileEmpresa.create(empresa);
    res.status(201).json(newEmpresa);
  } catch (error) {
    res.status(500).send('Error adding company');
  }
};

// Obtener el nombre de una empresa por su ID
const getEmpresaNombreById = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await MobileEmpresa.findByPk(id, {
      attributes: ['nombre']
    });
    if (empresa) {
      res.json(empresa);
    } else {
      res.status(404).send('Company not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching company name');
  }
};

module.exports = {
  getEmpresas,
  addEmpresa,
  getEmpresaNombreById
};
