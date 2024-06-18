// models/mobileEmpresa.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const MobileEmpresa = sequelize.define('MobileEmpresa', {
  empresa_id: {
    type: DataTypes.CHAR(2),
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'mobile_empresa',
  timestamps: false
});

module.exports = MobileEmpresa;
