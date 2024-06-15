const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Cliente = sequelize.define('Cliente', {
  cliente_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    field: 'cliente_id'
  },
  sucursal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sucursal_id'
  },
  Telefono: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'Telefono'
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'empresa_id'
  },
  Direccion: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'Direccion'
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Nombre'
  },
  cobrador_id: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'cobrador_id'
  },
  Cuenta: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Cuenta'
  }
}, {
  tableName: 'clientes',
  timestamps: false
});

module.exports = Cliente;
