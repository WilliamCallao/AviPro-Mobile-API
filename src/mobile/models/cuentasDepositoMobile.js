const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const CuentaDepositoMobile = sequelize.define('CuentaDepositoMobile', {
  empresa_id: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  cuenta: {
    type: DataTypes.CHAR(20),
    allowNull: false,
    primaryKey: true
  },
  descripcion: {
    type: DataTypes.CHAR(90),
    allowNull: false
  },
  tipo: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    validate: {
      isIn: [['E', 'B']] // E para Efectivo, B para Banco
    }
  }
}, {
  tableName: 'mobile_cuentas_deposito',
  timestamps: false
});

module.exports = CuentaDepositoMobile;
