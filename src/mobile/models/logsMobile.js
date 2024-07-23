//logsMobile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');
const moment = require('moment-timezone');

const LogsMobile = sequelize.define('LogsMobile', {
    codigo_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    registro: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => moment().tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss')
    },
    empresa_id: {
        type: DataTypes.CHAR(3),
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
    tableName: 'mobile_logs',
    timestamps: false
    });

module.exports = LogsMobile;