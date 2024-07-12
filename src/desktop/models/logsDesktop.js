//logsDesktop.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');
const moment = require('moment-timezone');

const LogsDesktop = sequelize.define('LogsDesktop', {
  codigo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  registro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => moment().tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss')
  },
  empresa_id: {
    type: DataTypes.CHAR(2),
    allowNull: false,
    primaryKey: true
  },
  cobrador_id: {
    type: DataTypes.CHAR(2),
    allowNull: false,
    primaryKey: true
  },
  success: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  detalle: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'desktop_logs',
  timestamps: false
});

module.exports = LogsDesktop;