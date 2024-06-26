// clientesDesktop
const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const ClienteDesktop = sequelize.define('ClienteDesktop', {
  empresa_id: {
    type: DataTypes.CHAR(2),
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
  tableName: 'desktop_clientes',
  timestamps: false
});

module.exports = ClienteDesktop;
