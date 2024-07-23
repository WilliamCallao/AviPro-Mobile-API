// models/mobileDispositivo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');
const MobileEmpresa = require('./mobileEmpresa');

const MobileDispositivo = sequelize.define('MobileDispositivo', {
  empresa_id: {
    type: DataTypes.CHAR(3),
    allowNull: false,
    references: {
      model: MobileEmpresa,
      key: 'empresa_id'
    }
  },
  codigo_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true // Asegura que el codigo_id sea único
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'creado',
    validate: {
      isIn: [['usado', 'creado', 'desactivado']]
    }
  },
  ultimo_uso: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'mobile_dispositivos',
  timestamps: false
});

module.exports = MobileDispositivo;
