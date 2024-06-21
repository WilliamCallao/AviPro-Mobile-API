const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const CobradorMobile = sequelize.define('CobradorMobile', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  empresa_id: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  cobrador_id: {
    type: DataTypes.CHAR(2),
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.CHAR(50),
    allowNull: false
  }
}, {
  tableName: 'mobile_cobradores',
  timestamps: false
});

module.exports = CobradorMobile;
