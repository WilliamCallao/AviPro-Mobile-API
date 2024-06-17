const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const CobradorDesktop = sequelize.define('CobradorDesktop', {
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
  tableName: 'desktop_cobradores',
  timestamps: false
});

module.exports = CobradorDesktop;
