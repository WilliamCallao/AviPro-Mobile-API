const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const ClienteMobile = sequelize.define('ClienteMobile', {
  empresa_id: {
    type: DataTypes.CHAR(3),
    allowNull: false
  },
  sucursal_id: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  cliente_id: {
    type: DataTypes.CHAR(3),
    allowNull: false,
    primaryKey: true
  },
  cuenta: {
    type: DataTypes.CHAR(20),
    allowNull: false
  },
  nombre: {
    type: DataTypes.CHAR(50),
    allowNull: false
  },
  direccion: {
    type: DataTypes.CHAR(40),
    allowNull: true
  },
  telefono: {
    type: DataTypes.CHAR(30),
    allowNull: true
  },
  cobrador_id: {
    type: DataTypes.CHAR(2),
    allowNull: false
  }
}, {
  tableName: 'mobile_clientes',
  timestamps: false
});

module.exports = ClienteMobile;
