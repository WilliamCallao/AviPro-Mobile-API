const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Cliente = sequelize.define('Cliente', {
  cliente_ID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    field: 'cliente_ID'
  },
  sucursal_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sucursal_ID'
  },
  Telefono: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'Telefono'
  },
  Empresa_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Empresa_ID'
  },
  Direccion: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'Direccion'
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Nombre'
  },
  cobrador_ID: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'cobrador_ID'
  },
  Cuenta: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Cuenta'
  }
}, {
  tableName: 'clientes',
  timestamps: false
});

module.exports = Cliente;
