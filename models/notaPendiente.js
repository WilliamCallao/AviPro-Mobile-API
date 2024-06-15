const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const NotaPendiente = sequelize.define('NotaPendiente', {
  Saldo_pendiente: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'Saldo_pendiente'
  },
  nro_nota: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    field: 'nro_nota'
  },
  Monto_pagado: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'Monto_pagado'
  },
  importe_nota: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'importe_nota'
  },
  Fecha_venta: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'Fecha_venta'
  },
  Fecha_vence: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'Fecha_vence'
  },
  Empresa_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Empresa_ID'
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'Fecha'
  },
  sucursal_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sucursal_ID'
  },
  Cuenta: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Cuenta'
  }
}, {
  tableName: 'notas_pendientes',
  timestamps: false
});

module.exports = NotaPendiente;
