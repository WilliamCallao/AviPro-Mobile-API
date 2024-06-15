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
  Importe_nota: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'Importe_nota'
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
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'empresa_id'
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'Fecha'
  },
  sucursal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sucursal_id'
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
