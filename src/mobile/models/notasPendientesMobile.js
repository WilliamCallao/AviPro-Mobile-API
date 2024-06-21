const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database'); // Asegúrate de que esta ruta sea correcta

const NotaPendienteMobile = sequelize.define('NotaPendienteMobile', {
  empresa_id: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  sucursal_id: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  cuenta: {
    type: DataTypes.CHAR(20),
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  nro_nota: {
    type: DataTypes.CHAR(20),
    allowNull: false
  },
  importe_nota: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  monto_pagado: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  saldo_pendiente: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  fecha_venta: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fecha_vence: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'mobile_notas_pendientes',
  timestamps: false
});

module.exports = NotaPendienteMobile;
